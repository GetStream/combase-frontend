import React from 'react';

import { WarningIcon } from '../icons';
import Text from '../Text';
import Tooltip from '../Tooltip';

import Label from '.';

export const Default = () => (
    <>
		<Label color="red">
			<Text variant="label">{'Important'}</Text>
		</Label>
		<Label color="red" variant="border">
			<Text variant="label">{'Important'}</Text>
		</Label>
		<Label color="red" variant="ghost">
			<Text variant="label">{'Important'}</Text>
		</Label>
	</>
);
export const IconLabel = () => (
    <Tooltip text="Something went wrong!">
		<Label color="warning">
			<WarningIcon match="fontSizes" size={1} color="white" />
			<Text variant="label">{'Warning'}</Text>
		</Label>
	</Tooltip>
);

export default {
    component: Label,
    title: 'shared/Label',
};
