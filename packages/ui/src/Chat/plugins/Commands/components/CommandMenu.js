import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactEditor, useSlate } from 'slate-react';

import { CommandIcon, DropdownIcon, SortIcon } from '../../../../icons';
import { Button } from '../../../../Buttons';
import { Box, Portal } from '../../../../Layout';
import { Menu, MenuItem } from '../../../../Lists';
import { StateDisplay } from '../../../../Feedback';
import { Dropdown, Popover } from '../../../../Popovers';
import { Code, Text } from '../../../../Text';

import TransferCommandSuggestions from './TransferCommandSuggestions';

const Root = styled(Menu)`
    position: fixed;
    overflow: hidden;
    height: auto;
    max-width: calc(100vw - 2rem);
    z-index: 10;
`;

const Footer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    & p {
        font-size: 0.5rem;
        line-height: 1rem;
        color: ${({ theme }) => theme.colors.lavender};
    }

    & p + p {
        margin-left: 0.5rem;
    }
`;

const CommandItem = styled(MenuItem)`
    min-height: 2.25rem;

    & pre {
        background-color: ${({ theme }) => theme.colors.border}70;
        color: ${({ theme }) => theme.colors.primary};
        white-space: pre-wrap;
        line-height: normal;
        font-size: 80%;
        font-family: 'Inter', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        padding: 0.25rem 0.4rem;
        margin: 0 -0.125rem;
        border-radius: 0.5rem;
    }
`;

const MenuFooter = () => (
    <Footer marginTop={1} paddingY={1} paddingX={2}>
        <Text>{'↑↓ Navigate'}</Text>
        <Text>{'↩ Select'}</Text>
    </Footer>
);

export const CommandMenu = ({ className, styles, at, options, valueIndex, match, onSelectItem }) => {
    const [anchorRef, setAnchorRef] = useState();
    const editor = useSlate();

    const { groups: { command, args } = {} } = match || {};

    useEffect(() => {
        if (at && !anchorRef) {
            setAnchorRef(ReactEditor.toDOMRange(editor, at));
        } else if (!at) {
            setAnchorRef(undefined);
        }
    }, [editor, at]);

    // const constrainWidth = useMedia	(`(min-width: ${theme.breakpoints[1]})`);

    if (!at) {
        return null;
    }

    switch (command) {
        case 'transfer':
            return (
                <Portal>
                    <Popover
                        anchor={anchorRef}
                        as={TransferCommandSuggestions}
                        footer={<MenuFooter />}
                        onClose={() => setAnchorRef(false)}
                        placement="top-start"
                        query={args}
                        subheading="Transfer to:"
                        valueIndex={valueIndex}
                    />
                </Portal>
            );
        default:
            return (
                <Portal>
                    <Popover
                        anchor={anchorRef}
                        as={Dropdown}
                        footer={<MenuFooter />}
                        onClose={() => setAnchorRef(false)}
                        placement="top-start"
                        subheading="Suggested Commands"
                    >
                        {options?.length ? (
                            options.map((command, i) => (
                                <CommandItem
                                    actions={command.args?.length ? [<Code key={0}>{command.args}</Code>] : undefined}
                                    active={valueIndex === i}
                                    icon={CommandIcon}
                                    iconColor="primary"
                                    key={command.name}
                                    label={command.name}
                                    onClick={() => onSelectItem(editor, command)}
                                />
                            ))
                        ) : (
                            <StateDisplay text="No matching commands" />
                        )}
                    </Popover>
                </Portal>
            );
    }
};
