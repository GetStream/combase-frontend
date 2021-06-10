import React from 'react';
import styled from 'styled-components';
import { Container, ListSubheader } from '@combase.app/ui';

const Root = styled(Container)`
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const DrawerWidgetBase = ({ children, infoText, title }) => {
	return (
		<Root paddingBottom={4}>
			<ListSubheader infoText={infoText} paddingY={3}>
				{title}
			</ListSubheader>
			{children}
		</Root>
	);
};

export default DrawerWidgetBase;