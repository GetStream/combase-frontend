import React from 'react';
import styled from 'styled-components';
import { Link, Route } from 'react-router-dom';

import Box from '@combase.app/ui/Box';
import { BadgeIcon } from '@combase.app/ui/icons';
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

	& svg {
		flex-shrink: 0;
	}
`;

const Badge = styled(BadgeIcon)`
	stroke: ${({ theme }) => theme.colors.surface};
	stroke-width: 0.25rem;
	position: absolute;
	bottom: -0.125rem;
	right: -0.25rem;
`;

const SidenavItem = ({
	badge,
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
					<Box>
						<RouteIcon color={match ? 'primary' : 'altText'} fillAlpha={match ? 1 : 0.56} size={5} />
						{badge ? <Badge color="red" size={4} /> : null}
					</Box>
					<Text color={match ? 'primary' : 'text'} fontSize="10px" fontWeight="600" lineHeight={2} marginTop={1}>{label}</Text>
				</Root>
			)}
		</Route>
	);
};

export default SidenavItem;