import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { animated } from 'react-spring';
import { useChannelManager, useChannelMembers, useChannelPartner } from '@combase.app/chat';
import { layout } from '@combase.app/styles';

import Avatar from '../../Avatar';
import Container from '../../Container';
import HeaderBase from '../../HeaderBase';
import { ArrowBackIcon } from '../../icons';
import { IconButton } from '../../Buttons';
import { Placeholder } from '../../Placeholder';
import { Text, TextGroup } from '../../Text';

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
    const channelManager = useChannelManager();
    const members = useChannelMembers();
    const partner = useChannelPartner(members);
    const user = channelManager?.members?.[partner?.user?.id];

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

    return (
        <Root maxWidth={19} minHeight={9}>
            <Wrapper maxWidth={19} style={style}>
                <IconButton icon={ArrowBackIcon} onClick={onBackClick} size={5} />
                <TextGroup variant="centered">
                    <Name as={!user?.name ? Placeholder : 'p'}>{user?.name}</Name>
                    <PartnerStatus user={user} />
                </TextGroup>
                <Avatar name={user?.name} size={6} src={user?.image} />
            </Wrapper>
        </Root>
    );
};
