import { Formik } from 'formik';

import Container from '../../Container';

import ScheduleInput from './ScheduleInput';

const initialValues = {
    schedule: [
        {
            day: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            time: [
                {
                    start: '8:00',
                    end: '12:00',
                },
                {
                    start: '12:30',
                    end: '17:30',
                },
            ],
        },
        {
            day: [],
            time: [{}],
        },
    ],
};

export const Default = () => (
    <Formik initialValues={initialValues}>
        {formik => <ScheduleInput name="schedule" onChange={formik.handleChange} value={formik.values.schedule} />}
    </Formik>
);

export default {
    component: ScheduleInput,
    decorators: [
        Story => (
            <Container>
                <Story />
            </Container>
        ),
    ],
    title: 'inputs/ScheduleInput',
};
