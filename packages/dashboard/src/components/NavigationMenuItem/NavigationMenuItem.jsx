import React from 'react';
import { Route } from 'react-router-dom';

import MenuItem from "@combase.app/ui/MenuItem";
import { ChevronRightIcon } from "@combase.app/ui/icons";

const defaultActions = [<ChevronRightIcon color="altText" fillAlpha={.56} size={3} key={0} />];

const NavigationMenuItem = ({ actions = defaultActions, iconColor, color, icon, label, navigationMethod, onClick, to, ...rest }) => (
    <Route path={to} {...rest}>
        {({ history, match }) => (
            <MenuItem
                iconColor={iconColor || color}
				color={match ? 'primary' : "text"}
                actions={!match ? actions : []}
                active={match}
                icon={icon}
                label={label}
                onClick={() => {
                    if (!match) {
                        history[navigationMethod](to);
                    }
                    if (onClick) {
                        onClick();
                    }
                }}
            />
        )}
    </Route>
);

NavigationMenuItem.defaultProps = {
	navigationMethod: "push"
}

export default NavigationMenuItem;
