import React from 'react';
import { 
	ChannelList as List, 
	ChannelListMessenger,
	ChannelPreviewMessenger, 
} from 'stream-chat-react';

const filters = { type: 'combase' };
const options = { state: true, presence: true, limit: 20 };
const sort = {
	cid: 1,
	last_message_at: -1,
	updated_at: -1,
};

const ChannelList = () => {
	return (
		<List
			List={ChannelListMessenger}
			Preview={ChannelPreviewMessenger}
			filters={filters}
			sort={sort}
			options={options}
		/>
	);
}

export default ChannelList; 