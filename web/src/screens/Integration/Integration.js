import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Box, SidebarView, MarkdownRenderer } from '@combase.app/ui';

import useIntegrationDefinition from 'hooks/useIntegrationDefinition';

import Sidebar from './Sidebar';

const Integration = () => {
	const [integration] = useIntegrationDefinition();
	console.log(integration)
	return (
		<SidebarView columnTemplate="25% 1fr" Sidebar={<Sidebar />}>
			<Box paddingTop={13} minHeight="100%">
				<Switch>
					<Route>{() => <MarkdownRenderer md={integration?.about} />}</Route>
				</Switch>
			</Box>		
		</SidebarView>
	);
};

export default Integration;