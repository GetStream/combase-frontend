import { lazy } from 'react';
import { ScrollContextProvider } from '@combase.app/ui';

import Home from '../views/Home/Home';
import Welcome from '../views/Welcome/Welcome';
import Channels from '../views/Channels/Channels';
import KnowledgeBase from '../views/KnowledgeBase/KnowledgeBase';
import Conversation from '../views/Conversation/Conversation';

import { AuthGuard, GuestGuard } from './guards';

export default [
    {
        path: '/',
        component: Home,
        guard: GuestGuard,
        exact: true,
    },
    {
        path: '/welcome',
        component: Welcome,
        guard: AuthGuard,
        exact: true,
    },
    {
        path: '/channels',
        component: Channels,
        layout: ScrollContextProvider,
        guard: GuestGuard,
        exact: false,
    },
    {
        path: '/knowledge-base',
        component: KnowledgeBase,
        layout: ScrollContextProvider,
        guard: GuestGuard,
        exact: false,
    },
    {
        path: '/c/:channelID',
        component: Conversation,
        guard: GuestGuard,
        exact: false,
    },
];
