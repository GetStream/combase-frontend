import { createElement, useRef } from 'react';
import styled from 'styled-components';
import { useClickAway } from 'react-use';
import { colorAlpha } from '@combase.app/styles';

import Box from '../Box';
import Portal from '../Portal';

const Root = styled(Box)`
	${colorAlpha};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: ${({ theme }) => theme.zIndices[8]};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = ({ backdrop, children, component, onClose, open, ...rest }) => {
    const ref = useRef();
    useClickAway(ref, onClose);

    return (
        <Portal unmount={!open}>
            <Root backgroundColorAlpha={0.8} backgroundColor={backdrop ? 'background' : undefined} role="presentation">
                {createElement(component, { children, onClose, ref, ...rest })}
            </Root>
        </Portal>
    );
};

export default Modal;