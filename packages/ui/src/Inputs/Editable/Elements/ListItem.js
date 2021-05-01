import styled from 'styled-components';

const ListItemElement = styled.li`
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

export default ListItemElement;
