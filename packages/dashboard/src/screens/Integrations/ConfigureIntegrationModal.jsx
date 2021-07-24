import React, { forwardRef } from 'react';
import styled from 'styled-components';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import Card from '@combase.app/ui/Card';
import Container from '@combase.app/ui/Container';
import Text from '@combase.app/ui/Text';

import useIntegrationDefinition from 'hooks/useIntegrationDefinition';

const Root = styled(Card)`
	width: 100%;
	max-height: calc(100vh - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	max-width: calc(100vw - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	overflow: hidden;
	transform: translateZ(0);

	@media (min-height: ${({ theme }) => theme.breakpoints.sm}) {
		max-width: ${({ theme }) => theme.sizes[21]};
		max-height: ${({ theme }) => theme.sizes[22]};
		margin-left: ${({theme }) => theme.space[4]};
		margin-right: ${({theme }) => theme.space[4]};
	}
`;

const Header = styled(Container)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const Description = styled(Container)`
	text-align: center;
`;

const ConfigureIntegrationModal = forwardRef((props, ref) => {
	const { data } = useIntegrationDefinition(props.id);
	return (
		<Root variant="border" ref={ref}>
			<Header paddingX={7} paddingY={10}>
				<Avatar size={13} variant="circle" />
				<Text fontSize={5} lineHeight={7} marginTop={5} maxWidth={17}>
					Connect {data?.integrationDefinition?.name} to your Combase Organization.
				</Text>
				<Text marginTop={8} color="primary" fontSize={4} lineHeight={6}>Sync Combase events with Google Analytics and track visits, and widget interactions in your reports.</Text>
			</Header>
		</Root>
	);
});

export default ConfigureIntegrationModal;