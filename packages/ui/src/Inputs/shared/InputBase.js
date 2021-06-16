import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { layout, space, typography } from '@combase.app/styles';

const Input = styled.input`
    border: 0;
    outline: 0;
    padding: 0;
    ${layout};
    ${space};
    ${typography};
    background-color: transparent;
    padding-right: ${({ $trailingIcon }) => ($trailingIcon ? 2.5 : 0.75)}rem;
    color: ${({ theme }) => theme.colors.text};
    ${({ disabled, showDisabled }) =>
        disabled && showDisabled
            ? `
	opacity: .4;
	cursor: not-allowed;
	`
            : ``}

    &[type='time']::-webkit-calendar-picker-indicator {
        background: none;
    }
`;
export const InputBase = forwardRef(
    ({ children, id, name, onBlur, onChange, onClick, onFocus, placeholder, textarea, type, value, ...rest }, ref) => {
		useImperativeHandle(ref, () => ({
			change: (value) => {
				onChange({
					target: {
						name,
						value,
					}
				})
			}
		}))
        return (
            <Input
                as={textarea ? 'textarea' : undefined}
                color="text"
                fontFamily="text"
                fontSize={3}
                name={name}
                minHeight={10}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                placeholder={placeholder}
                ref={ref}
                type={type}
                value={value}
                {...rest}
            />
        );
    }
);

InputBase.defaultProps = {
    disabled: false,
    showDisabled: true,
	width: '100%',
};

export default InputBase;
