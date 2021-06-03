import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { animated } from 'react-spring';
import { useChatContext, useChannelStateContext } from 'stream-chat-react';
import { layout } from '@combase.app/styles';

import Avatar from '../../Avatar';
import Container from '../../Container';
import HeaderBase from '../../HeaderBase';
import { ArrowBackIcon } from '../../icons';
import IconButton from '../../IconButton';
import Placeholder from '../../Placeholder';
import Text from '../../Text';
import TextGroup from '../../TextGroup';

import { PartnerStatus } from '../PartnerStatus';
import { useScrollbars } from '../../contexts/Scrollbars/useScrollbars';

const Root = styled(HeaderBase)`
    ${layout.minHeight};
`;

const Wrapper = styled(Container).attrs({
    as: animated.div,
})`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Name = styled(Text)`
    font-size: 1rem;
    font-variation-settings: 'wght' 600;
    line-height: 1.25rem;

    &${Placeholder} {
        width: 4rem;
        height: 1rem;
        margin-bottom: 0.25rem;
    }
`;

export const ChannelHeaderSimple = ({ onBackClick }) => {
    const theme = useTheme();
    const scrollbars = useScrollbars();

    const style = useMemo(
        () =>
            Boolean(scrollbars?.anim) && animated
                ? {
                      height: scrollbars?.anim.value.to({
                          output: [theme.sizes[12], theme.sizes[10]],
                          range: [0, scrollbars?.threshold],
                          extrapolate: 'clamp',
                      }),
                  }
                : null,
        [animated, scrollbars, theme]
    );

	const { client } = useChatContext();
	const { members } = useChannelStateContext();
	const [partner] = useMemo(() => Object.values(members).filter(({ user_id }) => user_id !== client.userID), [client, members]);

    return (
        <Root maxWidth={19} minHeight={9}>
            <Wrapper maxWidth={19} style={style}>
                <IconButton icon={ArrowBackIcon} onClick={onBackClick} size={5} />
                <TextGroup variant="centered">
                    <Name as={!partner?.user?.name ? Placeholder : 'p'}>{partner?.user?.name}</Name>
                    <PartnerStatus user={partner?.user} />
                </TextGroup>
                <Avatar name={partner?.user?.name} size={7} src={partner?.user?.image} />
            </Wrapper>
        </Root>
    );
};
