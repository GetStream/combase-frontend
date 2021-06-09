import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { itemGap } from '@combase.app/styles';
import { useTranslationContext } from 'stream-chat-react';

import Box from '../../Box';
import Text from '../../Text';
import { WarningIcon } from '../../icons';

import MessageDate from './MessageDate';
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

    return (
        <Root className={className} gapLeft={2}>
            <Text as="span" fontWeight="600" fontSize="15px" lineHeight={5}>
                {name}
            </Text>
            {date ? <MessageDate fontSize={2} lineHeight={2} marginLeft={1}>{format(date, 'p')}</MessageDate> : null}
			{status === 'failed' ? (
              <button
                className='str-chat__message-team-failed'
                data-testid='message-team-failed'
                onClick={errorStatusCode !== 403 ? onRetry : undefined}
              >
                <WarningIcon />
                {errorStatusCode !== 403
                  ? t('Message Failed · Click to try again')
                  : t('Message Failed · Unauthorized')}
              </button>
            ) : null}
        </Root>
    );
};

export default MessageMeta;