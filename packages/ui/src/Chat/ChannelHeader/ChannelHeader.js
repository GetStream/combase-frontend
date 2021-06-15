/* eslint-disable no-nested-ternary */
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { animated } from 'react-spring';
import { layout } from '@combase.app/styles';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';

import { useScrollbars } from '../../contexts';
import Avatar from '../../Avatar';
import Container from '../../Container';
import Entity from '../../Entity';
import HeaderBase from '../../HeaderBase';
import IconButton from '../../IconButton';
import Text from '../../Text';
import { ArrowBackIcon } from '../../icons';
import Placeholder from '../../Placeholder';
import TextGroup from '../../TextGroup';

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

const PartnerDetails = styled(TextGroup)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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

export const ChannelHeader = ({ children, isMobile = true, lastActive, onBackClick, onTitleClick, showBackBtn, toggles, user }) => {
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
	
	const { client } = useChatContext();
	const { members } = useChannelStateContext();
	const [partner] = useMemo(() => Object.values(members).filter(({ user_id }) => user_id !== client.userID), [client, members]);

    return (
        <Root maxWidth={22} minHeight={11}>
            <Wrapper maxWidth={22} style={style}>
                <Main>
                    {showBackBtn ? <BackBtn size={4} icon={ArrowBackIcon} onClick={onBackClick} /> : null}
                    {!isMobile ? (
						<Entity>
							<Text as={!partner?.user?.name ? Placeholder : undefined} fontSize={4} lineHeight={6} fontWeight="600" placeholderWidth={11}>{partner?.user?.name}</Text>
							<PartnerStatus lastActive={lastActive} user={user} />
						</Entity>
					) : null}
                </Main>
				{
					isMobile ? (
						<PartnerDetails variant="centered" onClick={onTitleClick}>
							<Text as={!partner?.user?.name ? Placeholder : undefined} fontSize={4} lineHeight={5} fontWeight="600" placeholderWidth={11}>{partner?.user?.name}</Text>
							<PartnerStatus lastActive={lastActive} showBadge={false} user={user} />
						</PartnerDetails>
					) : null
				}
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
