import React from 'react';
import styled from 'styled-components';

import Box from '../Box';
import Text, { Heading } from '../Text';
import TextGroup from '../TextGroup';

const Root = styled(Box)`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: ${({ theme }) => theme.space[3]};

	@media (min-width: ${({ theme }) => theme.breakpoints.sm}) {	
		grid-template-columns: ${({ theme }) => theme.sizes[16]} 1fr;
		grid-gap: ${({ theme }) => theme.sizes[14]};
	} 
`;

const TitleBlock = styled(Box)``;
const Content = styled(Box)``;

const ListDetailSection = ({ children, description, title }) => (
	<Root paddingY={6}>
		<TitleBlock>
			<TextGroup gapTop={2}>
				<Heading fontSize={4} lineHeight={6}>
					{title}
				</Heading>
				<Text fontSize={[2, 2, 3]} lineHeight={[5, 5, 6]} color="altText">
					{description}
				</Text>
			</TextGroup>
		</TitleBlock>
		<Content paddingY={2}>
			{children}
		</Content>
	</Root>
);

export default ListDetailSection