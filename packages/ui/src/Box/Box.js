import styled from 'styled-components';
import { border, color, display, layout, shadow, space, zIndex } from '@combase.app/styles';

const Box = styled.div`
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    position: relative;

    ${border};
    ${color};
    ${display};
    ${layout};
    ${space};
    ${shadow.boxShadow};
    ${zIndex};
`;

Box.defaultProps = {
	backgroundColor: 'transparent'
}

export default Box;