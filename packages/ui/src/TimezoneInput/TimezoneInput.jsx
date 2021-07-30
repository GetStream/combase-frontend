import React, { useCallback, useState, useRef } from 'react';
import { useToggle } from 'react-use';
import styled from 'styled-components';
import { getTimeZones } from '@vvo/tzdb';
import useFuse from 'react-use-fuse';

import IconButton from '../IconButton';
import { DropdownIcon } from '../icons';
import Box from '../Box';
import Entity from '../Entity';
import ListItem from '../ListItem';
import Popover from '../Popover';
import Dropdown from '../Dropdown';
import Text from '../Text';
import useListCursor from '../hooks/useListCursor';
import VirtualizedList from '../VirtualizedList';

import TextInput from '../TextInput';

const DropdownButton = styled(IconButton)`
    transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
    transition: 240ms transform ${({ theme }) => theme.easing.move};
`;

const timezones = getTimeZones();

const popperModifiers = [
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

const ItemContainer = props => <Box {...props} paddingX={1} />;

const TimezoneInput = ({ onChange, name, value }) => {
    const anchorRef = useRef();
    const [open, toggleDropdown] = useToggle();
    const [internalValue, setInternalValue] = useState(value || '');

    const { reset, result, search } = useFuse({
        data: timezones,
        options: {
            keys: ['name', 'alternativeName', 'rawFormat'],
        },
    });

    const [cursor, { onKeyDown, onBackspace }] = useListCursor(result, true);

    const handleChange = ({ target }) => {
        if (target.value) {
            console.log(target.value);
            search(target.value);
        } else {
            reset();
        }

        setInternalValue(target.value);
    };

    const handleClickItem = value => {
        toggleDropdown(false);
        setInternalValue(value);
        reset();
		if (onChange) {
			onChange({
				target: {
					name,
					type: 'text',
					value,
				},
			});
		}
    };

    const handleClose = () => {
        toggleDropdown(false);
    };

    const handleKeyDown = e => {
        onKeyDown(e);

        if (e.key === 'Enter') {
            e.preventDefault();
            handleClickItem(result[cursor].name);
        }
    };

    const handleFocus = () => {
        toggleDropdown(true);
    };

    const renderChild = useCallback(
        (i, { abbreviation, name, alternativeName, rawFormat } = {}) => {
            const active = internalValue === name;

            const color = active ? 'text' : 'textA.56';

            return (
                <ListItem active={active} color={color} interaction="highlight" onClick={() => handleClickItem(name)}>
                    <Entity>
                        <Text>{name}</Text>
                        <Text variant="clamped" lineClamp={1} color="textA.56" fontSize={2} lineHeight={2}>
                            {`${abbreviation}${rawFormat}`}
                        </Text>
                    </Entity>
                </ListItem>
            );
        },
        [internalValue]
    );

    return (
        <>
            <TextInput
                label="Timezone"
                onBackspace={onBackspace}
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                ref={anchorRef}
                value={internalValue}
            >
                <DropdownButton 
					icon={DropdownIcon} 
					onClick={toggleDropdown} 
					open={open} 
					type="button" 
				/>
            </TextInput>
            <Popover
                anchor={anchorRef.current}
                as={Dropdown}
                modifiers={popperModifiers}
				open={open}
                onClose={handleClose}
                gutters={false}
                minHeight={16}
                maxHeight={16}
                placement="bottom"
                subheading="Select your timezone"
            >
				<VirtualizedList
					data={result}
					ItemContainer={ItemContainer}
					renderItem={renderChild}
				/>
            </Popover>
        </>
    );
};

export default TimezoneInput;
