import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../WidgetConfig';

// TODO: Snackbar on redirect.
export const AuthGuard = ({ children }) => {
    const [auth] = useAuth();

    if (auth) return <Redirect replace to="/" />;

    return children;
};
