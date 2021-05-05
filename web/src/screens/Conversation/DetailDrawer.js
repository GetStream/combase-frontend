import React from 'react';
import styled from 'styled-components';
import {
    Avatar,
    Box,
    Chip,
    ClockIcon,
	CloseCircleIcon,
    Entity,
    CloseIcon,
    Container,
    Heading,
    IconButton,
    LinkIcon,
    ListSubheader,
    MailIcon,
    PageHeader,
	PinIcon,
    Placeholder,
	TagIcon,
    Text,
    TextGroup,
	IconLabel,
	Tooltip,
	transformToTag,
	ChipInputBase,
} from '@combase.app/ui';
import { useParams } from 'react-router-dom';
import { useQuery, GET_TICKET } from '@combase.app/apollo';
// import { ActivityFeed } from 'components/ActivityFeed';

const Root = styled(Box)`
    display: grid;
    grid-template-rows: max-content 1fr;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.surface};
`;

const Masthead = styled(Container)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const MetaEntity = styled(Entity)`
    & + & {
        margin-top: 0.75rem;
    }
`;

const Input = styled(ChipInputBase)`
    padding: 0 !important;

    &::placeholder {
        color: ${({ theme }) => theme.colors.altText};
    }
`;

const FeedWrapper = styled(Box)`
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    overflow: hidden;
`;

const Name = styled(Heading)`
    &${Placeholder} {
        width: 6rem;
        height: 1.25rem;
    }
`;


const renderChip = ({ node = {} }, actions, i, cursor) => (
    <Chip
        action={CloseCircleIcon}
        backgroundColor="textA.8"
        color="text"
        icon={TagIcon}
        key={node?.name}
        label={node?.name}
        marginBottom={1}
        marginRight={1}
        marginTop={1}
        onActionClick={() => actions.removeAt(i)}
        selected={i === cursor}
    />
);

const DetailDrawer = ({ onClose }) => {
    const { channelId } = useParams();
    const { data } = useQuery(GET_TICKET, { variables: { _id: channelId } });
    const { tags, user } = data?.ticket || {};

    return (
        <Root>
            <Box>
                <PageHeader
					backgroundColor="surface"
                    actions={[<IconButton color="altText" icon={CloseIcon} onClick={onClose} />]}
                />
                <Masthead variant="fluid" paddingBottom={4}>
					<Avatar src={user?.avatar} name={user?.name} size={12} />
                    <TextGroup marginY={3} variant='centered'>
                        <Name as={!user?.name ? Placeholder : undefined} fontSize={6} fontWeight="600" lineHeight={6}>
                            {user?.name}
                        </Name>
						<Text color="altText" fontSize={3} lineHeight={4} marginBottom={2}>
                            {user?.email}
                        </Text>
                        <Tooltip text="10:00am • Wed 5 May">
							<IconLabel color="primary">
								<PinIcon />
								<Text>
									Boulder, CO
								</Text>
							</IconLabel>
						</Tooltip>
                    </TextGroup>
                </Masthead>
				<Container>
					<ListSubheader>Tags</ListSubheader>
					<Input
                        transformValue={transformToTag}
                        placeholder="+ Add Tags"
                        renderChip={renderChip}
                        // onAddChip={onAddTag}
                        // onRemoveChip={onRemoveTag}
                        value={tags || []}
                    />
				</Container>
            </Box>
            {/* <FeedWrapper>
                <ActivityFeed headerBackground="surface" feed={`ticket:${channelId}`} subtitle="Powered by Stream" title="Ticket Activity" />
            </FeedWrapper> */}
        </Root>
    );
};

export default DetailDrawer;
