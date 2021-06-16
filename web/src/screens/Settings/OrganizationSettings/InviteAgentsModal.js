import React, { forwardRef, useMemo } from 'react';
import styled from 'styled-components';
import { FieldArray, Formik } from 'formik';
import { AddCircleIcon, Box, Button, CloseIcon, Container, GoogleIcon, IconButton, IconLabel, ListSubheader, MenuItem, SelectInput, Text, TextInput, TextLink, ZendeskIcon } from '@combase.app/ui';

import Dialog, { DialogFooter } from 'components/modals/Dialog';

const ScrollContainer = styled(Container).attrs({
	paddingX: 5,
})`
	overflow: scroll;
`;

const FieldArrayInput = styled(Box)`
	display: grid;
	grid-template-columns: 1fr .5fr min-content;
	grid-gap: ${({ theme }) => theme.space[2]};

	& + & {
		margin-top: ${({ theme }) => theme.space[4]};
	}
`;

const ArrayActions = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const ImportBtns = styled(Box)`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: ${({ theme }) => theme.space[3]};
`;

const renderFieldArray = ({ form: { handleBlur, handleChange, handleFocus, values }, name, push, remove }) => {
	const value = values[name];
	return (
		<Box>
			{value.map((v, i) => (
				<FieldArrayInput key={`${name}-${i}`}>
					<TextInput label="Email" name={`${name}.${i}.email`} onBlur={handleBlur} onChange={handleChange} onFocus={handleFocus} value={v.email} />
					<SelectInput label="Access" name={`${name}.${i}.access`} onBlur={handleBlur} onChange={handleChange} onFocus={handleFocus} value={v.access}>
						<MenuItem label="Super Admin" value="super_admin" />
						<MenuItem label="Admin" value="admin" />
						<MenuItem label="Moderator" value="moderator" />
						<MenuItem label="Guest" value="guest" />
					</SelectInput>
					<ArrayActions padding={2}>
						{i > 0 || (i === 0 && value.length > 1) ? (
							<IconButton color={'altText'} size={3} icon={CloseIcon} onClick={() => remove(i)} />
						) : null}
					</ArrayActions>
				</FieldArrayInput>
			))}
			<Box display="flex">
				<TextLink reverse color="primary" marginTop={3} icon={AddCircleIcon} onClick={() => push("")}>
					Add Invitee
				</TextLink>
			</Box>
		</Box>
	);
}

const InviteAgentsModal = forwardRef(({ onClose }, ref) => {
	const initialValues = useMemo(() => ({
		invitations: [
			{ email: "", access: "guest" },
			{ email: "", access: "guest" },
			{ email: "", access: "guest" }
		],
	}), []);
	return (
		<Dialog ref={ref} minWidth={20} title="Invite Agents">
			<ScrollContainer paddingTop={4} paddingBottom={6}>
				<Formik initialValues={initialValues}>
					{
						formik => (
							<Box as="form" onSubmit={formik.handleSubmit}>
								<FieldArray 
									name="invitations"
									render={renderFieldArray}
								/>
								<ListSubheader marginTop={6}>
									Bulk Import
								</ListSubheader>
								<ImportBtns paddingY={3}>
									<Button backgroundColor="background" color="altText" variant="flat">
										<Text color="altText">Import CSV</Text>
									</Button>
									<Button backgroundColor="background" color="altText" variant="flat">
										<IconLabel>
											<GoogleIcon />
											<Text>Import G Suite</Text>
										</IconLabel>
									</Button>
									<Button backgroundColor="background" color="altText" variant="flat">
										<IconLabel>
											<ZendeskIcon />
											<Text>Import Zendesk</Text>
										</IconLabel>
									</Button>
								</ImportBtns>
							</Box>
						)
					}
				</Formik>
			</ScrollContainer>
			<DialogFooter>
				<Button variant="flat" color="altText" onClick={onClose}>
					<Text color="altText">Cancel</Text>
				</Button>
				<Button>
					<Text color="white">Send Invites</Text>
				</Button>
			</DialogFooter>
		</Dialog>
	)
});

export default InviteAgentsModal;