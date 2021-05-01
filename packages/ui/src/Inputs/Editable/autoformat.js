import { 
	ELEMENT_BLOCKQUOTE,
	ELEMENT_CODE_BLOCK,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_H4,
	ELEMENT_H5,
	ELEMENT_H6,
	ELEMENT_UL,
	ELEMENT_OL,
	ELEMENT_LI,
	ELEMENT_TODO_LI,
	MARK_BOLD, 
	MARK_CODE, 
	MARK_ITALIC, 
	MARK_STRIKETHROUGH, 
	toggleList, 
	unwrapList 
} from '@udecode/slate-plugins';

import { options } from './pluginOptions';

const preFormat = editor => unwrapList(editor, options);

export const chatAutoformat = {
	rules: [
		{
			type: options[ELEMENT_LI].type,
			markup: ['-'],
			preFormat,
			format: (editor) => {
				toggleList(editor, { type: options[ELEMENT_UL].type });
			},
		},
		{
			type: options[ELEMENT_LI].type,
			markup: ['1.', '1)'],
			preFormat,
			format: (editor) => {
				toggleList(editor, { type: options[ELEMENT_OL].type });
			},
		},
		{
			type: options[ELEMENT_TODO_LI].type,
			markup: ['[]'],
		},
		{
			between: ['**', '**'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_BOLD,
		},
		{
			between: ['__', '__'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_BOLD,
		},
		{
			between: ['*', '*'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_ITALIC,
		},
		{
			between: ['_', '_'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_ITALIC,
		},
		{
			between: ['`', '`'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_CODE,
		},
		{
			markup: '``',
			mode: 'inline-block',
			preFormat: editor => unwrapList(editor, options),
			trigger: '`',
			type: options[ELEMENT_CODE_BLOCK].type,
		},
	]
};


export const markdownAutoformat = {
	rules: [
		/*
		*   {
		*       markup: '#',
		*       preFormat,
		*       type: options.h1.type,
		*   },
		*/
		{
			markup: '##',
			preFormat,
			type: options[ELEMENT_H2].type,
		},
		{
			markup: '###',
			preFormat,
			type: options[ELEMENT_H3].type,
		},
		{
			markup: '####',
			preFormat,
			type: options[ELEMENT_H4].type,
		},
		{
			markup: '#####',
			preFormat,
			type: options[ELEMENT_H5].type,
		},
		{
			markup: '######',
			preFormat,
			type: options[ELEMENT_H6].type,
		},
		{
			type: options[ELEMENT_LI].type,
			markup: ['-'],
			preFormat,
			format: (editor) => {
				toggleList(editor, { type: options[ELEMENT_UL].type });
			},
		},
		{
			type: options[ELEMENT_LI].type,
			markup: ['1.', '1)'],
			preFormat,
			format: (editor) => {
				toggleList(editor, { type: options[ELEMENT_OL].type });
			},
		},
		{
			type: options[ELEMENT_TODO_LI].type,
			markup: ['[]'],
		},
		{
			markup: ['>'],
			preFormat,
			type: options[ELEMENT_BLOCKQUOTE].type,
		},
		{
			between: ['**', '**'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_BOLD,
		},
		{
			between: ['__', '__'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_BOLD,
		},
		{
			between: ['*', '*'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_ITALIC,
		},
		{
			between: ['_', '_'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_ITALIC,
		},
		{
			between: ['`', '`'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_CODE,
		},
		{
			between: ['~~', '~~'],
			insertTrigger: true,
			mode: 'inline',
			type: MARK_STRIKETHROUGH,
		},
		{
			markup: '``',
			mode: 'inline-block',
			preFormat: editor => unwrapList(editor, options),
			trigger: '`',
			type: options[ELEMENT_CODE_BLOCK].type,
		},
	]
};
