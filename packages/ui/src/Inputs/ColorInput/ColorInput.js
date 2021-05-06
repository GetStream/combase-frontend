import React, { useState, useRef } from 'react';
import { useToggle } from 'react-use';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputColor from 'react-input-color';

import { TextInput } from '../TextInput';

const ColorPicker = styled(InputColor)`
    border: 0 !important;
    background-color: ${({ theme }) => theme.colors.surface}!important;
    width: ${({ theme }) => theme.sizes[5]} !important;
    height: ${({ theme }) => theme.sizes[5]} !important;

    &,
    & > span {
        border-radius: 50% !important;
    }
`;

const ColorInput = props => {
    const [anchorRef, setAnchorRef] = useState();
    const inputRef = useRef();
    const [open, toggleDropdown] = useToggle();

    const handleClose = () => {
        toggleDropdown(false);
    };

    const handleFocus = () => {
        toggleDropdown(true);
    };

    return (
        <TextInput
            {...props}
            disabled
            showDisabled={false}
            onFocus={handleFocus}
            onClick={handleFocus}
            inputRef={inputRef}
            ref={setAnchorRef}
            forceFocus
        >
            <ColorPicker initialValue={props.value || ''} onChange={({ hex }) => inputRef.current?.change?.(hex)} placement="right" />
        </TextInput>
    );
};

ColorInput.propTypes = {
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

ColorInput.defaultProps = {
    focusedPlaceholder: '',
    type: 'text',
};

export default ColorInput;