import React from 'react';
import styled from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from '@combase.app/ui';
import { authenticationVar, useReactiveVar } from '@combase.app/apollo';

import Onboarding from './views/Onboarding';
import Login from './views/Login';

const Root = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const Page = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    & ${Container} {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const Promo = styled.div`
    flex: 1;
    display: flex;
    padding: 1rem;

    & div {
        flex: 1;
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: ${({ theme }) => theme.borderRadius * 2}rem;
    }
`;

const Credit = styled.div`
    padding: 2rem 0;
`;

const AuthShell = ({ match }) => {
    const authed = useReactiveVar(authenticationVar);

    if (authed) {
        return <Redirect replace to="/dashboard" />;
    }

    return (
        <Root>
            <Page>
                <Container maxWidth={17}>
                    <Switch>
                        <Route component={Onboarding} path={`${match.url}create-account`} />
                        <Route component={Login} path={match.url} />
                    </Switch>
                </Container>
            </Page>
        </Root>
    );
};

export default AuthShell;
