import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { useChatContext } from 'stream-chat-react';

import { Box, Container, Button, Text, TextInput } from '@combase.app/ui';
import { itemGap } from '@combase.app/styles';

import { initialState, reducer } from './state';
import { useCreateTicket } from '../../../WidgetConfig';

const Root = styled(Container)`
    display: flex;
    flex-direction: column;

    & > * + * {
        ${itemGap};
    }
`;

const Submit = styled(Box)`
    display: flex;

    & button {
        width: 100%;
    }
`;

const WelcomeForm = () => {
	const { setActiveChannel } = useChatContext();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [{ loading }, onSubmit] = useCreateTicket();

	const handleBlur = ({ target }) => dispatch({
		type: 'blur',
		name: target.name,
	});
	
	const handleFocus = ({ target }) => dispatch({
		type: 'focus',
		name: target.name,
	});

	const handleChange = ({ target }) => dispatch({
		type: 'change',
		name: target.name,
		value: target.value,
	});

	const disableSubmit = !state.name.value || !state.email.value || !state.message.value;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			user: {
				name: state.name.value,
				email: state.email.value,
			},
			record: {
				message: state.message.value,
			}
		};

		const channel = await onSubmit(payload);

		setActiveChannel(channel);
	}

	return (
		<Root as="form" onSubmit={handleSubmit} gapTop={2}>
			<TextInput
				forceFocus
				focusedPlaceholder="e.g. Luke"
				label="Name"
				name="name"
				onBlur={handleBlur}
				onChange={handleChange}
				onFocus={handleFocus}
				value={state.name.value}
			/>
			<TextInput
				forceFocus
				focusedPlaceholder="e.g. luke@combase.app"
				label="Email"
				name="email"
				type="email"
				onBlur={handleBlur}
				onChange={handleChange}
				onFocus={handleFocus}
				value={state.email.value}
			/>
			<TextInput
				textarea
				rows={6}
				maxRows={10}
				forceFocus
				focusedPlaceholder="Let us know how we can help!"
				label="Message"
				name="message"
				onBlur={handleBlur}
				onChange={handleChange}
				onFocus={handleFocus}
				value={state.message.value}
			/>
			<Submit paddingY={1}>
				<Button disabled={disableSubmit} loading={loading} type="submit">
					<Text color="white">Start Conversation</Text>
				</Button>
			</Submit>
		</Root>
	);
}

export default WelcomeForm;