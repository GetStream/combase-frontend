import React, { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useChatContext } from 'stream-chat-react';
import styled from 'styled-components';

import { CloseIcon } from '@combase.app/ui/build/icons';
import Fab from '@combase.app/ui/build/Fab';
import Portal from '@combase.app/ui/build/Portal';
import StreamLogo from '@combase.app/ui/build/StreamLogo';

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
	const { setActiveChannel } = useChatContext();

	const handleClick = useCallback(() => {
		setOpen();
		setActiveChannel(null);
	}, []);

    return (
        <Portal>
            <Root icon={open ? CloseIcon : StreamLogo} onClick={handleClick} iconSize={open ? 6 : 8} onMouseOver={onMouseOver} size={size} />
        </Portal>
    );
};
