import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useInput } from '../shared/useInput';
import { ToggleBase } from '../shared/ToggleBase';

const getTrackWidth = ({ size }) => size * 1.6666666667;
const getXValue = props => getTrackWidth(props) - props.size;
const getDotPadding = ({ size }) => size * 0.16666666667;
const getDotSize = ({ size }) => size - size * 0.35;

const Handle = styled.div`
    position: absolute;
    left: ${getDotPadding}rem;
    width: ${getDotSize}rem;
    height: ${getDotSize}rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.background};
    transition: transform 240ms ${({ theme }) => theme.easing.move};
    will-change: transform;
`;

const Track = styled.div`
    position: relative;
	cursor: pointer;
    top: 0;
    left: 0;
    width: ${getTrackWidth}rem;
    height: ${({ size }) => size}rem;
    border-radius: 8rem;
    background-color: ${({ checked, theme }) => (checked ? theme.colors.green : theme.utils.colors.fade(theme.colors.text, 0.08))};
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 240ms ${({ theme }) => theme.easing.ping};

    & ${Handle} {
        transform: translate3d(${props => (props.checked ? `${getXValue(props)}rem` : 0)}, 0, 0);
        transform-origin: ${({ checked }) => (checked ? 'right' : 'left')};
    }

    &:hover ${Handle} {
        transform: translate3d(${props => (props.checked ? `${getXValue(props)}rem` : 0)}, 0, 0) scale(1.05);
    }
`;

export const Switch = ({ disabled, inputRef, name, onBlur, onChange, onFocus, size, value }) => {
    const [inputProps] = useInput({
        name,
        onBlur,
        onChange,
        onFocus,
        type: 'toggle',
        value,
    });

	return (
        <ToggleBase {...inputProps} inputRef={inputRef} type="button" disabled={disabled}>
            <Track size={size}>
                <Handle size={size} />
            </Track>
        </ToggleBase>
    );
};

Switch.propTypes = {
    error: PropTypes.string,
    helper: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    size: PropTypes.number,
    value: PropTypes.any,
};

Switch.defaultProps = {
    focusedPlaceholder: '',
    size: 2,
};
