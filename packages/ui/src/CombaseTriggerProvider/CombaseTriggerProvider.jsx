import React from 'react';
import { MessageInputContextProvider, useMessageInputContext } from 'stream-chat-react';
import useEmojiTrigger from './useEmojiTrigger';

const CustomTriggerProvider = ({ children }) => {
	const currentValue = useMessageInputContext();

	const autocompleteTriggers = {
		// '/': useCommandTrigger(),
		':': useEmojiTrigger(currentValue.emojiIndex),
	};
  
	const newValue = {
	  ...currentValue,
	  autocompleteTriggers,
	};
  
	return <MessageInputContextProvider value={newValue}>{children}</MessageInputContextProvider>;
  
};

export default CustomTriggerProvider;