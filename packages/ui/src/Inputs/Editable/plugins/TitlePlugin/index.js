import {
  getRenderElement,
} from '@udecode/slate-plugins';
import { TYPE } from './defaults';

export const createTitlePlugin = () => ({
	renderElement: getRenderElement(TYPE),
});

export { default as Title } from './Title';