import { StreamChat } from 'stream-chat';

export const createAuthedChatClient = ({ me: user, organization }) => {
    const client = StreamChat.getInstance(organization.stream.key, null, { location: 'us-east' });
	client.setBaseURL('https://chat.stream-io-api.com');
	
    client.connectUser(
        {
            id: user._id,
        },
        user.streamToken
    );

    return client;
};