import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Badge, Box, IconLabel, Label, ListItem, Placeholder, TextGroup, Text } from '@combase.app/ui';

import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Root = styled(ListItem)``;

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: ${({ $compact }) => ($compact ? 'center' : 'flex-start')};
    user-select: none;
    cursor: pointer;
	text-align: left;
`;

const Content = styled.div`
    flex: 1;
    margin-left: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
	align-items: flex-start;
`;

const Header = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
	align-self: stretch;

    ${TextGroup} {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const Preview = styled(Text)`
    opacity: ${({ $unread }) => ($unread ? 1 : 0.5)};
    font-variation-settings: 'wght' 400;
`;

const CombaseChannelPreview = ({ active, channel, compact, displayImage, displayTitle, lastMessage, latestMessage, setActiveChannel, watchers, unread }) => {
	const buttonRef = useRef();

	const { status } = channel.data;
	const { updated_at } = lastMessage;

	const fromNow = useMemo(
        () => (updated_at ? `${formatDistanceToNow(typeof updated_at === 'string' ? parseISO(updated_at) : updated_at)} ago` : null),
        [updated_at]
    );

	const onSelectChannel = () => {
		if (setActiveChannel) {
		  setActiveChannel(channel, watchers);
		}
		if (buttonRef.current) {
			buttonRef.current.blur();
		}
	};

	return (
		<Root active={active} buttonRef={buttonRef} onClick={onSelectChannel}>
			<Wrapper>
				<Avatar name={displayTitle} size={8} src={displayImage} />
				<Content>
					<Header>
                        <TextGroup paddingY="small" gapTop={1} minHeight={7}>
                            <Text as={displayTitle ? 'p' : Placeholder} fontSize={4} lineHeight={4} placeholderWidth={10}>
                                {displayTitle}
                            </Text>
                            <IconLabel>
                                {unread ? <Badge color={(compact && !latestMessage) || (!compact && !fromNow) ? 'border' : undefined} /> : null}
                                <Text
                                    as={(compact && !latestMessage) || (!compact && !fromNow) ? Placeholder : null}
                                    fontSize={compact ? 3 : 2}
                                    lineHeight={compact ? 3 : 4}
                                    opacity={0.64}
                                    variant={compact ? 'clamped' : 0}
                                >
                                    {compact ? latestMessage : fromNow}
                                </Text>
                            </IconLabel>
                        </TextGroup>
						{/* {toggles?.length ? <Toggles>{toggles}</Toggles> : null} */}
					</Header>
					{!compact ? (
                        <Preview marginTop={1} placeholderWidth={11} as={!latestMessage ? Placeholder : undefined} variant="clamped" lineClamp={1}>
                            {latestMessage}
                        </Preview>
                    ) : null}
					<Box marginTop={2}>
						<Label color={`ticketStatus.${status}`}><Text fontSize={2} lineHeight={2}>{status}</Text></Label>
					</Box>
				</Content>
			</Wrapper>
		</Root>
	);
};

export default CombaseChannelPreview;