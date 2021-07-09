import React from 'react';
import PropTypes from 'prop-types';
import { useChatContext } from 'stream-chat-react';

import { WidgetConfig } from './WidgetConfig';
import { WidgetLauncher } from './WidgetLauncher';
import { WidgetShell } from './WidgetShell';

import Conversation from './views/Conversation';
import Home from './views/Home';

const Router = () => {
	const { channel } = useChatContext();
	return !channel ? <Home /> : <Conversation />;
};

const CombaseWidget = ({ fabSize, organization, theme }) => (
    <WidgetConfig organization={organization} theme={theme}>
        <WidgetShell fabSize={fabSize} open={open}>
        	<Router />
        </WidgetShell>
        <WidgetLauncher size={fabSize} />
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