import styled, { keyframes } from 'styled-components';
import { system } from '@combase.app/styles';
import { nanoid } from 'nanoid';

import Box from '../Box';

export const animation = keyframes`
	
`;

const placeholderHeight = system({
    fontSize: {
        property: 'height',
        scale: 'fontSizes',
    },
    placeholderHeight: {
        property: 'height',
        scale: 'fontSizes',
    },
});

const placeholderWidth = system({
    fontSize: {
        property: 'height',
        scale: 'fontSizes',
    },
    lineHeight: {
        property: 'height',
        scale: 'fontSizes',
    },
    placeholderWidth: {
        property: 'width',
        scale: 'sizes',
    },
});

const Placeholder = styled(Box).attrs({
    children: null,
    placeholderId: nanoid(4),
})`
	min-width: .25rem;
	${placeholderHeight};
	${placeholderWidth};

	animation: 1s placeholder-${({ placeholderId }) => placeholderId} linear infinite;

	@keyframes placeholder-${({ placeholderId }) => placeholderId} {
		0% {
			background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors['text'], 0.02)};
		}
		50% {
			background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors['text'], 0.08)};
		}
		100% {
			background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors['text'], 0.02)};
		}
	}
`;

export default Placeholder;