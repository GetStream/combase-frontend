import React from 'react';
import styled from 'styled-components';
import { Box, Chip, SearchToolbar, Text } from '@combase.app/ui';

const Toolbar = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled(Box)`
	display: flex;
	align-items: center;
`;

const OrganizationQuickResponsesSettings = ({ children }) => {
	return (
		<Box>
			<Toolbar minHeight={9}>
				<Title>
					<Text fontSize={5} lineHeight={7}>Quick Responses</Text>
					<Chip marginLeft={3} color="text" variant="ghost" size="sm" label="5" />
				</Title>
			</Toolbar>
			<SearchToolbar />
		</Box>
	);
};

export default OrganizationQuickResponsesSettings;