import styled from 'styled-components';

import { Text } from '../../Text';

export const MessageDate = styled(Text).attrs({
	as: 'span',
	fontSize: 2,
	lineHeight: 2,
})`
    opacity: 0.5;
`;
