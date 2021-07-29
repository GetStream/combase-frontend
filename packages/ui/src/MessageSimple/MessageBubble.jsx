import styled, { css } from 'styled-components';

import Box from '../Box';

const bubbleStyles = {
    bottom: ours => css`
		border-bottom-${ours ? 'right' : 'left'}-radius: .125rem;
	`,
    single: ours => css`
		border-bottom-${ours ? 'right' : 'left'}-radius: .125rem;
	`,
};

export const MessageBubble = styled(Box).attrs(props => ({
    borderRadius: 3,
    marginRight: !props.$ours ? 8 : 0,
    marginLeft: props.$ours ? 8 : 0,
    paddingY: 2,
    paddingX: 3,
}))`
    max-width: 100%;
    background-color: ${({ $ours, theme }) => ($ours ? theme.colors[theme.dark ? 'primary' : 'border'] : theme.colors.surface)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    overflow-wrap: break-word;

    ${({ $grouping, $ours }) => bubbleStyles[$grouping]?.($ours) || ''};
`;
