import { lazy } from 'react';

const lazyPreload = importStatement => {
	const Component = lazy(importStatement);

	Component.preload = importStatement;

	return Component;
};

export default lazyPreload;