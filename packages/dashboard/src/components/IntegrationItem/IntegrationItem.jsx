import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { interactions } from '@combase.app/styles';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import Chip from '@combase.app/ui/Chip';
import { BadgeIcon } from '@combase.app/ui/icons';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';
import TextLink from '@combase.app/ui/TextLink';

const Root = styled(Box)`
	border: 1px solid ${({ theme }) => theme.colors.border};
	user-select: none;
	cursor: pointer;
	${interactions};
`;

const Header = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const EnabledChip= styled(Chip)`
	position: absolute;
	top: ${({ theme }) => theme.space[5]};
	right: ${({ theme }) => theme.space[5]};
`;

const badgeIconProps = { color: 'green' };

const IntegrationItem = ({ enabled,	id, description, name }) => {
	return (
		<Root as={Link} backgroundColor="surface" to={`/integrations/${id}`} borderRadius={3} paddingX={7} paddingY={8} interaction="bump">
			<Header>
				<Avatar name={name} variant="circle" size={13} />
			</Header>
			{
				enabled ? (
					<EnabledChip 
						color="green"
						icon={BadgeIcon} 
						label="Enabled"
						iconProps={badgeIconProps}
						reverse
						variant="ghost"
					/>
				) : null
			}
			<TextGroup gapTop={2} marginTop={6}>
				<Text fontSize={5} lineHeight={5} fontWeight={600}>{name}</Text>
				<Text fontSize={4} lineHeight={6} fontWeight={400} opacity={0.56}>{description}</Text>
			</TextGroup>
			<TextLink marginTop={4} color="altText" fontSize={4} lineHeight={6} fontWeight={400}>Click to configure</TextLink>
		</Root>
	);
}

export default IntegrationItem;