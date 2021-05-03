import { useContext } from 'react';
import { ChannelManagerContext } from '../../contexts/channelManager/context';

export const useChannelManager = () => useContext(ChannelManagerContext);
