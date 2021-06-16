import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Box, Card, Heading } from '@combase.app/ui';
import { itemGap } from '@combase.app/styles';

const Root = styled(Card)`
	max-height: calc(100vh - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	max-width: calc(100vw - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	display: grid;
	grid-template-rows: min-content 1fr min-content;

	@media (min-height: calc(${({ theme }) => theme.sizes[20]} + 4rem)) {
		max-height: ${({ theme }) => theme.sizes[20]};
	}
`;

export const DialogFooter = styled(Box).attrs({
	padding: 4,
	gapLeft: 3,
	backgroundColor: 'background',
})`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-top: 1px solid ${({ theme }) => theme.colors.border};

	& button + button {
		${itemGap}
	}
`;

const Dialog = forwardRef((props, ref) => {
	return (
		<Root as={props.as} ref={ref} minWidth={18}>
			<Box paddingX={5} paddingTop={7} paddingBottom={4}>
				<Heading fontSize={5} lineHeight={5}>
					{props.title}
				</Heading>
			</Box>
			{props.children}
		</Root>
	);
});

export default Dialog;