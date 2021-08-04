import React from 'react';
import { ThemeProvider } from 'styled-components';
import { themes } from '@combase.app/styles';

import useUser from '../useUser';

import Label from '@combase.app/ui/Label';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';

const MessageNotificationToast = ({ text, user }) => {
	const { data } = useUser(user);
	return (
		<ThemeProvider theme={themes.dark}>
			<TextGroup>
				<Label color="primary"><Text>New Message</Text></Label>
				<TextGroup paddingY={2}>
					<Text fontSize={4} lineHeight={5}>{text}</Text>
					<Text fontSize={3} lineHeight={3} opacity={0.56}>from {data?.user.name}</Text>
				</TextGroup>
			</TextGroup>
		</ThemeProvider>

	);
};

export default MessageNotificationToast;