import styled from 'styled-components';
import Text from '../../Text';

const MessageDate = styled(Text).attrs({
	as: 'span',
})`
    opacity: 0.5;
	text-transform: lowercase;
`;

export default MessageDate;