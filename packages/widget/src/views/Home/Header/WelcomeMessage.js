import { useChatContext } from 'stream-chat-react';

import { useAuth } from '../../../WidgetConfig';

const WelcomeMessage = () => {
	const [auth] = useAuth();
	const {client} = useChatContext();
	const { user } = client || {};

	if (auth && user?.name) {
		return `Welcome Back, ${user.name}! 👋`
	}

	return 'Hi! 👋';
}

export default WelcomeMessage;