import React from 'react';
import { ThemeProvider } from 'styled-components';
import { themes } from '@combase.app/styles';

import useUser from '../useUser';

import {ChevronRightIcon} from '@combase.app/ui/icons';
import Label from '@combase.app/ui/Label';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';

const ChannelNotificationToast = ({ text, user }) => {
	const { data } = useUser(user);
	return (
		<ThemeProvider theme={themes.dark}>
			<TextGroup>
				<Label color="primary"><Text>New Chat</Text></Label>
				<IconLabel>
					<Text fontSize={3} lineHeight={3} opacity={0.56}>Click to view</Text>
					<ChevronRightIcon fillAlpha={0.56} size={3} />
				</IconLabel>
			</TextGroup>
		</ThemeProvider>

	);
};

export default ChannelNotificationToast;