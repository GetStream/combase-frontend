import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';
import { Route, useParams } from 'react-router-dom';
import { GET_CURRENT_USER, useQuery } from '@combase.app/apollo';
import {
    Box,
    ChannelPreview,
    Container,
    ConversationsIcon,
    Dropdown,
    EmptyView,
    Popover,
    ScrollContextProvider,
    TicketLabelToggle,
    VirtualizedList,
    useBulkSelect,
} from '@combase.app/ui';

import { useReactiveMedia, useTicketList, useTicketLabelToggles } from 'hooks';
import ChannelListHeader from './ChannelListHeader';
import InboxSelector from './InboxSelector';

const Root = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
`;

const ItemContainer = styled(Box).attrs({
    paddingX: 2,
})``;

const sort = { last_message_at: -1 };
const options = {
    limit: 20,
    watch: false,
};

const ChannelList = () => {
    const { inbox } = useParams();
    const { data } = useQuery(GET_CURRENT_USER);

	const me = useMemo(() => data?.me || {}, [data]);

    const [statusFilter, setStatusFilter] = useState('open');
    const [menuAnchor, setMenuAnchor] = useState();
    const [selectable, toggleSelectable] = useToggle();

    const isSm = useReactiveMedia('sm');
    const isXl = useReactiveMedia('xl');
	const isSmallViewport = !isSm?.matches;

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
                enabled: isSmallViewport,
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
        [isSmallViewport]
    );

    const filters = useMemo(() => {
        let filter = {};

        if (inbox === 'inbox' || inbox === 'starred' || inbox === 'priority') {
            filter.status = statusFilter ?? undefined;
        }

        if (inbox === 'unassigned') {
            filter = {
				...filter,
				$or: [
					{ status: 'unassigned' },
					{ status: 'new' },
				]
			}
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
    const handleEndReached = useCallback(() => {
		return tickets?.hasMore && loadMore()
	}, [tickets, loadMore]);
	
	const [starTicket, setPriority] = useTicketLabelToggles();

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
							<TicketLabelToggle className={ticket?.starred ? "active" : undefined} type="star" onChange={(e) => starTicket(e, ticket?._id)} value={ticket?.starred || false} />,
							<TicketLabelToggle className={ticket?.priority ? "active" : undefined} type="priority" onChange={e => setPriority(e, ticket?._id)} value={ticket?.priority || 0} />,
						]}
						value={ticket?._id}
						onClick={() => onClickTicket(ticket?._id)}
					/>
				)}
			</Route>
		);
	}, [selectableItemProps, setPriority, starTicket, onClickTicket, tickets]);

	const onTitleClick = useCallback((e) => setMenuAnchor(e.target), []);
	
    return (
        <ScrollContextProvider type="px">
            <Root>
                <ChannelListHeader 
					bulkCheckboxProps={bulkCheckboxProps}
					inbox={inbox}
					loading={loading} 
					selectable={selectable}
					selected={selected}
					onChangeStatus={setStatusFilter}
					onEditClick={toggleSelectable}
					onTitleClick={onTitleClick}
					status={statusFilter}
					totalCount={tickets?.count || 0} 
				/>
                <Popover
                    anchor={menuAnchor}
                    as={Dropdown}
                    modifiers={popoverModifiers}
                    onClose={() => setMenuAnchor(false)}
                    placement={isSm?.matches ? 'bottom-start' : 'bottom'}
                    subheading="Inboxes"
                    minWidth={15}
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
