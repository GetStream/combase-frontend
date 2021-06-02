import styled from 'styled-components';

import Text from '../../Text';

export const MessageDate = styled(Text).attrs({
	as: 'span',
})`
    opacity: 0.5;
	text-transform: lowercase;
`;
