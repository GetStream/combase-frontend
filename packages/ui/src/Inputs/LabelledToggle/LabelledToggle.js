import React, { useRef } from 'react';
import styled from 'styled-components';

import IconLabel from '../../IconLabel';
import ListItem from '../../ListItem';
import Text from '../../Text';
import TextGroup from '../../TextGroup';
import { Checkbox } from '../Checkbox';

const Root = styled(IconLabel)`
	align-items: center;
	justify-content: space-between;
`;

const LabelledToggle = ({ children, className, Input, inputSize, style, label, labelFontSize, labelLineHeight, description, ...rest }) => {
	const inputRef = useRef();
	return (
		<ListItem interaction="highlight" onClick={() => inputRef.current.click()}>
			<Root height={7} className={className} gap={3} paddingX={2} style={style}>
				<TextGroup>
					<Text fontSize={labelFontSize} lineHeight={labelLineHeight} fontWeight={600}>{label}</Text>
				</TextGroup>
				<Input inputRef={inputRef} size={inputSize} {...rest} />
			</Root>
		</ListItem>
	);
};

LabelledToggle.defaultProps = {
	Input: Checkbox,
	inputSize: 5,
	labelFontSize: 3,
	labelLineHeight: 6,
};

export default LabelledToggle;