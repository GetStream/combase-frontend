import {
    Tooltip,
    ChevronRightIcon,
    ConversationsIcon,
    SettingsIcon,
    DashboardIcon,
	PluginsIcon,
} from '@combase.app/ui';

import NavigationMenuItem from 'components/NavigationMenuItem';
import NavigationIconButton from 'components/NavigationIconButton';

export const renderMenuRoute = route => (
    <NavigationMenuItem
        actions={[<ChevronRightIcon color="altText" key={0} size={3} />]}
        color={route.color || 'text'}
        icon={route.icon}
        label={route.name}
        to={route.to}
        exact={route.exact}
        path={route.path}
        key={route.path}
    />
);

export const renderIconRoute = route => (
    <Tooltip text={route.name} placement="right">
        <div>
            <NavigationIconButton
                activeColor={route.color || 'primary'}
                color="altText"
                exact={route.exact}
                icon={route.icon}
                key={route.path}
                path={route.path}
                to={route.to}
            />
        </div>
    </Tooltip>
);

export const routes = [
    {
        exact: true,
        path: '/dashboard',
        name: 'Dashboard',
        icon: DashboardIcon,
        to: '/dashboard',
    },
    {
        exact: false,
        path: '/dashboard/conversations',
        name: 'Conversations',
        icon: ConversationsIcon,
        to: '/dashboard/conversations',
    },
    {
        exact: false,
        path: '/dashboard/tickets',
        name: 'Tickets',
        icon: ConversationsIcon,
        to: '/dashboard/tickets',
    },
    // {
    //     exact: false,
    //     path: '/dashboard/groups',
    //     name: 'Agent Groups',
    //     icon: GroupIcon,
    //     to: '/dashboard/groups',
    // },
    // {
    //     exact: false,
    //     path: '/dashboard/knowledge-base/:page?',
    //     name: 'Knowledge Base',
    //     icon: KnowledgeBaseIcon,
    //     to: '/dashboard/knowledge-base',
    // },
    {
        exact: false,
        path: '/dashboard/integrations',
        name: 'Integrations',
        icon: PluginsIcon,
        to: '/dashboard/integrations',
    },
    {
        exact: false,
        path: '/dashboard/settings',
        name: 'Settings',
        icon: SettingsIcon,
        to: '/dashboard/settings/profile',
    },
];
