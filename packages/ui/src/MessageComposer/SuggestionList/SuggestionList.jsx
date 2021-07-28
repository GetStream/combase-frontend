import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { KEY_CODES } from 'stream-chat-react';

import { itemGap } from '@combase.app/styles';

import Box from '../../Box';
import ListSubheader from '../../ListSubheader';

import { scrollToItem } from './utils';

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
	const scrollRef = useRef();
	const itemsRef = [];

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
			  scrollToItem(scrollRef.current, itemsRef[newID]);
			  return newID;
			});
		  }
	
		  if (event.which === KEY_CODES.DOWN) {
			setSelectedItem((prevSelected) => {
			  if (prevSelected === undefined) return 0;
			  const newID = prevSelected === values.length - 1 ? 0 : prevSelected + 1;
			  scrollToItem(scrollRef.current, itemsRef[newID]);
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
			<EmojiRow ref={scrollRef} padding={2} gapLeft={3}>
				{values.map((item, i) => (
					<Component 
						onClick={handleClick}
						onFocus={() => selectItem(item)}
						onMouseEnter={() => selectItem(item)}
						key={i} 
						entity={item}
						ref={(ref) => {
							itemsRef[i] = ref;
						}} 
						selected={isSelected(item)}
					/>
				))}
			</EmojiRow>
		</Box>
	)
};

export default SuggestionList;