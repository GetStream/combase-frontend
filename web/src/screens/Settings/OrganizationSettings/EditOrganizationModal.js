import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Avatar, Box, Button, Card, ChevronRightIcon, Container, Heading, ListItem, ListSubheader, Text, TextInput } from '@combase.app/ui';
import { itemGap } from '@combase.app/styles';

const Root = styled(Card)`
	max-height: calc(100vh - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	max-width: calc(100vw - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	display: grid;
	grid-template-rows: min-content 1fr min-content;
`;

const AvatarWrapper = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Footer = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	& button + button {
		${itemGap}
	}
`;

const Fields = styled(Box).attrs({
	paddingY: 2
})`
	& > * + * {
		${itemGap}
	}
`;

const EditOrganizationModal = forwardRef(({ onClose }, ref) => {
	return (
		<Root ref={ref} minWidth={18}>
			<Box paddingX={4} paddingTop={7} paddingBottom={4}>
				<Heading fontSize={5} lineHeight={5}>
					Edit Organization
				</Heading>
			</Box>
			<Container style={{overflow: 'scroll'}}>
				<AvatarWrapper marginY={4}>
					<Avatar size={12} />
				</AvatarWrapper>
				<Box marginY={4}>
					<ListSubheader>
						Profile Information
					</ListSubheader>
					<Fields gapTop={2}>
						<TextInput label="Name" />
						<TextInput label="Color" />
					</Fields>
				</Box>
				<Box marginY={4}>
					<ListSubheader>
						Primary Contact
					</ListSubheader>
					<Fields gapTop={2}>
						<TextInput label="Name" />
						<TextInput label="Email" />
					</Fields>
				</Box>
			</Container>
			<Footer backgroundColor="background" gapLeft={3} padding={4}>
				<Button variant="flat" color="altText" onClick={onClose}>
					<Text color="altText">Cancel</Text>
				</Button>
				<Button>
					<Text color="white">Save Changes</Text>
				</Button>
			</Footer>
		</Root>
	)
});

export default EditOrganizationModal;