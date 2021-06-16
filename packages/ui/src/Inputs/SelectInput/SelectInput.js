import React, { cloneElement, useCallback, useState, useRef } from 'react';
import { useToggle } from 'react-use';

import Chip from '../../Chip';
import Popover from '../../Popover';
import Dropdown from '../../Dropdown';
import { CheckboxCheckedIcon, CheckboxIcon, CloseCircleIcon, TagIcon } from '../../icons';
import StateDisplay from '../../StateDisplay';

import { ChipInputBase } from '../shared';
import { TextInput } from '../TextInput';

const popperModifiers = [
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

const SelectInput = ({ children, multi, value, ...props }) => {
    const [anchorRef, setAnchorRef] = useState();
    const inputRef = useRef();
    const [open, toggleDropdown] = useToggle();

    const handleSelectOption = ({target: { value: newValue }}) => {
        if (multi) {
            const idx = value.findIndex(existing => existing === newValue);

            if (idx === -1) {
                inputRef.current.change([...value, newValue]);
            } else {
                const remove = [...value];
                remove.splice(idx, 1);
                inputRef.current.change(remove);
            }
        } else {
            toggleDropdown(false);
            inputRef.current.change(newValue);
        }
    };

    const handleClose = () => {
        toggleDropdown(false);
    };

    const handleFocus = () => {
        toggleDropdown(true);
    };

    const renderChild = useCallback(
        child => {
            const active = multi ? value.includes(child.props.value) : value === child.props.value;

            const icon = active ? CheckboxCheckedIcon : CheckboxIcon;
            const iconColor = active ? 'primary' : 'border';
            const color = active ? 'text' : 'textA.56';
            const onClick = handleSelectOption;

            const props = multi
                ? {
                      active,
                      color,
                      icon,
                      iconColor,
                      onClick,
                  }
                : {
                      active,
                      color,
                      onClick,
                  };

            return cloneElement(child, props);
        },
        [handleSelectOption, multi]
    );

    return (
        <>
            <TextInput
                {...props}
                as={multi ? ChipInputBase : undefined}
                disabled
                showDisabled={false}
                onFocus={handleFocus}
                onClick={handleFocus}
                inputRef={inputRef}
                ref={setAnchorRef}
                value={multi ? '' : value}
            >
                {value?.length && multi
                    ? value.map((label, i) => (
                          <Chip
                              action={CloseCircleIcon}
                              backgroundColor="primaryA.12"
                              iconColor="primary"
                              color="primary"
                              key={label}
                              label={label}
                              marginBottom={1}
                              marginRight={1}
                              marginTop={1}
                              onActionClick={e => {
                                  e.stopPropagation();
                                  handleSelectOption(label);
                              }}
                          />
                      ))
                    : null}
            </TextInput>
            <Popover
                anchor={anchorRef}
                as={Dropdown}
                modifiers={popperModifiers}
				open={open}
                onClose={handleClose}
                placement="bottom"
                subheading="Suggestions"
            >
                {children?.length ? children.map(renderChild) : <StateDisplay />}
            </Popover>
        </>
    );
};

export default SelectInput;
