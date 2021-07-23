import React, { useMemo } from 'react';
import styled from 'styled-components';
import { 
	defaultTimestampFormat,
	isDate,
  	isDayOrMoment,
  	isNumberOrString,
	useMessageContext, 
	useTranslationContext 
} from 'stream-chat-react';

import Text from '../Text';

function getDateString(
	messageCreatedAt,
	formatDate,
	calendar,
	tDateTimeParser,
	format
) {
	if (!messageCreatedAt || !Date.parse(messageCreatedAt)) {
	  return null;
	}
  
	if (typeof formatDate === 'function') {
	  return formatDate(new Date(messageCreatedAt));
	}
  
	if (!tDateTimeParser) {
	  return null;
	}
  
	const parsedTime = tDateTimeParser(messageCreatedAt);
  
	if (isDayOrMoment(parsedTime)) {
	  /**
	   * parsedTime.calendar is guaranteed on the type but is only
	   * available when a user calls dayjs.extend(calendar)
	   */
	  return calendar && parsedTime.calendar ? parsedTime.calendar() : parsedTime.format(format);
	}
  
	if (isDate(parsedTime)) {
	  return parsedTime.toDateString();
	}
  
	if (isNumberOrString(parsedTime)) {
	  return parsedTime;
	}
  
	return null;
  }

const Root = ({ calendar, className, format = defaultTimestampFormat, fontSize, lineHeight }) => {
	
	const { formatDate, message } = useMessageContext();
  	const { tDateTimeParser } = useTranslationContext();

	const createdAt = message?.created_at || '';

	const when = useMemo(
		() => getDateString(createdAt, formatDate, calendar, tDateTimeParser, format),
		[formatDate, calendar, tDateTimeParser, format, createdAt],
	);
	
	if (!when) return null;
	  
	return (
		<Text className={className} fontSize={2} lineHeight={2}>
			{when}
		</Text>
	);
};

const MessageDate = styled(Root)`
    opacity: 0.5;
	text-transform: lowercase;
`;

export default MessageDate;