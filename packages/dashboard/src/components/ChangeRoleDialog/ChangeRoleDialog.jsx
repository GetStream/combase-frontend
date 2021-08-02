import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { UPDATE_AGENT } from 'apollo/operations/agent';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Checkbox from '@combase.app/ui/Checkbox';
import Chip from '@combase.app/ui/Chip';
import Container from '@combase.app/ui/Container';
import { ChangeRoleIcon, RoleIcon } from '@combase.app/ui/icons';
import ListItem from '@combase.app/ui/ListItem';
import Text from '@combase.app/ui/Text';

import Dialog, { DialogFooter } from 'components/Dialog';

import useAgent from 'hooks/useAgent';

const ItemHeader = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const AccessChip = styled(Chip)`
	text-transform: capitalize;
`;

const validationSchema = yup.object().shape({
	access: yup.string().oneOf(['admin', 'moderator', 'guest']).required(),
});

const RoleItem = ({ checked, label, name, onChange, color, description }) => {
	const checkboxRef = useRef();

	const stopPropagation = e => e.stopPropagation();
	return (
		<ListItem active={checked} interaction="highlight" onClick={() => checkboxRef.current.click()}>
			<Box padding={2}>
				<ItemHeader>
					<AccessChip color={color} icon={RoleIcon} label={label} reverse variant="ghost" />
					<Checkbox inputRef={checkboxRef} checked={checked} name={name} onClick={stopPropagation} onChange={onChange} />
				</ItemHeader>
				<Box marginTop={2}>
					<Text fontSize={4} fontWeight={400} lineHeight={6}>
						{description}
					</Text>
				</Box>
			</Box>
		</ListItem>
	);
};

const ChangeRoleDialog = forwardRef(({ agentId, onClose }, ref) => {
	const {data} = useAgent(agentId);
	const organization = data?.organization;
	const agent = organization?.agent;
	const [handleUpdateAgent, { loading }] = useMutation(UPDATE_AGENT);

	const initialValues = useMemo(() => ({
		access: agent?.access || '',
	}), [agent]);

	const handleSubmit = useCallback(async (variables) => {
		try {
			await handleUpdateAgent({
				variables: {
					_id: agentId,
					record: variables,
				},
				update: (_, { data: { agentUpdate: { agent } } }) => {
					toast.dark(`${agent.name.display} changed to: ${variables.access}`);
				}
			});
			onClose();
		} catch (error) {
			toast.error(error.message);
		}
	}, [agentId])

	return (
		<Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
			{
				formik => (
					<Dialog as={Form} onSubmit={formik.handleSubmit} icon={ChangeRoleIcon} ref={ref} title="Change Access Role">
						<Container paddingX={5} paddingY={6}>
							<Text fontSize={4} fontWeight={400} lineHeight={6} maxWidth={19}>
								Change the access role for {agent?.name.full} within the {organization?.name} Organization.
							</Text>
						</Container>
						<Container paddingX={2} paddingBottom={8}>
							<RoleItem 
								checked={formik.values.access === 'admin'}
								name="admin"
								label="Admin"
								onChange={({ target }) => formik.setFieldValue('access', target.checked ? target.name : undefined)}
								description="Admins have full access; They can invite new agents, view all chats, reassign conversations that are currently assigned, and configure Organization & Widget level settings."
							/>
							<RoleItem 
								checked={formik.values.access === 'moderator'}
								color="altText"
								name="moderator"
								label="Moderator"
								onChange={({ target }) => formik.setFieldValue('access', target.checked ? target.name : undefined)}
								description="Moderators can view conversations they have been assigned, transfer to other agents, and interact with customers."
							/>
						</Container>
						<DialogFooter>
							<Button onClick={onClose} color="altText" variant="flat">
								<Text color="altText">Cancel</Text>
							</Button>
							<Button loading={loading} type="submit" disabled={!formik.dirty || !formik.isValid}>
								<Text color="white">Save</Text>
							</Button>
						</DialogFooter>
					</Dialog>
				)
			}
		</Formik>
	);
});

export default ChangeRoleDialog;