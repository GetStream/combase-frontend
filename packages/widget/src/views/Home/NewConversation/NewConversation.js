import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useChatContext } from 'stream-chat-react';
import {
	Box,
	Card,
	CardHeader,
	IconButton,
	Spinner,
	AddIcon,
	SendIcon,
} from '@combase.app/ui';
import { InputBase } from '@combase.app/ui/src/Inputs';

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
		icon={<AddIcon color="blue" size={4} />}
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

	const handleSubmit = useCallback(async (e) => {
		e.preventDefault();
		
		const [{ value: message }] = e.target;
		const variables = {
			record: {
				message,
			}
		};
	
		const channel = await createTicket(variables)
		setActiveChannel(channel);
	}, [setActiveChannel]);

    return (
        <Card boxShadow={2}>
            <Header loading={loading} />
			<InputWrapper as="form" onSubmit={handleSubmit}>
				<InputBase name="message" placeholder="Type your message..." minHeight={4} paddingX={5} paddingTop={2} paddingBottom={6} label="Message" />
				<SendWrapper minWidth={9} paddingBottom={6}>
					<IconButton
						type="submit"
						icon={SendIcon}
					/>
				</SendWrapper>
			</InputWrapper>
        </Card>
    );
};

export default NewConversation;
