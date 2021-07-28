import React, { forwardRef } from 'react';
import IconButton from '../IconButton';
import Text from '../Text';

const EmojiItem = forwardRef(({ entity, onClick, onFocus, onMouseEnter, selected }, ref) => {
	return (
		<IconButton
			active={selected}
			onClick={onClick}
			onFocus={onFocus}
			onMouseEnter={onMouseEnter}
			ref={ref}
		>
			<div>
				<Text fontSize={6} lineHeight={6}>{entity.native}</Text>
			</div>
		</IconButton>
	);
})

export default EmojiItem;