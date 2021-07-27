import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Scrollbars } from 'rc-scrollbars';
import { Numbers } from 'humanify-numbers';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import Container from '@combase.app/ui/Container';
import IconButton from '@combase.app/ui/IconButton';
import IconLabel from '@combase.app/ui/IconLabel';
import ListSubheader from '@combase.app/ui/ListSubheader';
import { BadgeIcon, CalendarIcon, CloseIcon, MailIcon, UserIcon } from '@combase.app/ui/icons';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';
import Tooltip from '@combase.app/ui/Tooltip';

import HeaderBase from 'components/HeaderBase';

import useAgent from 'hooks/useAgent';
import useChatUserPresence from 'hooks/useChatUserPresence';

const Root = styled(Box)`
	width: ${({  theme }) => theme.sizes.drawer};
	border-left: 1px solid ${({ theme }) => theme.colors.border };
	display: grid;
	grid-template-rows: 1fr;
	& .rc-scrollbars-view {
		display: grid;
		grid-template-rows: ${({ theme }) => theme.sizes[12]} 1fr;
	}
`;

const Header = styled(HeaderBase)`
	position: sticky;
	top: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border: none;
	background-color: ${({ theme }) => theme.colors.background};
	z-index: 1;
`;

const UserProfile = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Statistics = styled(Container)`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const Statistic = styled(Text).attrs({ as: "blockquote" })`
	position: relative;
	margin: 0;
	padding-left: ${({ theme }) => theme.space[6]};
	padding-right: ${({ theme }) => theme.space[6]};
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: ${({ theme })=> theme.sizes[1]};
		background-color: ${({ $color, theme }) => theme.colors[$color]};
		border-radius: 99px;
	}
`;

const ProfileDrawer = ({ history }) => {	
	const { agentId } = useParams();
	const {data} = useAgent(agentId);
	const isOnline = useChatUserPresence(agentId);
	const agent = data?.organization?.agent;

	return (
		<Root>
			<Scrollbars>
				<Header>
					<Text fontSize={4} fontWeight={800} lineHeight={4}>Agent</Text>
					<IconButton variant="filled" icon={CloseIcon} onClick={history.goBack} />
				</Header>
				<Box>
					<UserProfile paddingY={4}>
						<Avatar src={agent?.avatar} name={agent?.name.full} variant={null} borderRadius={5} size={16} />
						<TextGroup paddingY={3} variant="centered">
							<IconLabel>
								<Text fontSize={5} lineHeight={5} fontWeight={700}>
									{agent?.name.display}
								</Text>
								{
									isOnline ? (
										<Tooltip placement="top" text="Online Now">
											<BadgeIcon color="green" size={4} />
										</Tooltip>
									) : null
								}
							</IconLabel>
							<Text color='altText' fontSize={4} fontWeight={400} lineHeight={4}>
								{agent?.role ? agent.role : "-"}
							</Text>
						</TextGroup>
					</UserProfile>
					<ListSubheader paddingX={6}>
						Ticket Statistics
					</ListSubheader>
					<Statistics paddingX={6} paddingTop={3} paddingBottom={8}>
						<Statistic paddingY={2} $color="green">
							<Text fontSize={9} fontWeight={800} lineHeight={10}>
								{Numbers.stringify(agent?.openTickets?.count || 0)}
							</Text>
							<Text color="altText" fontSize={5} lineHeight={5}>
								Open
							</Text>
						</Statistic>
						<Statistic paddingY={2} $color="red">
							<Text fontSize={9} fontWeight={800} lineHeight={10}>
								{Numbers.stringify(agent?.closedTickets?.count || 0)}
							</Text>
							<Text color="altText" fontSize={5} lineHeight={5}>
								Closed
							</Text>
						</Statistic>
					</Statistics>
					<Container paddingX={6}>
						<TextGroup marginY={6}>
							<IconLabel>
								<UserIcon size={5} />
								<Text fontSize={4} fontWeight={700} lineHeight={4}>Full Name</Text>
							</IconLabel>
							<Text opacity={0.56} fontWeight={400}>
								{agent?.name.full}
							</Text>
						</TextGroup>
						<TextGroup marginY={6}>
							<IconLabel>
								<MailIcon size={5} />
								<Text fontSize={4} fontWeight={700} lineHeight={4}>Email Address</Text>
							</IconLabel>
							<Text opacity={0.56} fontWeight={400}>
								{agent?.email}
							</Text>
						</TextGroup>
						<TextGroup marginY={6}>
							<IconLabel>
								<CalendarIcon size={5} />
								<Text fontSize={4} fontWeight={700} lineHeight={4}>Availability</Text>
							</IconLabel>
							<Text opacity={0.56} fontWeight={400}>
								TODO
							</Text>
						</TextGroup>
						<TextGroup marginY={6}>
							<Text marginBottom={3} fontSize={4} fontWeight={700} lineHeight={4}>Account Status</Text>
							<Box marginY={3}>
								<IconLabel>	
									<Text opacity={0.56} fontWeight={400}>
										Active
									</Text>
									<BadgeIcon color="green" />
								</IconLabel>
							</Box>
							<Box marginY={3}>
								<IconLabel>	
									<Text opacity={0.56} fontWeight={400}>
										Email Verified
									</Text>
									<BadgeIcon color="green" />
								</IconLabel>
							</Box>
							<Box marginY={3}>
								<IconLabel>	
									<Text opacity={0.56} fontWeight={400}>
										Two-Factor Authentication
									</Text>
									<BadgeIcon color="altText" />
								</IconLabel>
							</Box>
						</TextGroup>
					</Container>
				</Box>
			</Scrollbars>
		</Root>
	);
}

export default ProfileDrawer;