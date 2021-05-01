import React from 'react';

import { Avatar } from '../Avatar';
import { CloseCircleIcon } from '../icons';

import Chip from './Chip';

const iconProps = {
    borderRadius: 'circle',
    name: 'Luke S.',
    src: 'https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512',
};

export const Default = () => (
    <>
        <Chip label="Label" size="sm" />
        <Chip label="Label" style={{ marginLeft: '.5rem' }} />
    </>
);

export const ChipWithAction = () => (
    <Chip action={CloseCircleIcon} color="green" icon={Avatar} iconProps={iconProps} label={iconProps.name} />
);

export const AvatarChip = () => <Chip color="green" icon={Avatar} iconProps={iconProps} label={iconProps.name} />;

export default {
    component: Chip,
    title: 'shared/Chip',
};
