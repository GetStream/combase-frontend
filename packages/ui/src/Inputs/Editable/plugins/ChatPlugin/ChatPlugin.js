import { onKeyDownChatInput } from './onKeyDownChatInput';
import { withChatOverrides } from './withChatOverrides';
export const createChatPlugin = (options) => ({
    onKeyDown: onKeyDownChatInput(options),
	withOverrides: [withChatOverrides(options)]
});