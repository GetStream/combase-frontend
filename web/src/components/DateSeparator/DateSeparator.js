import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, Text } from '@combase.app/ui';
import { formatDateFull } from 'utils';

const Root = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const Chip = styled(Box)`
	border: 1px solid ${({ theme }) => theme.colors.border};
`;

const DateSeparator = (props) => {
	const date = useMemo(() => formatDateFull(props.date), [props.date]);
	
	return (
		<Root paddingY={3}>
			<Chip backgroundColor="surface" boxShadow={0} borderRadius={12} paddingY={2} paddingX={4}>
				<Text fontSize={2} lineHeight={3}>{date}</Text>
			</Chip>
		</Root>
	);
};

export default DateSeparator;