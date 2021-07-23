import styled from 'styled-components';
import { variant } from '@combase.app/styles';

import Box from '../Box';

const Card = styled(Box)`
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

Card.defaultProps = {
	backgroundColor: 'surface',
	borderRadius: 5
}

export default Card;