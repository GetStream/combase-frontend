import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useChatContext } from 'stream-chat-react';

import lazyPreload from './lazyPreload';

import { WidgetConfig } from './WidgetConfig';
import { WidgetLauncher } from './WidgetLauncher';
import { WidgetShell } from './WidgetShell';

// const Conversation = lazyPreload(() => import(/* webpackChunkName: "conversation" */'./views/Conversation'));
// const Home = lazyPreload(() => import(/* webpackChunkName: "home" */'./views/Home'));

const Router = () => {
	const { channel } = useChatContext();
	return (
		<Suspense fallback={() => <p>Loading...</p>}>
			{/* {!channel ? <Home /> : <Conversation />} */}
			{/* <Home /> */}
			<div>Hello</div>
		</Suspense>
	);
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