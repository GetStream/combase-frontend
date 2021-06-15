import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { Avatar, Box, ChannelPreview, Chip, Label, Text } from '@combase.app/ui';
import { GET_CURRENT_USER, useQuery } from '@combase.app/apollo';

const ChannelMeta = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const CombaseChannelPreview = (props) => {
	const { inbox } = useParams();
	const history = useHistory();
	
	const { channel } = props;

	const { id: _id, data: { status } = {} } = channel || {};

	const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'cache-only', variables: { _id } });
	const { me } = data || {};

	const onSelectChannel = (channel) => {
		history.push(`/dashboard/conversations/${inbox}/${channel.id}`);
	};

	const iconProps = useMemo(() => {
		const agent = Object.values(channel?.state?.members || []).find(({ role }) => role !== 'owner');
		return {
			borderRadius: 'circle',
			name: agent?.user.id === me?._id ? 'You' : agent?.user.name,
			src: agent?.user.avatar,
		};
	}, [channel, me]);

	return (
		<ChannelPreview {...props} onSelectChannel={onSelectChannel}>
			<ChannelMeta marginTop={2}>
				<Label variant="ghost" color={`ticketStatus.${status}`} colorAlpha={0.08} textColor={`ticketStatus.${status}`}><Text fontSize={2} lineHeight={2}>{status}</Text></Label>
				{status !== 'unassigned' && status !== 'new' ? <Chip variant="ghost" size="xs" color="primary" icon={Avatar} iconProps={iconProps} label={iconProps.name} /> : null}
			</ChannelMeta>
		</ChannelPreview>
	);
};

export default CombaseChannelPreview;