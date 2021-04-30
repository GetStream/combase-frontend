import { forwardRef } from 'react';
import { Route } from 'react-router-dom';

import { IconButton } from '../../Buttons';

const NavigationIconButton = forwardRef(({ activeColor, color, icon, to, ...rest }, ref) => (
    <Route {...rest}>
        {({ history, match }) => (
            <IconButton color={match ? activeColor : color} ref={ref} icon={icon} size={4} onClick={() => history.push(to)} />
        )}
    </Route>
));

export default NavigationIconButton;
