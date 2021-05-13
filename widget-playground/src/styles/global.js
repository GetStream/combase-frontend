import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    ${({ scope }) => scope} {
        position: fixed;
        bottom: 0;
        right: 0;
    }

    * {
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.fontFamily};
    }

    p {
        margin: 0;
        font-size: .75rem;
        font-variation-settings: "wght" 500;
        line-height: 1rem;
        color: ${({ theme }) => theme.colors.text};
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        color: ${({ theme }) => theme.colors.text};
    }

    button {
        border: 0;
        margin: 0;
        outline: 0;
    }

    input, textarea {
        outline: 0;
        border: 0;
        font-family: ${({ theme }) => theme.fontFamily};
    }
`;
