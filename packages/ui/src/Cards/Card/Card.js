import styled from 'styled-components';

import { Box } from '../../Layout';

const Card = styled(Box).attrs({
    backgroundColor: 'surface',
    borderRadius: 3,
})`
	overflow: hidden;
`;

export default Card;