import { useCallback, useMemo, useRef, useState } from 'react';
import { emojiIndex } from 'emoji-mart';

import { isCommand } from './utils';

export const useMessageInputTriggers = ({ commands, handleChange: onChange, replaceText, textareaRef }, customTriggers) => {
    const [activeTriggerType, setActiveTriggerType] = useState();
    const [triggerData, setTriggerData] = useState();

    const currentTrigger = useRef();
    const actualToken = useRef();

    const triggers = useMemo(
        () =>
            customTriggers || {
                '/': {
                    clearOnComplete: true,
                    dataProvider: (q, text, onReady) => {
                        if (text?.indexOf('/') !== 0 || !commands) {
                            return [];
                        }

                        const selectedCommands = commands.filter(c => c.name?.indexOf(q) !== -1);

                        // sort alphabetically unless the you're matching the first char
                        selectedCommands.sort((a, b) => {
                            let nameA = a.name?.toLowerCase();
                            let nameB = b.name?.toLowerCase();

                            if (nameA?.indexOf(q) === 0) {
                                nameA = `0${nameA}`;
                            }

                            if (nameB?.indexOf(q) === 0) {
                                nameB = `0${nameB}`;
                            }

                            if (nameA !== null && nameB !== null) {
                                if (nameA < nameB) {
                                    return -1;
                                }

                                if (nameA > nameB) {
                                    return 1;
                                }
                            }

                            return 0;
                        });

                        const result = selectedCommands.slice(0, 10);

                        if (onReady) onReady(result, q);

                        return result;
                    },
                    type: 'slash',
                },
                ':': {
                    clearOnComplete: true,
                    dataProvider: (q, text, onReady) => {
                        if (q.length === 0 || q.charAt(0).match(/[^a-zA-Z0-9+-]/gu)) {
                            return [];
                        }

                        const emojis = emojiIndex.search(q) || [];
                        const result = emojis.slice(0, 100);

                        if (onReady) onReady(result, q);

                        return result;
                    },
                    type: 'emoji',
                },
            },
        [commands, customTriggers]
    );

    const resetState = useCallback(() => {
        currentTrigger.current = '';
        actualToken.current = '';
        setActiveTriggerType(null);
        setTriggerData(null);
    }, []);

    const handleComplete = useCallback(() => {
        if (triggers[currentTrigger.current]?.clearOnComplete) {
            replaceText(`${currentTrigger.current}${actualToken.current}`, '');
        }

        textareaRef.current.focus();

        resetState();
    }, [replaceText, resetState, textareaRef, triggers]);

    const handleTrigger = useCallback(
        value => {
            const triggerSettings = triggers?.[currentTrigger.current];

            if (!currentTrigger.current || !triggerSettings) {
                return;
            }

            const { dataProvider, type } = triggerSettings;

            dataProvider(actualToken.current, value, (data, token) => {
                // Make sure that the result is still relevant for current query
                if (token !== actualToken.current) return;

                if (!Array.isArray(data)) {
                    throw new TypeError('Trigger provider has to provide an array!');
                }

                if (!type) {
                    throw new Error('type should be defined!');
                }

                // if we haven't resolved any data let's close the autocomplete
                if (!data.length || !actualToken.current) {
                    resetState();

                    return;
                }

                setActiveTriggerType(triggers[currentTrigger.current].type);
                setTriggerData(data);
            });
        },
        [triggers]
    );

    const handleChange = useCallback(
        e => {
            if (onChange) {
                onChange(e);
            }

            let lastToken;

            const { selectionEnd, value: textareaValue } = e.target;

            if (isCommand(textareaValue)) {
                currentTrigger.current = '/';
                lastToken = textareaValue;
            } else {
                const tokenMatch = textareaValue
                    .slice(0, selectionEnd)
                    // eslint-disable-next-line require-unicode-regexp
                    .match(/(?!^|\W)?[:@][^\s]*\s?[^\s]*$/g);

                lastToken = tokenMatch && tokenMatch[tokenMatch.length - 1].trim();

                currentTrigger.current = (lastToken && Object.keys(triggers).find(a => a === lastToken[0])) || null;
            }

            // if trigger is not configured step out from the function, otherwise proceed
            if (!currentTrigger || !lastToken) {
                setActiveTriggerType(null);
                setTriggerData(null);

                return;
            }

            actualToken.current = lastToken.slice(1);

            handleTrigger(textareaValue);
        },
        [handleTrigger, onChange, triggers]
    );

    return [
        activeTriggerType,
        triggerData,
        {
            handleChange,
            handleComplete,
        },
    ];
};
