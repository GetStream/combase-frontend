import { useCallback, useMemo, useState } from 'react';
import { isCollapsed, isPointAtWordEnd, isWordAfterTrigger } from '@udecode/slate-plugins-common';
import { useChannelActions } from '@combase.app/chat';

import { Range, Transforms } from 'slate';
import { matchesTriggerAndPattern } from './utils/matchesTriggerAndPattern';
// import { insertMention } from './transforms/insertMention';
import { getNextIndex } from './utils/getNextIndex';
import { getPreviousIndex } from './utils/getPreviousIndex';
import { PLUGIN_COMMANDS } from './defaults';

/**
 * Enables support for autocompleting /commands, :emojis: and @mentions.
 */
export const useComposerCommands = ({
    atStart,
    options = [],
    maxSuggestions = 10,
    trigger = '/',
    onSelectItem,
    optionFilter,
    optionSearchPattern,
}) => {
    const [targetRange, setTargetRange] = useState(null);
    const [valueIndex, setValueIndex] = useState(0);
    const [match, setMatch] = useState(null);

    const values = useMemo(() => {
        const getOptions = () => {
            if (typeof options === 'function') {
                return options(match);
            } else {
                return options;
            }
        };

        if (optionFilter) {
            return getOptions().filter(optionFilter(match)).slice(0, maxSuggestions);
        }

        return getOptions();
    }, [maxSuggestions, optionFilter, options, match]);

    const onKeyDownCommands = useCallback(
        editor => e => {
            if (targetRange) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    return setValueIndex(getNextIndex(valueIndex, values.length - 1));
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    return setValueIndex(getPreviousIndex(valueIndex, values.length - 1));
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    return setTargetRange(null);
                }

                if (['Tab', 'Enter'].includes(e.key)) {
                    e.preventDefault();
                    onSelectItem(editor, values[valueIndex]);
                    return false;
                }
            }
        },
        [targetRange, valueIndex, values, onSelectItem]
    );

    const onChangeCommands = useCallback(
        editor => () => {
            const { selection } = editor;

            if (selection && isCollapsed(selection)) {
                const cursor = Range.start(selection);

                const { range, match: beforeMatch } = matchesTriggerAndPattern(editor, {
                    at: cursor,
                    trigger,
                    pattern: optionSearchPattern || '(?<command>\\w*)',
                    atStart,
                });

                if (beforeMatch && isPointAtWordEnd(editor, { at: cursor })) {
                    setTargetRange(range);
                    setMatch(beforeMatch);
                    setValueIndex(0);
                    return;
                } else {
                    setMatch(undefined);
                }

                setTargetRange(null);
            }
        },
        [atStart, trigger, optionSearchPattern]
    );

    const handleSelectItem = useCallback(
        (editor, data) => {
            if (targetRange !== null) {
                if (onSelectItem) {
                    onSelectItem(editor, data, targetRange);
                }
                return setTargetRange(null);
            }
        },
        [onSelectItem, targetRange]
    );

    return {
        plugin: useMemo(
            () => ({
                pluginKeys: PLUGIN_COMMANDS,
                onChange: onChangeCommands,
                onKeyDown: onKeyDownCommands,
            }),
            [onChangeCommands, onKeyDownCommands]
        ),
        getCommandMenuProps: useCallback(
            () => ({
                at: targetRange,
                valueIndex,
                options: values,
                onSelectItem: handleSelectItem,
                match,
            }),
            [handleSelectItem, match, targetRange, valueIndex, values]
        ),
        at: targetRange,
        match,
    };
};
