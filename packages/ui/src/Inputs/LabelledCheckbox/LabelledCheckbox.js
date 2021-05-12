import React from 'react';
import styled from 'styled-components';

import IconLabel from '../../IconLabel';
import Text from '../../Text';
import TextGroup from '../../TextGroup';
import { Checkbox } from '../Checkbox';

const Root = styled(IconLabel)`
	align-items: flex-start;
`;

const LabelledCheckbox = ({ children, className, style, title, description, ...rest }) => {
	return <Root className={className} gap={3} style={style}>
		<Checkbox size={5} {...rest} />
		<TextGroup>
			<Text fontSize={4} lineHeight={6} fontWeight={600}>{title}</Text>
			{children}
		</TextGroup>
	</Root>

};

export default LabelledCheckbox;