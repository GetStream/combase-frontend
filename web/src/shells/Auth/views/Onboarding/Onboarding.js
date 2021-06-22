import React, { useCallback } from 'react';
import styled from 'styled-components';
import { PageTitle } from '@combase.app/ui';
import { useMutation } from '@combase.app/apollo';
import { ONBOARD_USER_AND_ORG, setAuthenticationCredentials } from '@combase.app/apollo';
import FormikWizard from 'components/FormikWizard';

import CreateLogin, { validationSchema as step1Validation } from './CreateLogin';
import CreateUser, { validationSchema as step2Validation } from './CreateUser';
import CreateOrganization, { validationSchema as step3Validation } from './CreateOrganization';
import LinkStreamApp, { validationSchema as step4Validation } from './LinkStreamApp';

const Root = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled(PageTitle)`
    text-align: center;
    margin-bottom: 2rem;
`;

const initialValues = {
    agent: {
        avatar: '',
        confirm: '',
        email: '',
        name: {
            first: '',
            last: '',
        },
        password: '',
    },
    organization: {
        color: '',
        name: '',
        stream: {
            appId: '',
            key: '',
            secret: '',
        },
    },
};

const mutationOpts = {
    update: (_, { data: { agent } }) => {
        setAuthenticationCredentials(agent.token);
    },
};

const OnboardingScreen = ({ history }) => {
    const [createAccount] = useMutation(ONBOARD_USER_AND_ORG, mutationOpts);

    const handleSubmit = useCallback(
        async values => {
            try {
                const {
                    organization: { color, ...organization },
                    agent: { confirm, name, ...agent },
                } = values;

                const agentName = Object.values(name).join(' ');

                let theme = {};

                if (color) {
                    theme = {
                        color: {
                            primary: color,
                        },
					}
                }

                await createAccount({
                    variables: {
                        agent: {
                            ...agent,
                            name: {
                                display: agentName,
                                full: agentName,
                            },
                        },
                        organization: {
                            ...organization,
                            contact: {
                                email: agent.email,
                            },
                            theme,
                        },
                    },
                });

                history.push('/dashboard');
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        },
        [createAccount, history]
    );

    return (
        <Root>
            <Title subtitle="Combase" title="Create Account" marginBottom={7} />
            <FormikWizard initialValues={initialValues} onSubmit={handleSubmit}>
                <CreateUser validationSchema={step1Validation} />
                <CreateLogin validationSchema={step2Validation} />
                <CreateOrganization validationSchema={step3Validation} />
                <LinkStreamApp validationSchema={step4Validation} />
            </FormikWizard>
        </Root>
    );
};

export default OnboardingScreen;
