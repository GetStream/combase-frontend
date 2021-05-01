import { Node } from 'slate';

export const serialize = (nodes) => nodes.map(n => Node.string(n)).join('\n\n')