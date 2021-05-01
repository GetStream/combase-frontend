import React from 'react';
import { Route } from 'react-router-dom';

import { ChevronRightIcon } from '../../icons';

import { MenuItem } from '../MenuItem';

const defaultActions = [<ChevronRightIcon color="altText" size={[3, 3, 3, 3, 4]} key={0} />];

const NavigationMenuItem = ({ actions = defaultActions, iconColor, color, icon, label, onClick, to, ...rest }) => (
    <Route path={to} {...rest}>
        {({ history, match }) => (
            <MenuItem
                iconColor={iconColor || color}
                actions={!match ? actions : []}
                active={Boolean(match)}
                icon={icon}
                label={label}
                onClick={() => {
                    if (!match) {
                        history.push(to);
                    }
                    if (onClick) {
                        onClick();
                    }
                }}
            />
        )}
    </Route>
);

export default NavigationMenuItem;
