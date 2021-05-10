import { lazy } from 'react';
import { ScrollContextProvider } from '@combase.app/ui/src/contexts';

import { AuthGuard, GuestGuard } from './guards';

export default [
    {
        path: '/',
        component: lazy(() => import(/* webpackChunkName: "CombaseWidgetHome" */ '../views/Home/Home')),
        guard: GuestGuard,
        exact: true,
    },
    {
        path: '/welcome',
        component: lazy(() => import(/* webpackChunkName: "CombaseWidgetWelcome" */ '../views/Welcome/Welcome')),
        guard: AuthGuard,
        exact: true,
    },
    {
        path: '/channels',
        component: lazy(() => import(/* webpackChunkName: "CombaseWidgetWelcome" */ '../views/Channels/Channels')),
        layout: ScrollContextProvider,
        guard: GuestGuard,
        exact: false,
    },
    {
        path: '/knowledge-base',
        component: lazy(() => import(/* webpackChunkName: "CombaseWidgetKnowledgeBase" */ '../views/KnowledgeBase/KnowledgeBase')),
        layout: ScrollContextProvider,
        guard: GuestGuard,
        exact: false,
    },
    {
        path: '/c/:channelID',
        component: lazy(() => import(/* webpackChunkName: "CombaseWidgetWelcome" */ '../views/Conversation/Conversation')),
        guard: GuestGuard,
        exact: false,
    },
];
