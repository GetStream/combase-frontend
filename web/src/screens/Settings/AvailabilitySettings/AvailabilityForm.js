import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useQuery, GET_MY_PROFILE } from '@combase.app/apollo';

import { Box, Container, ListDetailSection, ScheduleInput, Text } from '@combase.app/ui';

const Root = styled(Box)`

`;

const AvailabilityForm = () => {
	const { data } = useQuery(GET_MY_PROFILE);
	
	const initialValues = useMemo(() => ({
		schedule: data?.me?.schedule || [
			{
				day: [],
				time: [{}],
			},
		],
	}), [data]);

	return (
		<Formik onSubmit={(values) => console.log(values)} initialValues={initialValues}>
			{
				formik => (
					<Root>
						<Container>
							<ListDetailSection title="Your Schedule" description="Set your availability schedule and customize when you will be available to communicate with end-users." />
							<ScheduleInput 
								canSave={formik.dirty && formik.isValid}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								onSubmit={formik.handleSubmit}
								name="schedule"
								value={formik.values.schedule}
							/>
						</Container>
					</Root>
				)
			}
		</Formik>
	);
};

export default AvailabilityForm;