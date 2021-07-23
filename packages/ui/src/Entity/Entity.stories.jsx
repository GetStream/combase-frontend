import React from 'react';

import Avatar from '../Avatar';
import Entity from './Entity';
import Text from '../Text';

export const Default = () => (
	<Entity icon={<Avatar name="title" />}>
		<Text fontSize={4} lineHeight={4}>
			Title
		</Text>
		<Text fontSize={2} lineHeight={2} opacity={.56}>
			Subtitle
		</Text>
	</Entity>
);

export default {
    component: Entity,
    title: 'Lists/Entity',
};
