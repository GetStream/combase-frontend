import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useChatContext } from 'stream-chat-react';

import Box from '@combase.app/ui/Box';
import Card from '@combase.app/ui/Card';
import CardHeader from '@combase.app/ui/CardHeader';
import { AddIcon, SendIcon } from '@combase.app/ui/icons';
import { InputBase } from '@combase.app/ui/shared';
import IconButton from '@combase.app/ui/IconButton';
import Spinner from '@combase.app/ui/Spinner';

import { useCreateTicket } from '../../../WidgetConfig';

const InputWrapper = styled(Box)`
	display: grid;
	grid-template-columns: 1fr min-content;
	grid-auto-rows: 1fr;
`;

const SendWrapper = styled(Box)`
	display: flex;
	align-items: flex-end;
	justify-content: center;
`

const Header = ({ loading }) => (
	<CardHeader
		action={
			loading ? (
				<Spinner size={4} />
			) : undefined
		}
		icon={<AddIcon color="primary" size={4} />}
		minHeight={9}
		paddingX={[4, 4, 5]}
		paddingTop={4}
	>
		Start a conversation
	</CardHeader>
);

const NewConversation = () => {
	const [{ loading }, createTicket] = useCreateTicket();
	const { setActiveChannel } = useChatContext();
	const [disabled, setDisabled] = useState(true);
	
	const handleChange = useCallback(e => setDisabled(!e.target.value), []);

	const handleSubmit = useCallback(async (e) => {
		e.preventDefault();
		
		if (disabled) {
			return;
		}
		
		const [{ value: message }] = e.target;
		const variables = {
			record: {
				message,
			}
		};
	
		const channel = await createTicket(variables)
		setActiveChannel(channel);
	}, [disabled, setActiveChannel]);

    return (
        <Card boxShadow={2} variant="border">
            <Header loading={loading} />
			<InputWrapper as="form" onSubmit={handleSubmit}>
				<InputBase autoComplete="off" onChange={handleChange} name="message" placeholder="Type your message..." minHeight={4} paddingX={5} paddingTop={2} paddingBottom={6} label="Message" />
				<SendWrapper minWidth={9} paddingBottom={6}>
					<IconButton
						disabled={disabled}
						type="submit"
						color="primary"
						icon={SendIcon}
					/>
				</SendWrapper>
			</InputWrapper>
        </Card>
    );
};

export default NewConversation;
