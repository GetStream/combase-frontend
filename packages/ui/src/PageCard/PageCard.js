import styled from 'styled-components';
import { variant } from '@combase.app/styles';

import Card from '../Card';

const PageCard = styled(Card).attrs({
    borderTopLeftRadius: ['unset', 'unset', 2],
    borderBottomLeftRadius: ['unset', 'unset', 2],
    borderTopRightRadius: 'unset',
    borderBottomRightRadius: 'unset',
})`
	${variant({
		variants: {
			withHeader: {
				display: 'grid',
				gridTemplateRows: 'min-content 1fr'
			}
		}
	})};
	z-index: 2;
	width: 100%;
    height: 100%;
	box-shadow: -4px 0px 24px -8px ${({ theme }) => theme.utils.colors.fade(theme.colors.shadow, .4)};
`;

export default PageCard;