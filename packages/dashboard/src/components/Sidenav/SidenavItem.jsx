import React from 'react';
import styled from 'styled-components';
import { Link, Route } from 'react-router-dom';

import Box from '@combase.app/ui/Box';
import Icon from '@combase.app/ui/Icon';
import Text from '@combase.app/ui/Text';

const Root = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-decoration: none;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 4px;
		background-color: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
		border-top-right-radius: ${({theme}) => theme.radii[2]};
		border-bottom-right-radius: ${({theme}) => theme.radii[2]};
		pointer-events: none;
	}
`;

const SidenavItem = ({
	exact,
	icon: RouteIcon,
	label,
	path,
	to,
}) => {
	return (
		<Route path={path || to} exact={exact}>
			{({ match }) => (
				<Root as={Link} active={match} marginY={3} height={10} to={to}>
					<RouteIcon color={match ? 'primary' : 'altText'} fillAlpha={match ? 1 : 0.56} size={5} />
					<Text color={match ? 'primary' : 'text'} fontSize="10px" fontWeight="600" lineHeight={2} marginTop={1}>{label}</Text>
				</Root>
			)}
		</Route>
	);
};

export default SidenavItem;