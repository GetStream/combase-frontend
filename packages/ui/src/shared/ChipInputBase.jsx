import React, { forwardRef, useImperativeHandle, useMemo, useState, useRef } from 'react';
import { layout } from '@combase.app/styles';
import styled from 'styled-components';
import { useList } from 'react-use';

import Box from '../../Box';
import Chip from '../../Chip';
import { CloseCircleIcon, TagIcon } from '../../icons';
import { useListCursor, useSharedRef } from '../../hooks';

import InputBase from './InputBase';

const Root = styled(Box)`
    ${layout};
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
    align-items: center;
    flex: 1;
`;

const Input = styled(InputBase)`
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1 1 auto;
    width: auto;
	min-width: ${({ theme }) => theme.sizes[6]};
`;

const defaultChip = (label, actions, i, cursor) => (
    <Chip
        action={CloseCircleIcon}
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

export const ChipInputBase = forwardRef(
    ({ children, className, name, onAddChip, onRemoveChip, onChange, onClick, renderChip, transformValue, value, ...rest }, ref) => {
        const inputRef = useRef();
        const sharedRef = useSharedRef(null, [ref, inputRef]);

        useImperativeHandle(sharedRef, () => ({
            change: value => {
                if (onChange) {
                    onChange({
                        target: {
                            name,
                            value,
                        },
                    });
                }
            },
            clear: () => {
                onChange({
                    target: {
                        name,
                        value: [],
                    },
                });
            },
        }));

        const actions = useMemo(
            () => ({
                push: item => {
                    const newValue = [...value, item];
                    inputRef.current.change(newValue);
                    if (onAddChip) {
                        onAddChip(item);
                    }
                },
                transformValue: transformValue ? transformValue : value => value,
                removeAt: index => {
                    const item = value[index];
                    const newValue = [...value];
                    newValue.splice(index, 1);
                    inputRef.current.change(newValue);
                    if (onRemoveChip) {
                        onRemoveChip(item);
                    }
                },
            }),
            [onAddChip, onRemoveChip, value]
        );

        const [internalValue, setInternalValue] = useState('');
        const [deleteCursor, { onKeyDown, onBackspace }, setDeleteCursor] = useListCursor(value, false, actions);

        const handleChange = e => {
            setDeleteCursor(undefined);
            setInternalValue(e.target.value);
        };

        const handleKeyDown = e => {
            onKeyDown(e);

            if (e.key === 'Enter') {
                setInternalValue('');
            }
        };

        return (
            <Root padding={2} paddingX={3} minHeight={10}>
                {value?.map((item, i) =>
                    renderChip ? renderChip(item, actions, i, deleteCursor) : defaultChip(item, actions, i, deleteCursor)
                )}
                <Input
                    {...rest}
                    className={className}
                    autoComplete={false}
                    marginLeft={1}
                    ref={sharedRef}
                    paddingLeft={0}
                    paddingY={0}
                    paddingBottom={2}
                    minHeight={5}
                    onBackspace={onBackspace}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={internalValue}
                />
            </Root>
        );
    }
);
