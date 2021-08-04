import React from 'react';
import { ThemeProvider } from 'styled-components';
import { themes } from '@combase.app/styles';

import useUser from '../useUser';

import {ChevronRightIcon} from '@combase.app/ui/icons';
import Label from '@combase.app/ui/Label';
import IconLabl from '@combase.app/ui/IconLabl';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';

const ChannelNotificationToast = ({ text, user }) => {
	const { data } = useUser(user);
	return (
		<ThemeProvider theme={themes.dark}>
			<TextGroup>
				<Label color="primary"><Text>New Chat</Text></Label>
				<IconLabel reverse>
					<ChevronRightIcon fillAlpha={0.56} size={3} />
					<Text fontSize={3} lineHeight={3} opacity={0.56}>Click to view</Text>
				</IconLabel>
			</TextGroup>
		</ThemeProvider>

	);
};

export default ChannelNotificationToast;