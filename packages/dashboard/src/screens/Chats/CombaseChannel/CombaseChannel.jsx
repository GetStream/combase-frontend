import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
	Channel, 
	MessageInput,
	KEY_CODES,
} from 'stream-chat-react';
import { itemGap } from '@combase.app/styles';

import Box from '@combase.app/ui/Box';
import ListSubheader from '@combase.app/ui/ListSubheader';

/** Chat Component Overrides */
import Avatar from '@combase.app/ui/Avatar';
import DateSeparator from '@combase.app/ui/DateSeparator';
import MessageComposer from '@combase.app/ui/MessageComposer';
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

const EmojiRow = styled(Box)`
	min-width: 0;
	display: flex;
	align-items: center;
	overflow-x: auto;
	overflow-y: hidden;
	&::-webkit-scrollbar {
		width: 0px;
		background: transparent; /* make scrollbar transparent */
	}

	& > button + button {
		${itemGap}
	}
`;

const SuggestionList = (props) => {
	const { 
		component: Component, 
		getSelectedItem,
		getTextToReplace,
		onSelect,
		values 
	} = props;

	const [selectedItem, setSelectedItem] = useState(undefined);

	const handleClick = (e) => {
		if (e) e.preventDefault?.();
		const value = values[selectedItem];
		if (!value) return;

		onSelect(getTextToReplace(value));
		if (getSelectedItem) getSelectedItem(value);
	};

	const selectItem = (item) => {
		const index = values.findIndex((value) => value.id ? value.id === item.id : value.name === item.name);
		setSelectedItem(index);
	};

	const handleKeyDown = useCallback(
		(event) => {
		  if (event.which === KEY_CODES.UP) {
			setSelectedItem((prevSelected) => {
			  if (prevSelected === undefined) return 0;
			  const newID = prevSelected === 0 ? values.length - 1 : prevSelected - 1;
			  return newID;
			});
		  }
	
		  if (event.which === KEY_CODES.DOWN) {
			setSelectedItem((prevSelected) => {
			  if (prevSelected === undefined) return 0;
			  const newID = prevSelected === values.length - 1 ? 0 : prevSelected + 1;
			  return newID;
			});
		  }
	
		  if (
			(event.which === KEY_CODES.ENTER || event.which === KEY_CODES.TAB) &&
			selectedItem !== undefined
		  ) {
			handleClick(event);
			return setSelectedItem(undefined);
		  }
	
		  return null;
		},
		[selectedItem, values], // eslint-disable-line
	);
	
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown, false);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	const isSelected = (item) =>
		selectedItem === values.findIndex((value) => getId(value) === getId(item));

	const getId = (item) => {
		const textToReplace = getTextToReplace(item);
		if (textToReplace.key) {
			return textToReplace.key;
		}

		if (typeof item === 'string' || !item.key) {
			return textToReplace.text;
		}

		return item.key;
	};

	return (
		<Box paddingTop={2}>
			<ListSubheader>
				Suggestions:
			</ListSubheader>
			<EmojiRow padding={2} gapLeft={3}>
				{values.map((item, i) => (
					<Component 
						onClick={handleClick}
						onFocus={() => selectItem(item)}
						onMouseEnter={() => selectItem(item)}
						key={i} 
						entity={item} 
						selected={isSelected(item)}
					/>
				))}
			</EmojiRow>
		</Box>
	)
};

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
