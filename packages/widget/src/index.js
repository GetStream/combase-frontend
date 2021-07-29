import React from 'react';
import ReactDOM from 'react-dom';

import CombaseWidget from './main';

export const init = (opts) => {
	ReactDOM.render(<CombaseWidget {...opts} />, document.getElementById('combase_widget'));
};
