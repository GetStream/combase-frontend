import {
  getRenderElement,
  getSlatePluginTypes
} from '@udecode/slate-plugins';
import { TYPE } from './defaults';

export const createTitlePlugin = () => ({
	renderElement: getRenderElement(TYPE),
});

export { Title } from './Title';