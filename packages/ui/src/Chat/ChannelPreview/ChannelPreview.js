import { useMemo } from 'react';
import styled from 'styled-components';
import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { Avatar } from '../../Avatar';
import { Box } from '../../Layout';
import { IconLabel } from '../../IconLabel';
import { ListItem } from '../../Lists/ListItem';
import { Badge } from '../../Feedback';
import { Placeholder } from '../../Placeholder';
import { Text, TextGroup } from '../../Text';

import ChannelPreviewToggles from './ChannelPreviewToggles';

const Root = styled(ListItem)``;

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: ${({ $compact }) => ($compact ? 'center' : 'flex-start')};
    user-select: none;
    cursor: pointer;
`;

const Content = styled.div`
    flex: 1;
    margin-left: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Header = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${TextGroup} {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const Toggles = styled(ChannelPreviewToggles)`
    position: absolute;
    top: 0;
    right: 0;

    ${Root}:hover & > button:not(.active) {
        display: block;
    }
`;

const Preview = styled(Text)`
    opacity: ${({ $unread }) => ($unread ? 1 : 0.5)};
    font-variation-settings: 'wght' 400;
`;

export const ChannelPreview = ({
    active,
    className,
    compact,
    isSelected,
    message,
    onClick,
    onSelect,
    partnerAvatar,
    partnerName,
    selectable,
    selected,
    toggles,
    unread,
    updatedAt,
    value,
    ...rest
}) => {
    const fromNow = useMemo(
        () => (updatedAt ? `${formatDistanceToNow(typeof updatedAt === 'string' ? parseISO(updatedAt) : updatedAt)} ago` : null),
        [updatedAt]
    );
    return (
        <Root active={active} isSelected={isSelected} selectable={selectable} value={value} onSelect={onSelect} {...rest}>
            <Wrapper $compact={compact} borderRadius={2} className={className} onClick={onClick}>
                <Avatar name={partnerName} size={8} src={partnerAvatar} />
                <Content>
                    <Header>
                        <TextGroup paddingY="small" gapTop={1} minHeight={7}>
                            <Text as={partnerName ? 'p' : Placeholder} fontSize={4} lineHeight={4} placeholderWidth={10}>
                                {partnerName}
                            </Text>
                            <IconLabel>
                                {unread ? <Badge color={(compact && !message) || (!compact && !fromNow) ? 'border' : undefined} /> : null}
                                <Text
                                    as={(compact && !message) || (!compact && !fromNow) ? Placeholder : null}
                                    fontSize={compact ? 3 : 2}
                                    lineHeight={compact ? 3 : 4}
                                    opacity={0.64}
                                    variant={compact ? 'clamped' : 0}
                                >
                                    {compact ? message : fromNow}
                                </Text>
                            </IconLabel>
                        </TextGroup>
                        {toggles?.length ? <Toggles>{toggles}</Toggles> : null}
                    </Header>
                    {!compact ? (
                        <Preview marginTop={1} placeholderWidth={11} as={!message ? Placeholder : undefined} variant="clamped" lineClamp={3}>
                            {message}
                        </Preview>
                    ) : null}
                </Content>
            </Wrapper>
        </Root>
    );
};
