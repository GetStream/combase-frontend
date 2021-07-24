import React, { forwardRef } from 'react';
import styled from 'styled-components';

import Box from '@combase.app/ui/Box';
import Card from '@combase.app/ui/Card';

const Root = styled(Card)`
	width: 100%;
	height: 100%;
	max-height: calc(100vh - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	max-width: calc(100vw - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	display: grid;
	grid-template-columns: ${({ theme }) => theme.sizes[17]} 1fr;
	overflow: hidden;
	transform: translateZ(0);

	@media (min-height: ${({ theme }) => theme.breakpoints.sm}) {
		max-width: ${({ theme }) => theme.sizes[21]};
		max-height: ${({ theme }) => theme.sizes[22]};
		margin-left: ${({theme }) => theme.space[4]};
		margin-right: ${({theme }) => theme.space[4]};
	}
`;

const ConfigureIntegrationModal = forwardRef((props, ref) => {
	return (
		<Root variant="border" ref={ref}>
			Integration Config
		</Root>
	);
});

export default ConfigureIntegrationModal;