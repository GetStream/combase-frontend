import React, { useCallback, useEffect } from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import useSound from 'use-sound';

import chimeWAV from './sounds/notification.wav';

import ChannelNotificationToast from './ChannelNotificationToast';
import MessageNotificationToast from './MessageNotificationToast';

const soundOpts = { 
	interrupt: true 
};

const useChatNotifications = () => {
	const [play] = useSound(chimeWAV, soundOpts);
	const { client, setActiveChannel, channel: activeChannel } = useChatContext();
	const history = useHistory();

	const handleAddedToChannel = useCallback((e) => {
		play();
		toast.dark(<ChannelNotificationToast />, {
			position: toast.POSITION.BOTTOM_LEFT,
			onClick: async () => {
				const channel = await getChannel(client, ...e.cid.split(":"));
				setActiveChannel(channel);
				history.push(`/chats/${e.channel_id}`);
			}
		});
	}, []);
	
	const handleNewMessage = useCallback((e) => {
		if (e.message.user.id !== client.userID && e.channel_id !== activeChannel) {
			play();
			toast.dark(<MessageNotificationToast user={e.message.user.id} text={e.message.text} />, {
				position: toast.POSITION.BOTTOM_LEFT,
				onClick: async () => {
					const channel = await getChannel(client, ...e.cid.split(":"));
					setActiveChannel(channel);
					history.push(`/chats/${e.channel_id}`);
				}
			});
		}
	}, [activeChannel, client]);

	useEffect(() => {
		client.on('notification.added_to_channel', handleAddedToChannel);
		client.on('notification.message_new', handleNewMessage);
		client.on('message.new', handleNewMessage);
		return () => {
			client.off('notification.added_to_channel', handleAddedToChannel)
			client.off('notification.message_new', handleNewMessage)
			client.off('message.new', handleNewMessage)
		};
	}, [handleAddedToChannel, handleNewMessage]);

	return null;
};

export default useChatNotifications;