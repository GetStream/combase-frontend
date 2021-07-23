import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { itemGap } from '@combase.app/styles';
import { 
	MessageTimestamp as DefaultMessageTimestamp,
	useComponentContext,
	useTranslationContext 
} from 'stream-chat-react';

import Box from '../Box';
import Text from '../Text';
import TextLink from '../TextLink';

import MessageStatus from './MessageStatus';

export const Root = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;

    & > * + * {
        ${itemGap};
    }
`;

const MessageMeta = ({ className, date, errorStatusCode, onRetry, name, ours, status, type }) => {
	const { t } = useTranslationContext();

	const {
		MessageTimestamp = DefaultMessageTimestamp,
	} = useComponentContext();

    return (
        <Root className={className} gapLeft={2}>
            <Text as="span" fontWeight="600" fontSize="15px" lineHeight={5}>
                {name}
            </Text>
            {date ? <MessageTimestamp fontSize={2} lineHeight={2} marginLeft={1} /> : null}
			{status === 'failed' ? (
              <TextLink color="error">
                {errorStatusCode !== 403
                  ? t('Message Failed · Click to try again')
                  : t('Message Failed · Unauthorized')}
              </TextLink>
            ) : null}
			<MessageStatus />
        </Root>
    );
};

export default MessageMeta;