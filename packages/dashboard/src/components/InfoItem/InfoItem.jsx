import React from 'react';

import IconLabel from '@combase.app/ui/IconLabel';
import Placeholder from '@combase.app/ui/Placeholder';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';

const InfoItem = ({ children, icon: Icon, label, value, ...props }) => {
	return (
		<TextGroup {...props}>
			<IconLabel>
				{Icon ? <Icon size={5} /> : null}
				<Text fontSize={4} fontWeight={700} lineHeight={4}>{label}</Text>
			</IconLabel>
			{
				children ?? (
					<Text as={!value ? Placeholder : undefined} opacity={0.56} fontWeight={400} placeholderWidth={14}>
						{value}
					</Text>
				)
			}
		</TextGroup>
	)
}

export default InfoItem;