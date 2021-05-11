import styled, { css } from 'styled-components';

import Box from '../../Box';

const bubbleStyles = {
    bottom: ours => css`
		border-bottom-${ours ? 'right' : 'left'}-radius: .125rem;
	`,
    single: ours => css`
		border-bottom-${ours ? 'right' : 'left'}-radius: .125rem;
	`,
};

export const MessageBubble = styled(Box).attrs({
    paddingY: 1,
    paddingX: 2,
})`
    max-width: calc(100% - 3rem);
    background-color: ${({ $ours, theme }) => ($ours ? theme.colors.border : theme.colors.surface)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius * 2}rem;

    ${({ $grouping, $ours }) => bubbleStyles[$grouping]?.($ours) || ''};
`;
