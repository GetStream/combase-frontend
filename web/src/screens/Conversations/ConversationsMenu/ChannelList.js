import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';
import { Route, useParams } from 'react-router-dom';
import { GET_CURRENT_USER, useQuery } from '@combase.app/apollo';
import { itemGap, layout } from '@combase.app/styles';
import {
    ArchiveIcon,
    Box,
    ChannelPreview,
    Checkbox,
    Container,
    ConversationsIcon,
    CloseIcon,
    Dropdown,
    EditIcon,
    EmptyView,
    IconButton,
    PageHeader,
    StarIcon,
    PriorityIcon,
    Popover,
    ScrollContextProvider,
    Spinner,
    ToggleGroup,
    ToggleGroupOption,
    TicketLabelToggle,
    Tooltip,
    VirtualizedList,
    useBulkSelect,
} from '@combase.app/ui';

import { useReactiveMedia, useTicketList } from 'hooks';
import InboxSelector from './InboxSelector';

const Root = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
`;

const SpinnerWrapper = styled(Box)`
    ${layout.size};
`;

const ItemContainer = styled(Box).attrs({
    paddingX: 2,
})``;

const BulkActions = styled(Box)`
	& > * + * {
		${itemGap};	
	}
`

const sort = { last_message_at: -1 };
const options = {
    limit: 20,
    watch: false,
};

const popoverModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 16],
        },
    },
    {
        name: 'fullWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => {
            // eslint-disable-next-line no-param-reassign
            state.styles.popper.width = `${window.innerWidth - 32}px`;
        },
        effect: ({ state }) => {
            // eslint-disable-next-line no-param-reassign
            state.elements.popper.style.width = `${window.innerWidth - 32}px`;
        },
    },
];

const ChannelList = () => {
    const { inbox } = useParams();
    const { data } = useQuery(GET_CURRENT_USER);

    const [statusFilter, setStatusFilter] = useState('open');
    const [menuAnchor, setMenuAnchor] = useState();
    const [selectable, toggleSelectable] = useToggle();

    const isSm = useReactiveMedia('sm');
    const isXl = useReactiveMedia('xl');

    const popoverModifiers = useMemo(
        () => [
            {
                name: 'offset',
                options: {
                    offset: [0, 12],
                },
            },
            {
                name: 'fullWidth',
                enabled: !isSm?.matches,
                phase: 'beforeWrite',
                requires: ['computeStyles'],
                fn: ({ state }) => {
                    // eslint-disable-next-line no-param-reassign
                    state.styles.popper.width = `${window.innerWidth - 32}px`;
                },
                effect: ({ state }) => {
                    // eslint-disable-next-line no-param-reassign
                    state.elements.popper.style.width = `${window.innerWidth - 32}px`;
                },
            },
        ],
        []
    );

    const filters = useMemo(() => {
        let filter = {
            members: {
                $in: [data?.me?._id],
            },
        };

        if ((statusFilter && inbox === 'inbox') || inbox === 'starred' || inbox === 'priority') {
            filter.status = statusFilter;
        }

        if (inbox === 'unassigned') {
            filter.status = 'unassigned';
        }

        if (inbox === 'archived') {
            filter.status = 'archived';
        }

        if (inbox === 'starred') {
            filter[inbox] = true;
        }

        if (inbox === 'priority') {
            filter[inbox] = {
                $gt: 0,
            };
        }

        return filter;
    }, [inbox, statusFilter]);

    const [tickets, { error, loading, onClickTicket, loadMore }] = useTicketList(filters, sort, options);

    const fresh = !tickets?.edges?.length && loading;
    const totalCount = fresh ? 12 : tickets?.edges?.length;

    const [selectableItemProps, bulkCheckboxProps, selected] = useBulkSelect(tickets?.edges, selectable);
    const handleEndReached = useCallback(() => tickets?.hasMore && loadMore(), [tickets, loadMore]);

	const handleToggleLabel = useCallback((value, event) => {
		event.stopPropagation();
		console.log(value);
	}, []);

	const renderChannelPreview = useCallback(i => {
		const { node: ticket } = tickets?.edges?.[i] || {};
		return (
			<Route path="/dashboard/conversations/:inbox/:ticketId">
				{({ match }) => (
					<ChannelPreview
						{...selectableItemProps}
						active={match?.params && match.params.ticketId === ticket?._id}
						message={ticket?.latestMessage}
						partnerAvatar={ticket?.user?.avatar}
						partnerName={ticket?.user?.name}
						updatedAt={ticket?.latestMessageAt}
						unread={ticket?.unread}
						disabled={!ticket?._id}
						toggles={[
							<IconButton
								className={ticket?.starred ? 'active' : undefined}
								color={ticket?.starred ? 'yellow' : 'border'}
								size={3}
								icon={StarIcon}
								key={0}
								onClick={handleToggleLabel}
								value="star"
							/>,
							<IconButton
								className={ticket?.priority ? 'active' : undefined}
								color={ticket?.priority ? 'red' : 'border'}
								size={3}
								active={ticket?.priority}
								icon={PriorityIcon}
								key={1}
								onClick={handleToggleLabel}
								value="priority"
							/>,
						]}
						value={!ticket?._id}
						onClick={() => onClickTicket(ticket?._id)}
					/>
				)}
			</Route>
		);
	}, [selectableItemProps, onClickTicket, tickets]);

    return (
        <ScrollContextProvider type="px">
            <Root>
                <PageHeader
                    centered
                    showOrganization={isSm?.matches && !isXl?.matches}
                    leftIcon={
                        selectable ? (
                            <Box marginRight={isSm?.matches ? 4 : 0}>
                                <Checkbox {...bulkCheckboxProps} />
                            </Box>
                        ) : undefined
                    }
                    actions={
                        <BulkActions gapLeft={2}>
                            {selected?.length ? (
                                <>
                                    <Tooltip text={`Star ${selected?.length} Tickets`}>
                                        <IconButton color="yellow" icon={StarIcon} onClick={console.log} size={4} />
                                    </Tooltip>
                                    <Tooltip text={`Set ${selected?.length} Tickets as Mid-Priority`}>
                                        <IconButton color="red" icon={PriorityIcon} onClick={console.log} size={4} />
                                    </Tooltip>
                                    <Tooltip text={`Archive ${selected?.length} Tickets`}>
                                        <IconButton color="altText" icon={ArchiveIcon} onClick={console.log} size={4} />
                                    </Tooltip>
                                </>
                            ) : null}
                            {loading ? (
                                <SpinnerWrapper size={6}>
                                    <Spinner size={5} />
                                </SpinnerWrapper>
                            ) : (
                                <Tooltip text={selectable ? 'Cancel' : 'Edit'}>
                                    <IconButton
                                        color={selectable ? 'red' : 'altText'}
                                        size={4}
                                        icon={selectable ? CloseIcon : EditIcon}
                                        onClick={toggleSelectable}
                                    />
                                </Tooltip>
                            )}
                        </BulkActions>
                    }
                    animated={!isSm?.matches}
                    centered={!isSm?.matches}
                    hideLeftAction={isSm?.matches && !selectable}
                    reverse={selectable || !isSm?.matches}
                    title={inbox}
                    subtitle={
                        isSm.matches && !selectable ? undefined : selectable ? `${selected?.length} selected` : `${tickets?.count || 0} tickets`
                    }
                    onTitleClick={!isXl.matches ? e => setMenuAnchor(e.target) : null}
                >
                    {inbox !== 'unassigned' && inbox !== 'archived' ? (
                        <Container paddingBottom={3}>
                            <ToggleGroup onChange={setStatusFilter} value={statusFilter}>
                                <ToggleGroupOption value={null}>
                                    All
                                </ToggleGroupOption>
                                <ToggleGroupOption value="open">
									Open
                                </ToggleGroupOption>
                                <ToggleGroupOption value="closed">
                                    Closed
                                </ToggleGroupOption>
                            </ToggleGroup>
                        </Container>
                    ) : null}
                </PageHeader>
                <Popover
                    anchor={menuAnchor}
                    as={Dropdown}
                    modifiers={popoverModifiers}
                    onClose={() => setMenuAnchor(false)}
                    placement={isSm?.matches ? 'bottom-start' : 'bottom'}
                    subheading="Inboxes"
                    minWidth={14}
                >
                    <InboxSelector onClickItem={() => setMenuAnchor(false)} />
                </Popover>
                <VirtualizedList
                    endReached={handleEndReached}
                    EmptyPlaceholder={() => (
                        <Container paddingY={4}>
                            <EmptyView
                                minHeight={13}
                                icon={<ConversationsIcon color="altText" fillAlpha={0.56} size={10} />}
                                error={error}
                                title={!error ? 'No Conversations' : 'Something went wrong.'}
                            />
                        </Container>
                    )}
                    ItemContainer={ItemContainer}
                    renderItem={renderChannelPreview}
                    totalCount={totalCount}
                />
            </Root>
        </ScrollContextProvider>
    );
};

export default ChannelList;
