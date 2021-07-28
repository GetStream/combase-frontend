import React from 'react';
import IconButton from '../IconButton';
import Text from '../Text';

const EmojiItem = ({ entity, onClick, onFocus, onMouseEnter, selected }) => {
	return (
		<IconButton
			active={selected}
			onClick={onClick}
			onFocus={onFocus}
			onMouseEnter={onMouseEnter}
		>
			<div>
				<Text fontSize={6} lineHeight={6}>{entity.native}</Text>
			</div>
		</IconButton>
	);
}

export default EmojiItem;