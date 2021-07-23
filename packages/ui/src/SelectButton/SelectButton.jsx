import React, { forwardRef, cloneElement, useCallback, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import StateDisplay from '../StateDisplay';
import IconLabel from '../IconLabel';
import Text from '../Text';
import { CheckboxCheckedIcon, CheckboxIcon, DropdownIcon } from '../icons';
import Popover, { usePopoverState } from '../Popover';
import Dropdown from '../Dropdown';

import {useInput} from '../shared/useInput';
import {InputBase} from '../shared/InputBase';

const SelectButton = forwardRef(
    ({ children, multi, name, label: labelProp, maxHeight, onBlur, onChange, onFocus, subheading, value, ...props }, ref) => {
		const [anchorRef, { open, toggle }] = usePopoverState();

        const inputRef = useRef();
        const [inputProps] = useInput({
            name,
            onBlur,
            onChange,
            onFocus,
            value,
        });

        const handleSelectOption = ({ target: { value: newValue }}) => {
            if (multi) {
				const idx = value.findIndex(existing => existing === newValue);
				console.log(newValue, idx);
                if (idx === -1) {
                    inputProps.onChange({
						target: {
							name,
							value: [...value, newValue]
						}
					});
                } else {
                    const remove = [...value];
                    remove.splice(idx, 1);
                    inputProps.onChange({
						target: {
							name,
							value: remove
						}
					});
                }
            } else {
                inputProps.onChange({
					target: {
						name,
						value: newValue
					}
				});
                toggle(false);
            }
        };

        const renderChild = useCallback(
            child => {
                const active = multi ? value.includes(child.props.value) : value === child.props.value;

                const icon = active ? CheckboxCheckedIcon : CheckboxIcon;
                const iconColor = active ? 'primary' : 'border';
                const color = 'text';
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
			const { value } = inputProps; 
            if (!Array.isArray(value) && !!value) {
                return children?.find(({ props }) => props.value === inputProps.value)?.props.label;
            } else if (Array.isArray(value)) {
				const labels = children?.filter(({ props }) => inputProps.value.includes(props.value));
				if (labels?.length > 1) {
					return labels.map(({ props }) => props.label).join(', ');
				} else if (labels?.length === 1) {
					return labels[0].props.label;
				}
			}

            return labelProp || '';
        }, [inputProps, labelProp]);

        return (
            <>
                <InputBase type="hidden" ref={inputRef} {...inputProps} />
                <Button {...props} backgroundColor="border" color="text" ref={anchorRef} onClick={toggle}>
                    <IconLabel>
						<Text>{label}</Text>
						<DropdownIcon />
					</IconLabel>
                </Button>
                <Popover
                    anchor={anchorRef.current}
                    as={Dropdown}
                    onClose={() => toggle(false)}
					open={open}
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

export default SelectButton;