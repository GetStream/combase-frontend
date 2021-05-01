import { useState } from 'react';

import { Chat as ChatPreset, Markdown as EditorPreset } from './constants/presets';
import Editable from './Editable';

const initialValue = [
    {
        children: [
            {
                children: [
                    {
                        text: '',
                    },
                ],
                type: 'p',
            },
        ],
    },
];

const initialMarkdownValue = [
    {
        children: [
            {
                children: [
                    {
                        text: '',
                    },
                ],
                type: 'h1',
            },
            {
                children: [
                    {
                        text: '',
                    },
                ],
                type: 'p',
            },
        ],
    },
];

export const Chat = () => {
    const [value, setValue] = useState(initialValue);

    return (
        <Editable
            onChange={setValue}
            initialValue={initialValue}
            value={value}
            plugins={ChatPreset.plugins}
            components={ChatPreset.components}
        />
    );
};

export const Markdown = () => {
    const [value, setValue] = useState(initialMarkdownValue);

    return (
        <Editable
            onChange={setValue}
            initialValue={initialMarkdownValue}
            value={value}
            plugins={EditorPreset.plugins}
            components={EditorPreset.components}
        />
    );
};

export default {
    component: Editable,
    title: 'inputs/Editable',
};
