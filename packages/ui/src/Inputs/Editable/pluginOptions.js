import {
  createSlatePluginsOptions,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_PARAGRAPH,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  KEYS_HEADING,
} from '@udecode/slate-plugins';

export const options = createSlatePluginsOptions();

const resetBlockTypesCommonRule = {
  types: [options[ELEMENT_BLOCKQUOTE].type, options[ELEMENT_TODO_LI].type],
  defaultType: options[ELEMENT_PARAGRAPH].type,
};

export const markdownPluginOptions = {
	resetNodePlugin: {
		rules: [
			{
				...resetBlockTypesCommonRule,
				hotkey: 'Enter',
				predicate: isBlockAboveEmpty,
			},
			{
				...resetBlockTypesCommonRule,
				hotkey: 'Backspace',
				predicate: isSelectionAtBlockStart,
			},
		],
	},
	exitBreakPlugin: {
		rules: [
			{
				hotkey: 'mod+enter',
			},
			{
				hotkey: 'mod+shift+enter',
				before: true,
			},
			{
				hotkey: 'enter',
				query: {
					start: true,
					end: true,
					allow: KEYS_HEADING,
				},
			},
		],
	},
	softBreakPlugin: {
		rules: [
			{ hotkey: 'shift+enter' },
			{
				hotkey: 'enter',
				query: {
					allow: [
						options[ELEMENT_CODE_BLOCK].type,
						options[ELEMENT_BLOCKQUOTE].type,
						options[ELEMENT_TD].type,
					],
				},
			},
		],
	}
}

export const chatPluginOptions = {
	softBreakPlugin: {
		rules: [
			{
				hotkey: 'shift+enter',
				allow: [
					options[ELEMENT_PARAGRAPH].type,
				]
			},
		],
	}
}

export const editableProps = {
  placeholder: 'Write something...',
  spellCheck: false,
  autoFocus: true,
};