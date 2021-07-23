import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import ChannelPreview from '@combase.app/ui/ChannelPreview';
import Chip from '@combase.app/ui/Chip';
import TextLink from '@combase.app/ui/TextLink';

import { GET_CURRENT_USER } from 'apollo';

import { AssignTicketContext } from 'contexts/AssignTicket';

const ChannelMeta = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const CombaseChannelPreview = (props) => {
	const history = useHistory();
	const [_, setTicketToAssign] = useContext(AssignTicketContext);

	const { channel } = props;

	const { id: _id, data: { status } = {} } = channel || {};

	const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'cache-only', variables: { _id } });
	const { me } = data || {};

	const onSelectChannel = (channel) => {
		history.push(`/chats/${channel.id}`);
	};

	const handleAssign = e => {
		e.preventDefault();
		e.stopPropagation();
		setTicketToAssign(_id);
	}

	const iconProps = useMemo(() => {
		const agent = Object.values(channel?.state?.members || []).find(({ role }) => role !== 'owner');
		return {
			variant: 'circle',
			name: agent?.user.id === me?._id ? 'You' : agent?.user.name,
			src: agent?.user.avatar,
		};
	}, [channel, me]);

	return (
		<ChannelPreview {...props} onSelectChannel={onSelectChannel}>
			<ChannelMeta marginTop={2}>
				<Chip variant="ghost" color={`ticketStatus.${status}`} colorAlpha={0.08} label={status} style={{textTransform: "capitalize"}} textColor={`ticketStatus.${status}`} />
				{status !== 'unassigned' && status !== 'new' ? <Chip variant="ghost" size="xs" color="primary" icon={Avatar} iconProps={iconProps} label={iconProps.name} /> : <TextLink onClick={handleAssign} color="primary">Assign</TextLink>}
			</ChannelMeta>
		</ChannelPreview>
	);
};

export default CombaseChannelPreview;