import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { WarningIcon } from '../icons';
import Box from '../Box';
import Text from '../Text';

import { Helper } from '../shared/Helper';
import InputBase from '../shared/InputBase';
import { useInput } from '../shared/useInput';

const Root = styled(Box)`
	box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radii[2]};
    transition: 0.12s background cubic-bezier(0.4, 0, 0.2, 1);
    ${'' /* border: 2px solid ${({ color, theme }) => theme.utils.colors.fade(theme.colors[color], 0.05)}; */}
    background-color: ${({ $error, theme }) =>
        theme.utils.colors.fade(theme.colors[$error ? 'error' : 'text'], theme.name === 'dark' ? 0.08 : 0.04)};
    &:hover {
        background-color: ${({ $error, theme }) =>
            theme.utils.colors.fade(theme.colors[$error ? 'error' : 'text'], theme.name === 'dark' ? 0.12 : 0.08)};
    }
`;

const Label = styled(Text)`
	box-sizing: border-box;
    transform-origin: left center;
    position: absolute;
    left: 12px;
    top: 18px;
    font-variation-settings: 'wght' ${({ $active }) => ($active ? '600' : '500')};
    user-select: none;
    pointer-events: none;
    opacity: ${({ $active, $error }) => ($active || $error ? 1 : 0.56)};
    color: ${({ $active, $error, theme }) => theme.colors[$error ? 'error' : $active ? 'primary' : 'text']};
    transform: ${({ $active }) => `translate3d(0, ${$active ? -8 : 0}px, 0) scale(${$active ? 0.75 : 1})`};
	transform-origin: top left;
    transition: 0.12s transform, color cubic-bezier(0.4, 0, 0.2, 1), opacity cubic-bezier(0.4, 0, 0.2, 1);

    ${Root}:focus-within > & {
        opacity: 1;
        color: ${({ $active, $error, theme }) => theme.colors[$error ? 'error' : 'primary']};
        transform: ${({ $active }) => `translate3d(0, -8px, 0) scale(0.75)`};
    }
`;

const TextInput = forwardRef(
    (
        {
            as: InputComponent = InputBase,
			autoComplete,
            children,
            className,
            error,
            focusedPlaceholder,
            forceFocus,
            helper,
            inputRef,
            label,
            name,
            onBlur,
            onChange,
			onClick,
            onFocus,
            onKeyDown,
            placeholder,
            required,
			textarea,
            touched,
            type,
            value,
            ...rest
        },
        ref
    ) => {
        const [inputProps, { focused, hasValue }] = useInput({
            name,
            onBlur,
            onChange,
            onFocus,
            onKeyDown,
            value,
        });

        const hasError = touched && error;

        return (
            <>
                <Root className={className} onClick={onClick} ref={ref}>
                    <InputComponent
                        {...inputProps}
                        {...rest}
						autoComplete={autoComplete}
                        ref={inputRef}
                        $hasValue={hasValue}
                        paddingX={3}
                        placeholder={focused ? placeholder : undefined}
                        paddingTop={textarea ? 6 : label ? 4 : 3}
                        paddingBottom={label ? 2 : 3}
						textarea={textarea}
                        type={type}
                    >
                        {children}
                    </InputComponent>
                    {label ? (
                        <Label $active={hasValue} $error={hasError} fontSize={3}>
                            {label}
                        </Label>
                    ) : undefined}
                </Root>
                {hasError ? <Helper icon={WarningIcon} color="error" text={error} /> : helper ? <Helper text={helper} /> : null}
            </>
        );
    }
);

TextInput.propTypes = {
    error: PropTypes.string,
    focusedPlaceholder: PropTypes.string,
    helper: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.any,
};

TextInput.defaultProps = {
    focusedPlaceholder: '',
    type: 'text',
};

export default TextInput;