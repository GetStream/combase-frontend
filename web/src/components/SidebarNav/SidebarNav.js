import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { layout } from '@combase.app/styles';
import { Box, StreamLogo } from '@combase.app/ui';

import SidebarGroup from './SidebarGroup';
import StatusBadge from './StatusBadge';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import { routes, renderIconRoute } from './utils';

const Root = styled(Box).attrs({
    as: 'nav',
    paddingX: 2,
    paddingY: 2,
})`
    ${layout};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FlexFill = styled(Box).attrs({
    as: 'span',
})`
    flex: 1 1 auto;
`;

export const SidebarNav = ({ as, children, logoTo, ...rest }) => (
    <Root {...rest} paddingY={4}>
        <Box marginBottom={3}>
            <NavLink to={logoTo}>
                <StreamLogo color="primary" size={6} />
            </NavLink>
        </Box>
        <SidebarGroup marginTop={2} gap={3}>
            {routes.map(renderIconRoute)}
        </SidebarGroup>
        <FlexFill />
        <SidebarGroup marginY={4}>
            <div>
                <ThemeToggle />
            </div>
            <div>
                <StatusBadge />
            </div>
        </SidebarGroup>
        <UserMenu />
    </Root>
);

SidebarNav.defaultProps = {
    logoTo: '/dashboard',
};
