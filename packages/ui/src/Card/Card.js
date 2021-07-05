import styled from 'styled-components';
import { variant } from '@combase.app/styles';

import Box from '../Box';

const Card = styled(Box).attrs({
    backgroundColor: 'surface',
    borderRadius: 3,
})`
	overflow: hidden;
	${
		({borderWidth}) => variant({
			variants: {
				border: {
					borderColor: 'border',
					borderWidth: borderWidth || '1px',
					borderStyle: 'solid'
				}
			}
		})
	}
`;

export default Card;