import React, { forwardRef, cloneElement, useCallback, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../Buttons';
import { StateDisplay } from '../../Feedback';
import { Text } from '../../Text';
import { CheckboxCheckedIcon, CheckboxIcon, DropdownIcon } from '../../icons';
import { Popover, Dropdown } from '../../Popovers';

import { useInput, InputBase } from '../shared';

export const SelectButton = forwardRef(
    ({ children, multi, name, label: labelProp, maxHeight, onBlur, onChange, onFocus, subheading, value, ...props }, ref) => {
        const [anchorRef, setAnchorRef] = useState();
        const inputRef = useRef();
        const [inputProps] = useInput({
            name,
            onBlur,
            onChange,
            onFocus,
            value,
        });

        const handleSelectOption = newValue => {
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
                setAnchorRef(null);
                inputRef.current.change(newValue);
            }
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

        const label = useMemo(() => {
            if (inputProps.value) {
                return children?.find(({ props }) => props.value === inputProps.value)?.props.label;
            }

            return labelProp || '';
        }, [inputProps, labelProp]);

        return (
            <>
                <InputBase type="hidden" ref={inputRef} {...inputProps} />
                <Button {...props} onClick={(v, e) => setAnchorRef(e.nativeEvent.target)} reverseLabel>
                    <DropdownIcon />
                    <Text>{label}</Text>
                </Button>
                <Popover
                    anchor={anchorRef}
                    as={Dropdown}
                    onClose={() => setAnchorRef(null)}
                    maxHeight={maxHeight}
                    placement="bottom-start"
                    subheading={subheading}
                >
                    {children?.length ? children.map(renderChild) : <StateDisplay />}
                </Popover>
            </>
        );
    }
);

SelectButton.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(['xs', 'sm']),
    type: PropTypes.oneOf(['button']),
};

SelectButton.defaultProps = {
    color: 'primary',
    type: 'button',
    variant: 'flat',
    size: 'sm',
};
