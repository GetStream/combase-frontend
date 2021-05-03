import { useCallback } from 'react';
import { Card } from '@combase.app/ui';
import { Formik } from 'formik';
import * as yup from 'yup';
import { LOGIN, setAuthenticationCredentials, useMutation } from '@combase.app/apollo';

import loginForm from './loginForm';

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = yup.object().shape({
    email: yup.string().email('Please provide a valid email.').required('This field is required.'),
    password: yup.string().required('This field is required.'),
});

const mutationOpts = {
    update: (_, { data: { agent } }) => {
        setAuthenticationCredentials(agent.token);
    },
};

const LoginScreen = ({ history }) => {
    const [login] = useMutation(LOGIN, mutationOpts);

    const handleSubmit = useCallback(
        async values => {
            try {
                await login({
                    variables: values,
                });

                history.push('/dashboard');
            } catch (error) {
                console.error(error.message); // eslint-disable-line no-console
            }
        },
        [history, login]
    );

    return (
        <Card boxShadow={7} padding={7}>
            <Formik children={loginForm} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} />
        </Card>
    );
};

export default LoginScreen;
