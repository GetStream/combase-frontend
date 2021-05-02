import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useList, useToggle } from 'react-use';
import useFuse from 'react-use-fuse';

import { Avatar } from '../../Avatar';
import { IconButton } from '../../Buttons';
import { Chip } from '../../Chip';
import { Badge, StateDisplay } from '../../Feedback';
import { IconLabel } from '../../IconLabel';
import { useListCursor } from '../../hooks';
import { Popover, Dropdown } from '../../Popovers';
import { Entity, ListItem, MenuItem } from '../../Lists';
import { CloseCircleIcon, DropdownIcon, TagIcon } from '../../icons';

import { ChipInputBase, InputBase, transformToTag } from '../shared';
import { TextInput } from '.';

export const Default = () => <TextInput label="First Name" />;
export const Base = () => <InputBase placeholder="Type something..." />;
export const ChipBase = () => {
    const [value, setValue] = useState(initialChips);

    const handleChange = ({ target }) => {
        return setValue(target.value);
    };

    return <ChipInputBase transformValue={transformToTag} onChange={handleChange} placeholder="+ Add Tags" value={value} />;
};
export const WithError = () => <TextInput error="This is required." touched label="First Name" />;

const initialChips = ['Important'];

const renderChip = (label, actions, i, cursor) => (
    <Chip
        action={CloseCircleIcon}
        color="yellow"
        icon={TagIcon}
        key={label}
        label={label}
        marginBottom={1}
        marginRight={1}
        marginTop={1}
        onActionClick={actions.removeAt}
        selected={i === cursor}
        value={i}
    />
);

export const TagInputExample = () => {
    const [value, setValue] = useState(initialChips);

    const handleChange = ({ target }) => {
        return setValue(target.value);
    };

    return (
        <TextInput
            as={ChipInputBase}
            transformValue={transformToTag}
            focusedPlaceholder="Add a tag"
            helper="Tag conversations so you can find them later."
            placeholder="+ Add Tags"
            forceFocus={value?.length}
            onChange={handleChange}
            required
            renderChip={renderChip}
            value={value}
        />
    );
};

const dropdownModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 8],
        },
    },
    {
        name: 'matchWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => {
            // eslint-disable-next-line no-param-reassign
            state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect: ({ state }) => {
            // eslint-disable-next-line no-param-reassign
            state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
        },
    },
];

const languages = [
    {
        name: 'React',
    },
    {
        name: 'React Native',
    },
    {
        name: 'Node',
    },
    {
        name: 'Kotlin',
    },
    {
        name: 'Dart',
    },
    {
        name: 'Swift',
    },
    {
        name: 'Go',
    },
    {
        name: 'Python',
    },
];

const DropdownButton = styled(IconButton)`
    transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
    transition: 240ms transform ${({ theme }) => theme.easing.move};
`;

export const AutocompleteExample = () => {
    const [anchorRef, setAnchorRef] = useState();
    const [open, toggleDropdown] = useToggle();
    const [value, setValue] = useState('');

    const { reset, result, search } = useFuse({
        data: languages,
        options: {
            keys: ['name'],
        },
    });

    const [cursor, { onKeyDown, onBackspace }] = useListCursor(result, true);

    const handleChange = ({ target }) => {
        if (target.value) {
            search(target.value);
        } else {
            reset();
        }

        setValue(target.value);
    };

    const handleClick = name => {
        toggleDropdown(false);
        setValue(name);
    };

    const handleClose = () => {
        toggleDropdown(false);
    };

    const handleKeyDown = e => {
        onKeyDown(e);

        if (e.key === 'Enter') {
            setValue(languages[cursor].name);
            toggleDropdown(false);
        }
    };

    const handleFocus = () => {
        toggleDropdown(true);
    };
	console.log(open)
    return (
        <>
            <TextInput
                label="Language"
                onBackspace={onBackspace}
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                ref={setAnchorRef}
                value={value}
            >
                <DropdownButton icon={DropdownIcon} onClick={toggleDropdown} open={open} />
            </TextInput>
            <Popover
                anchor={open && anchorRef}
                as={Dropdown}
                modifiers={dropdownModifiers}
                onClose={handleClose}
                placement="bottom"
                subheading="Suggestions"
            >
                {result?.length ? (
                    result.map(({ name }, i) => <MenuItem active={i === cursor} key={i} label={name} onClick={() => handleClick(name)} />)
                ) : (
                    <StateDisplay text="No languages." />
                )}
            </Popover>
        </>
    );
};

export default {
    component: TextInput,
    title: 'inputs/TextInput',
};
