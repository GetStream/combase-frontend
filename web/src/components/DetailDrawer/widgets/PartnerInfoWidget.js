import React from 'react';
import styled from 'styled-components';
import { Avatar, Box, ClockIcon, MailIcon, Text, UserIcon } from '@combase.app/ui';
import { useChatContext } from 'stream-chat-react';
import DrawerWidgetBase from './DrawerWidgetBase';
import { GET_TICKET_PARTNER, useQuery } from '@combase.app/apollo';

const Item = styled(Box)`
	display: grid;
	grid-template-columns: ${({ theme }) => theme.sizes[5]} 1fr min-content;
	grid-gap: ${({ theme }) => theme.space[3]};
`;

const PartnerInfoWidget = () => {
	const { channel } = useChatContext();
	const { data } = useQuery(GET_TICKET_PARTNER, { variables: { _id: channel.id }});
	
	const { user } = data?.organization?.ticket || {};

	return (
		<DrawerWidgetBase title="Details">
			<Item paddingY={3}>
				<UserIcon color="altText" size={5} />
				<Box>
					<Text lineHeight={6} fontSize={4}>
						{user?.name}
					</Text>
					<Box marginTop={1}>
						<Text color="altText" fontWeight="400" lineHeight={5}>
							Amsterdam, NL
						</Text>
						<Text color="altText" fontWeight="400" lineHeight={5}>
							Customer
						</Text>
					</Box>
				</Box>
				<Avatar name={user?.name} size={12} />
			</Item>
			<Item paddingY={3}>
				<MailIcon color="altText" size={5} />
				<Box>
					<Text fontWeight="400" lineHeight={6} fontSize={4}>
						{user?.email}
					</Text>
				</Box>
			</Item>
			<Item paddingY={3}>
				<ClockIcon color="altText" size={5} />
				<Box>
					<Text fontWeight="400" lineHeight={6} fontSize={4}>
						10:48am
					</Text>
					<Box marginTop={1}>
						<Text color="altText" fontWeight="400" lineHeight={5}>
							CEST+0:00
						</Text>
					</Box>
				</Box>
			</Item>
		</DrawerWidgetBase>
	);
};

export default PartnerInfoWidget;