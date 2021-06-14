import React from 'react';

import {Switch} from '../Switch';
import LabelledToggle from './LabelledToggle';

export const Default = () => <LabelledToggle label="Two Factor Authentication" />;
export const WithSwitch = () => <LabelledToggle Input={Switch} inputSize={2} label="Notification Sounds" />;

export default {
    component: LabelledToggle,
    title: 'inputs/LabelledToggle',
};
