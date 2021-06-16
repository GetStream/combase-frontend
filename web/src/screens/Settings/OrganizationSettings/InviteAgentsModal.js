import React, { forwardRef, useMemo } from 'react';
import styled from 'styled-components';
import { FieldArray, Formik } from 'formik';
import { AddCircleIcon, Box, Button, CloseCircleIcon, Container, IconButton, Text, TextInput } from '@combase.app/ui';

import Dialog, { DialogFooter } from 'components/modals/Dialog';

const ScrollContainer = styled(Container).attrs({
	paddingX: 5,
})`
	overflow: scroll;
`;

const FieldArrayInput = styled(Box)`
	display: grid;
	grid-template-columns: 1fr min-content;

	& + & {
		margin-top: ${({ theme }) => theme.space[4]};
	}
`;

const ArrayActions = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	min-width: ${({ theme }) => theme.sizes[11]};
`;

const renderFieldArray = ({ form: { handleBlur, handleChange, handleFocus, values }, name, push, remove }) => {
	const value = values[name];
	return value.map((v, i) => (
		<FieldArrayInput key={`${name}-${i}`}>
			<TextInput label="Email" name={`${name}.${i}`} onBlur={handleBlur} onChange={handleChange} onFocus={handleFocus} value={v} />
			<ArrayActions padding={2}>
				{i === value.length - 1 ? (
					<IconButton color={'text'} size={3} icon={AddCircleIcon} onClick={() => push('')} />
				) : null}
				{i > 0 || i === 0 && value.length > 1 ? (
					<IconButton color={'red'} size={3} icon={CloseCircleIcon} onClick={() => remove(i)} />
				) : null}
			</ArrayActions>
		</FieldArrayInput>
	));
}

const InviteAgentsModal = forwardRef(({ onClose }, ref) => {
	const initialValues = useMemo(() => ({
		invitations: ["", "", ""],
	}), []);
	return (
		<Dialog ref={ref} minWidth={18} title="Invite Agents">
			<ScrollContainer paddingTop={4} paddingBottom={8}>
				<Formik initialValues={initialValues}>
					{
						formik => {
							console.log(formik);
							return (
								<Box as="form" onSubmit={formik.handleSubmit}>
									<FieldArray 
										name="invitations"
										render={renderFieldArray}
									/>
								</Box>
							)
						}
					}
				</Formik>
			</ScrollContainer>
			<DialogFooter>
				<Button variant="flat" color="altText" onClick={onClose}>
					<Text color="altText">Cancel</Text>
				</Button>
				<Button>
					<Text color="white">Done</Text>
				</Button>
			</DialogFooter>
		</Dialog>
	)
});

export default InviteAgentsModal;