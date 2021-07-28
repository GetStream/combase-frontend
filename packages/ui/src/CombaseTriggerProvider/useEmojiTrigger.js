import EmojiItem from './EmojiItem';

const useEmojiTrigger = (emojiIndex) => ({
	component: EmojiItem,
	dataProvider: (query, _, onReady) => {
		if (query.length === 0 || query.charAt(0).match(/[^a-zA-Z0-9+-]/)) {
			return [];
		}
		const emojis = emojiIndex?.search(query) || [];
		// emojiIndex.search sometimes returns undefined values, so filter those out first
		const result = emojis.filter(Boolean).slice(0, 30);
		if (onReady) onReady(result, query);

		return result;
	},
	output: (entity) => ({
		caretPosition: 'next',
		key: entity.id,
		text: `${'native' in entity ? entity.native : ''}`,
	}),
});

export default useEmojiTrigger;