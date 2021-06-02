import React from 'react';
import { render } from 'react-dom';

import CombaseWidget from './main';

export const init = (opts) => {
	render(<CombaseWidget {...opts} />, document.getElementById('combase_widget'));
};
