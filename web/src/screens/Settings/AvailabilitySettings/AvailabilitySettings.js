import React from 'react';
import { PageHeader, ScrollbarsWithContext } from '@combase.app/ui';

import AvailabilityForm from './AvailabilityForm';

const AvailabilitySettings = () => {
	return (
		<ScrollbarsWithContext>
			<PageHeader backgroundColor="surface" variant="flat" title="Availability" />
			<AvailabilityForm />
		</ScrollbarsWithContext>
	);
};

export default AvailabilitySettings;
