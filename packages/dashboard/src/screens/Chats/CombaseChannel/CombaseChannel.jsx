import React from 'react';
import { 
	Channel, 
	MessageInput,
} from 'stream-chat-react';

/** Chat Component Overrides */
import Avatar from '@combase.app/ui/Avatar';
import DateSeparator from '@combase.app/ui/DateSeparator';
import MessageComposer, { SuggestionList } from '@combase.app/ui/MessageComposer';
import MessageList from '@combase.app/ui/MessageList'; // Using a custom MessageList component entirely.
import Message from '@combase.app/ui/Message';
import MessageDate from '@combase.app/ui/Message/MessageDate';
import MessageOptions from '@combase.app/ui/Message/MessageOptions';
import MessageStatus from '@combase.app/ui/Message/MessageStatus';
import QuotedMessage from '@combase.app/ui/Message/QuotedMessage';
import CombaseTriggerProvider from '@combase.app/ui/CombaseTriggerProvider';
import SystemMessage from '@combase.app/ui/SystemMessage';

import CombaseChannelHeader from './CombaseChannelHeader';

const EditMessageComposer = (props) => <MessageComposer {...props} editMode />

const CombaseChannel = ({ openDrawer }) => (
	<Channel
		Avatar={Avatar}
		DateSeparator={DateSeparator}
		EditMessageInput={EditMessageComposer}
		Input={MessageComposer}
		Message={Message}
		MessageOptions={MessageOptions}
		MessageTimestamp={MessageDate}
		MessageStatus={MessageStatus}
		MessageSystem={SystemMessage}
		QuotedMessage={QuotedMessage}
		AutocompleteSuggestionList={SuggestionList}
		TriggerProvider={CombaseTriggerProvider}
	>
		<CombaseChannelHeader onInfoClick={openDrawer} />
		<MessageList shouldGroupByUser />
		<MessageInput grow />
	</Channel>
);

export default CombaseChannel;
