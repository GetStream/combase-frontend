import React, { forwardRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FieldArray, Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';

import useCurrentUser from 'hooks/useCurrentUser';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import { AddCircleIcon, CloseIcon, GoogleIcon, ZendeskIcon } from '@combase.app/ui/icons';
import IconButton from '@combase.app/ui/IconButton';
import IconLabel from '@combase.app/ui/IconLabel';
import ListSubheader from '@combase.app/ui/ListSubheader';
import MenuItem from '@combase.app/ui/MenuItem';
import SelectInput from '@combase.app/ui/SelectInput';
import Text from '@combase.app/ui/Text';
import TextInput from '@combase.app/ui/TextInput';
import TextLink from '@combase.app/ui/TextLink';

import { CREATE_INVITATION } from 'apollo/operations';

import Dialog, { DialogFooter } from 'components/Dialog';

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
		<Box maxWidth={21}>
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
							<IconButton color={'altText'} size={3} icon={CloseIcon} type="button" onClick={() => remove(i)} />
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
	const { data } = useCurrentUser();
	const [createInvitations] = useMutation(CREATE_INVITATION)
	const me = data?.me;
	const organization = data?.organization;

	const initialValues = useMemo(() => ({
		invitations: [
			{ email: "", access: "guest" },
			{ email: "", access: "guest" },
			{ email: "", access: "guest" }
		],
	}), []);

	const handleSubmit = useCallback(async (values) => {
		try {
			const invitations = values.invitations.map(({ email, access }) => email ? ({
				to: email,
				access,
				from: me?._id,
				organization: organization?._id,
			}) : undefined).filter(invt => !!invt);
	
			await createInvitations({
				variables: {
					records: invitations,
				}
			});
			toast.dark(`${invitations.length} invitation${invitations.length === 1 ? '' : 's'} sent.`);
			onClose();
		} catch (error) {
			toast.error(error.message);
		}
	}, [me, organization, onClose]);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{
				formik => (
					<Dialog as={Form} ref={ref} minWidth={22} title="Invite Agents" onSubmit={formik.handleSubmit}>
						<ScrollContainer paddingTop={4} paddingBottom={6}>
							<Box as="form" >
								<FieldArray 
									name="invitations"
									render={renderFieldArray}
								/>
								<ListSubheader marginTop={6}>
									Bulk Import
								</ListSubheader>
								<ImportBtns paddingY={3}>
									<Button backgroundColor="background" color="altText" variant="flat">
										<Text fontSize={4} color="altText">Import CSV</Text>
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
						</ScrollContainer>
						<DialogFooter>
							<Button variant="flat" color="altText" onClick={onClose}>
								<Text color="altText">Cancel</Text>
							</Button>
							<Button type="submit">
								<Text color="white">Send Invites</Text>
							</Button>
						</DialogFooter>
					</Dialog>
				)
			}
		</Formik>
	)
});

export default InviteAgentsModal;