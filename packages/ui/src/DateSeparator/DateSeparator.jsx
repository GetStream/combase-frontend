import React from 'react';
import styled from 'styled-components';
import { isDayOrMoment, useTranslationContext } from 'stream-chat-react';

import Box from '../Box';
import Text from '../Text';

const Root = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	user-select: none;
`;

const Chip = styled(Box)`
	border: 1px solid ${({ theme, unread }) => theme.colors[unread ? 'red' : 'border']};
`;

const DateSeparator = (props) => {
	const { date, formatDate, unread } = props;

	const { t, tDateTimeParser } = useTranslationContext();

	if (typeof date === 'string') return null;

	const parsedDate = tDateTimeParser(date.toISOString());

	const formattedDate = formatDate
		? formatDate(date)
		: isDayOrMoment(parsedDate)
		? parsedDate.calendar()
		: parsedDate;

	return (
		<Root paddingY={3}>
			<Chip backgroundColor={unread ? "red" : "surface"} unread={unread} boxShadow={0} borderRadius={12} paddingY={2} paddingX={4}>
				<Text color={unread ? 'white' : 'text'} fontSize={2} fontWeight={unread ? "700" : "500"} lineHeight={3}>{unread ? `NEW • ${formattedDate}` : formattedDate}</Text>
			</Chip>
		</Root>
	);
};

export default DateSeparator;