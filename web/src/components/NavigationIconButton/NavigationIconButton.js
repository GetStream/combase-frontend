import { forwardRef } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { ButtonBase } from '@combase.app/ui';
import { interactions } from '@combase.app/styles';

const RouteButton = styled(ButtonBase)`
	${interactions};
`;

const NavigationIconButton = forwardRef(({ activeColor, color, icon: Icon, to, ...rest }, ref) => (
    <Route {...rest}>
        {({ history, match }) => (
			<RouteButton interaction="highlight" width="100%" minHeight={10} color={match ? activeColor : color} onClick={() => history.push(to)} ref={ref}>
				<Icon color={match ? activeColor : color} size={5} />
			</RouteButton>
        )}
    </Route>
));

export default NavigationIconButton;
