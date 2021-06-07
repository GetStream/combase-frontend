import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ChannelPreview } from '@combase.app/ui';

const CombaseChannelPreview = (props) => {
	const { inbox } = useParams();
	const history = useHistory();

	const onSelectChannel = (channel) => {
		history.push(`/dashboard/conversations/${inbox}/${channel.id}`);
	}
	return (
		<ChannelPreview {...props} onSelectChannel={onSelectChannel} />
	);
};

export default CombaseChannelPreview;