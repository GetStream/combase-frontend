/* eslint-disable no-nested-ternary */
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { animated } from 'react-spring';
import { layout } from '@combase.app/styles';

import { useScrollbars } from '../../contexts';
import Avatar from '../../Avatar';
import Container from '../../Container';
import Entity from '../../Entity';
import HeaderBase from '../../HeaderBase';
import IconButton from '../../IconButton';
import Text from '../../Text';
import { ArrowBackIcon } from '../../icons';
import Placeholder from '../../Placeholder';

import { PartnerStatus } from '../PartnerStatus';

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

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ActionGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * + * {
        margin-left: 1rem;
    }
`;

const Main = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Separator = styled.div`
    height: 1.5rem;
    width: 1px;
    margin: 0px 1rem;
    background-color: ${({ theme }) => theme.colors.border};
`;

const BackBtn = styled(IconButton)`
    margin-right: 1rem;
`;

export const ChannelHeader = ({ children, lastActive, onBackClick, showBackBtn, toggles, user }) => {
    const theme = useTheme();
    const scrollbars = useScrollbars();

    const style = useMemo(
        () =>
            Boolean(scrollbars?.anim) && animated
                ? {
                      height: scrollbars?.anim.value.to({
                          output: [theme.sizes[12], theme.sizes[11]],
                          range: [0, scrollbars?.threshold],
                          extrapolate: 'clamp',
                      }),
                  }
                : null,
        [animated, scrollbars, theme]
    );

    return (
        <Root maxWidth={18} minHeight={11}>
            <Wrapper maxWidth={18} style={style}>
                <Main>
                    {showBackBtn ? <BackBtn size={4} icon={ArrowBackIcon} onClick={onBackClick} /> : null}
                    <Entity icon={<Avatar name={user?.name} size={7} src={user?.avatar} />}>
                        <Text as={!user?.name ? Placeholder : undefined}>{user?.name}</Text>
                        <PartnerStatus lastActive={lastActive} user={user} />
                    </Entity>
                </Main>
                <Actions>
                    {children && !showBackBtn ? (
                        <>
                            <ActionGroup>{children}</ActionGroup>
                            {toggles?.length ? <Separator /> : null}
                        </>
                    ) : null}
                    {toggles?.length ? <ActionGroup>{toggles}</ActionGroup> : null}
                </Actions>
            </Wrapper>
        </Root>
    );
};

ChannelHeader.propTypes = {
    isTyping: PropTypes.bool,
    lastActive: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    onBackClick: PropTypes.func,
    showBackBtn: PropTypes.bool,
    toggles: PropTypes.arrayOf([PropTypes.element, PropTypes.node]),
    user: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string,
    }),
};
/* eslint-enable no-nested-ternary */
