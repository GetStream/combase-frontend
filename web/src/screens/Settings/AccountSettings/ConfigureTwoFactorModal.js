import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Button, Container, Text } from '@combase.app/ui';

import Dialog, { DialogFooter } from 'components/modals/Dialog';

const ScrollContainer = styled(Container).attrs({
	paddingX: 5,
})`
	overflow: scroll;
`

const ChangePasswordModal = forwardRef(({ onClose }, ref) => {
	return (
		<Dialog ref={ref} minWidth={18} title="Two-Factor Authentication">
			<ScrollContainer paddingBottom={4}>
				
			</ScrollContainer>
			<DialogFooter>
				<Button variant="flat" color="altText" onClick={onClose} type="button">
					<Text color="altText">Cancel</Text>
				</Button>
				<Button type="submit">
					<Text color="white">Next</Text>
				</Button>
			</DialogFooter>
		</Dialog>
	)
});

export default ChangePasswordModal;