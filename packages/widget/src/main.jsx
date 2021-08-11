import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useChatContext } from 'stream-chat-react';

import lazyPreload from './lazyPreload';

import { WidgetConfig } from './WidgetConfig';
import { WidgetLauncher } from './WidgetLauncher';
import { WidgetShell } from './WidgetShell';

const Conversation = lazyPreload(() => import(/* webpackChunkName: "conversation" */'./views/Conversation'));
const Home = lazyPreload(() => import(/* webpackChunkName: "home" */'./views/Home'));

const Router = () => {
	const { channel } = useChatContext();
	return !channel ? <Home /> : <Conversation />;
};

const CombaseWidget = ({ fabSize, organization }) => (
    <WidgetConfig organization={organization}>
        <WidgetShell fabSize={fabSize} open={open}>
        	<Router />
        </WidgetShell>
        <WidgetLauncher onMouseOver={Home.preload} size={fabSize} />
    </WidgetConfig>
);

CombaseWidget.propTypes = {
    fabSize: PropTypes.number,
    organization: PropTypes.string,
    theme: PropTypes.oneOf(['dark', 'light', 'system']),
};

CombaseWidget.defaultProps = {
    fabSize: 10,
    theme: 'light',
};

export default CombaseWidget;