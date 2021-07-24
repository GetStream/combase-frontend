import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';

import Box from '@combase.app/ui/Box'
import Card from '@combase.app/ui/Card'
import IconLabel from '@combase.app/ui/IconLabel'
import {Heading} from '@combase.app/ui/Text'

const Root = styled(Card)`
	max-height: calc(100vh - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	max-width: calc(100vw - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	display: grid;
	grid-template-rows: min-content 1fr min-content;

	@media (min-height: calc(${({ theme }) => theme.sizes[23]} + 4rem)) {
		max-width: ${({ theme }) => theme.sizes[21]};
		max-height: ${({ theme }) => theme.sizes[23]};
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
	const Icon = props.icon;
	return (
		<Root variant="border" as={props.as} minWidth={props.minWidth} className={props.className} ref={ref}>
			<Box paddingX={5} paddingTop={7} paddingBottom={4}>
				<IconLabel gap={2}>
					{Icon ? <Icon color='primary' size={5} /> : null}
					<Heading fontSize={5} lineHeight={5}>
						{props.title}
					</Heading>
				</IconLabel>
			</Box>
			{props.children}
		</Root>
	);
});

export default Dialog;