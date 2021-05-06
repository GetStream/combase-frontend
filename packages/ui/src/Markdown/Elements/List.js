import styled from 'styled-components';

import Element from './Element';

const ListItemElement = styled(Element)`
    line-height: 2;
    &::marker {
        color: ${({ theme }) => theme.colors.text};
        font-family: ${({ theme }) => theme.fonts.text};
        font-variation-settings: 'wght' 600;
    }

    & > p {
        margin: 0;
    }
`;

export default {
    ul: {
        component: Element,
    },
    ol: {
        component: Element,
    },
    li: {
        component: ListItemElement,
    },
};
