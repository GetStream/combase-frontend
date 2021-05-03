import { emojiIndex } from 'emoji-mart';

export const emojiReplace = (word) => {
    const found = emojiIndex.search(word) || [];

    const emoji = found
        .find(({ emoticons }) => emoticons?.includes(word));

    if (!emoji || !('native' in emoji)) return null;

    return emoji.native;
};
