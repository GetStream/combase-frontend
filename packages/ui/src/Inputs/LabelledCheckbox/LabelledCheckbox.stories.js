import React from 'react';

import { Text } from '../../Text';

import LabelledCheckbox from './LabelledCheckbox';

export const Default = () => <LabelledCheckbox title="Two Factor Authentication" />;
export const WithDescription = () => <LabelledCheckbox title="Two Factor Authentication">
	<Text color="altText">Globally enforce 2FA for all Agent Users in your organization.</Text>
</LabelledCheckbox>;

export default {
    component: LabelledCheckbox,
    title: 'inputs/LabelledCheckbox',
};
