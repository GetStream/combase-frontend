import React, { createElement } from 'react';
import styled from 'styled-components';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import { BadgeIcon } from '@combase.app/ui/icons';
import IconLabel from '@combase.app/ui/IconLabel';
import Placeholder from '@combase.app/ui/Placeholder';
import TextGroup from '@combase.app/ui/TextGroup';
import Text from '@combase.app/ui/Text';
import Tooltip from '@combase.app/ui/Tooltip';

import useChatUserPresence from 'hooks/useChatUserPresence';

const Root = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const UserBlock = ({ _id, avatar, loading, meta, metaIcon, name, ...rest }) => {
	const isOnline = useChatUserPresence(_id);
	return (
		<Root {...rest}>
			<Avatar 
				borderRadius={5} 
				name={name} 
				size={16} 
				src={avatar}
				variant={null} 
			/>
			<TextGroup 
				paddingY={3} 
				variant="centered"
			>
				<IconLabel>
					<Text 
						as={!name ? Placeholder : undefined} 
						placeholderWidth={14}
						fontSize={5} 
						lineHeight={5} 
						fontWeight={700}
					>
						{name}
					</Text>
					{
						isOnline ? (
							<Tooltip text="Online Now" placement="top">
								<BadgeIcon color="green" size={4} />
							</Tooltip>
						) : null
					}
				</IconLabel>
				<IconLabel>
					{meta && metaIcon ? createElement(metaIcon, { color: 'altText' }) : null}
					<Text 
						as={loading && !meta ? Placeholder : undefined}
						color='altText' 
						fontSize={4} 
						fontWeight={400} 
						lineHeight={4}
						placeholderWidth={12}
					>
						{meta || '-'}
					</Text>
				</IconLabel>
			</TextGroup>
		</Root>
	);
};

export default UserBlock;