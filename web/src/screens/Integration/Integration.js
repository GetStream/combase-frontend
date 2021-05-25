import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'rc-scrollbars';

import { Box, Container } from '@combase.app/ui';

import useIntegrationDefinition from 'hooks/useIntegrationDefinition';
import MarkdownRenderer from 'components/MarkdownRenderer';

import Sidebar from './Sidebar';
import ConfigurationForm from './ConfigurationForm';

const Root = styled(Box)`
	display: grid;
	grid-template-columns: 25% 1fr .625fr;
`

const ConfigWrapper =  styled(Container)`
	border-left: 1px solid ${({ theme }) => theme.colors.border};
`;

const Integration = () => {
	const [integration] = useIntegrationDefinition();

	return (
		<Root>
			<Sidebar />
			<Scrollbars>
				<Container paddingTop={10} minHeight="100%">
					<MarkdownRenderer md={integration?.about} />
				</Container>
			</Scrollbars>
			<ConfigWrapper>
				<Scrollbars>
					<ConfigurationForm />
				</Scrollbars>
			</ConfigWrapper>
		</Root>
	);
};

export default Integration;