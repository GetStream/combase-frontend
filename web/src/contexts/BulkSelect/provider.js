import React, { useMemo } from 'react';
import BulkSelectContext from './context';

const BulkSelectProvider = (children) => {
	const value = useMemo(() => ({}), []);

	return <BulkSelectContext.Provider value={value}>{children}</BulkSelectContext.Provider>
};

export default BulkSelectProvider;