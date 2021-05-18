import React from 'react';
import { useContextSelector } from 'use-context-selector';
import styled from 'styled-components';

import {
	CloseIcon,
	Fab,
	Portal,
	StreamLogo,
} from '@combase.app/ui';

import { WidgetContext } from '../WidgetConfig';

const Root = styled(Fab)`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 999;
`;

const selector = ({ open, toggleWidgetCard }) => [open, toggleWidgetCard];
export const WidgetLauncher = ({ onMouseOver, size }) => {
    const [open, setOpen] = useContextSelector(WidgetContext, selector);
	
    return (
        <Portal>
            <Root icon={open ? CloseIcon : StreamLogo} onClick={() => setOpen(!open)} onMouseOver={onMouseOver} size={size} />
        </Portal>
    );
};
