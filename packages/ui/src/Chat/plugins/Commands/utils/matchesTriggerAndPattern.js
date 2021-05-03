import { escapeRegExp, getText } from '@udecode/slate-plugins-common';
import { Editor } from 'slate';

export const matchesTriggerAndPattern = (editor, { at, atStart, trigger, pattern }) => {
    // Point at the start of line
    const lineStart = Editor.before(editor, at, { unit: 'line' });

    // Range from before to start
    const beforeRange = lineStart && Editor.range(editor, lineStart, at);

    // Before text
    const beforeText = getText(editor, beforeRange);

    // Starts with char and ends with word characters
    const escapedTrigger = escapeRegExp(trigger);

    const start = atStart ? '(?:^)' : '(?:^|\\s)';
    const beforeRegex = new RegExp(`${start}${escapedTrigger}${pattern}`);

    // Match regex on before text
    const match = !!beforeText && beforeText.match(beforeRegex);

    // Point at the start of command
    const commandStart = match
        ? Editor.before(editor, at, {
              unit: 'character',
              distance: match[0].length + trigger.length,
          })
        : null;

    // Range from command to start
    const commandRange = commandStart && Editor.range(editor, commandStart, at);

    return {
        range: commandRange,
        match,
    };
};
