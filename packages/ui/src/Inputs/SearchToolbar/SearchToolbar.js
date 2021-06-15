import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { system } from '@combase.app/styles';
import { connectSearchBox } from 'react-instantsearch-dom';

import Box from '../../Box';

import InputBase from '../shared/InputBase';
import { useInput } from '../shared/useInput';
import { CloseIcon, SearchIcon } from '../../icons';
import IconButton from '../../IconButton';

const Root = styled(Box)`
    position: relative;
    display: grid;
    grid-template-columns: min-content 1fr min-content;
	grid-auto-rows: 1fr;
    overflow: hidden;
    font-family: ${({ theme }) => theme.fonts.text};
    font-variation-settings: 'wght' 500;
    transition: 0.2s background cubic-bezier(0.4, 0, 0.2, 1);
    background-color: ${({ $error, theme }) =>
        theme.utils.colors.fade(theme.colors[$error ? 'error' : 'text'], theme.name === 'dark' ? 0.08 : 0.04)};
    & > input::placeholder {
        font-family: ${({ theme }) => theme.fonts.text};
        font-variation-settings: 'wght' 500;
        color: ${({ theme }) => theme.colors.altText};
    }
    &:hover {
        background-color: ${({ $error, theme }) =>
            theme.utils.colors.fade(theme.colors[$error ? 'error' : 'text'], theme.name === 'dark' ? 0.12 : 0.08)};
    }
`;

const Icon = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    ${system({
        width: {
            property: 'width',
            scale: 'space',
        },
    })}
`;

export const SearchToolbar = forwardRef(
    (
        {
            as: InputComponent = InputBase,
            children,
            className,
            error,
            inputRef,
            name,
            onBlur,
            onChange,
			onClear,
            onFocus,
            onKeyDown,
            placeholder,
            touched,
            value,
            ...rest
        },
        ref
    ) => {
        const [inputProps, { hasValue }] = useInput({
            name,
            onBlur,
            onChange,
            onFocus,
            onKeyDown,
            value,
        });

        return (
            <Box className={className} paddingBottom={2} ref={ref}>
                <Root borderRadius={1}>
                    <Icon width={8}>
                        <SearchIcon color="altText" size={4} />
                    </Icon>
                    <InputComponent
                        {...inputProps}
                        {...rest}
                        ref={inputRef}
						paddingRight={0}
                        $hasValue={hasValue}
                        minHeight={8}
                        placeholder="Search"
                    />
					<Icon width={8}>
                        {inputProps.value ? <IconButton icon={CloseIcon} color="error" onClick={onClear} size={4} /> : null}
                    </Icon>
                </Root>
            </Box>
        );
    }
);

SearchToolbar.propTypes = {
    error: PropTypes.string,
    focusedPlaceholder: PropTypes.string,
    helper: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onEnter: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.any,
};

SearchToolbar.defaultProps = {
    focusedPlaceholder: '',
    type: 'text',
};

export const AlgoliaSearchToolbar = connectSearchBox(({ currentRefinement, refine }) => {
	return <SearchToolbar onChange={e => refine(e.target.value)} onClear={() => refine('')} value={currentRefinement} />
});
