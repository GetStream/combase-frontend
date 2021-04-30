import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        height: 100%;
        width: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        font-family: ${({ theme }) => theme.fonts.text};
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.background};
    }

    #root {
        width: 100%;
        height: 100%;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
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
`
