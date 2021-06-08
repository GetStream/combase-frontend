import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';
import { formatTime } from '../../utils';

import Avatar from '../../Avatar';
import Badge from '../../Badge';
import Box from '../../Box';
import IconLabel from '../../IconLabel';
import Label from '../../Label';
import ListItem from '../../ListItem';
import Placeholder from '../../Placeholder';
import TextGroup from '../../TextGroup';
import Text from '../../Text';
import TextLink from '../../TextLink';

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
    align-items: flex-start;
	align-self: stretch;
	justify-content: space-between;

    ${TextGroup} {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const ChannelPreview = ({ 
	active, 
	channel, 
	children,
	compact, 
	displayImage, 
	displayTitle, 
	lastMessage, 
	latestMessage, 
	onSelectChannel,
	setActiveChannel, 
	watchers, 
	unread 
}) => {
	const buttonRef = useRef();

	const { status } = channel?.data || {};
	const { updated_at } = lastMessage || {};

	const fromNow = useMemo(
        () => formatTime(updated_at),
        [updated_at]
    );

	const handleSelectChannel = () => {
		if (setActiveChannel) {
		  setActiveChannel(channel, watchers);
		  onSelectChannel?.(channel);
		}
		if (buttonRef.current) {
			buttonRef.current.blur();
		}
	};

	return (
		<Root active={active} buttonRef={buttonRef} onClick={handleSelectChannel}>
			<Wrapper>
				<Avatar name={displayTitle} size={8} src={displayImage} />
				<Content>
					<Header paddingY="small">
						<Text as={displayTitle ? 'p' : Placeholder} fontSize={4} lineHeight={4} placeholderWidth={10}>
							{displayTitle}
						</Text>
						<IconLabel>
							{unread ? <Badge color={(compact && !latestMessage) || (!compact && !fromNow) ? 'border' : undefined} /> : null}
							<Text
								color={unread ? 'primary' : 'altText'}
								as={!fromNow ? Placeholder : null}
								fontSize={compact ? 3 : 2}
								lineHeight={compact ? 3 : 4}
								opacity={unread ? 1 : 0.64}
								variant={compact ? 'clamped' : undefined}
							>
								{fromNow}
							</Text>
						</IconLabel>
					</Header>
					<Text
						marginTop={1}
						as={!latestMessage ? Placeholder : null}
						placeholderWidth={10}
						opacity={unread ? 1 : 0.5}
						variant="clamped"
						fontWeight="400"
					>
						{latestMessage}
					</Text>
					{children}
				</Content>
			</Wrapper>
		</Root>
	);
};

export default ChannelPreview;