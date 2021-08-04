import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { ONBOARD_USER_AND_ORG, setAuthenticationCredentials } from 'apollo/operations';
import FormikWizard from 'components/FormikWizard';

import Container from '@combase.app/ui/Container';
import { Heading } from '@combase.app/ui/Text';
import StreamLogo from '@combase.app/ui/StreamLogo';

import CreateLogin, { validationSchema as step1Validation } from './CreateLogin';
import CreateUser, { validationSchema as step2Validation } from './CreateUser';
import CreateOrganization, { validationSchema as step3Validation } from './CreateOrganization';
import LinkStreamApp, { validationSchema as step4Validation } from './LinkStreamApp';

const Root = styled(Container).attrs({
	variant: 'contained',
})`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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
	schedule: [{
		enabled: true,
		day: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
		time: [{
			start: {
				hour: 9,
				minute: 0,
			},
			end: {
				hour: 17,
				minute: 30,
			},
		}]
	}],
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
			<StreamLogo size={8} />
            <Heading 
				fontSize={5} 
				fontWeight={700}
				lineHeight={5} 
				marginBottom={8} 
			>
				Create an Account
			</Heading>
            <FormikWizard maxWidth={19} initialValues={initialValues} onSubmit={handleSubmit}>
                <CreateUser validationSchema={step1Validation} />
                <CreateLogin validationSchema={step2Validation} />
                <CreateOrganization validationSchema={step3Validation} />
                <LinkStreamApp validationSchema={step4Validation} />
            </FormikWizard>
        </Root>
    );
};

export default OnboardingScreen;