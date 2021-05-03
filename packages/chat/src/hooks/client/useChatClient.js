import {useContextSelector} from 'use-context-selector';

import { ChatContext } from '../../contexts/client/context';

const getClientSelector = ({client}) => client;

export const useChatClient = () => useContextSelector(ChatContext, getClientSelector);
