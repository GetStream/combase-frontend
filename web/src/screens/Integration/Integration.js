import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';

import { Box, Container, Tabs, Tab, MarkdownRenderer } from '@combase.app/ui';

import SidebarView from 'layouts/SidebarView';
import useIntegrationDefinition from 'hooks/useIntegrationDefinition';

import Sidebar from './Sidebar';

const TabWrapper =  styled(Container)`
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	min-height: 4rem;
    display: flex;
    align-items: flex-end;
`;

const Integration = () => {
	const [integration] = useIntegrationDefinition();
	
	const history = useHistory();
	const params = useParams();

	const handleTabChange = useCallback(
		slug => {
			history.push(
				slug
					? `/integrations/${params.integrationId}/${slug}`
					: `/integrations/${params.integrationId}`,
				{
					preserve: false,
				}
			);
		},
		[history, params]
	);

	return (
		<SidebarView columnTemplate="25% 1fr" Sidebar={<Sidebar />}>
			<Box>
				<TabWrapper variant="fluid">
					<Tabs onChange={handleTabChange} value={params.page}>
						<Tab label="About" value={undefined} />
						<Tab label="Configuration" value="configuration" />
					</Tabs>
				</TabWrapper>
				<Container paddingTop={10} minHeight="100%">
					<Switch>
						<Route>{() => <MarkdownRenderer md={integration?.about} />}</Route>
					</Switch>
				</Container>
			</Box>		
		</SidebarView>
	);
};

export default Integration;