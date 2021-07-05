import React from 'react';
import { useLocalStorage } from 'react-use';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../WidgetConfig';

// TODO: Snackbar on redirect.
export const GuestGuard = ({ children }) => {
    const [auth] = useAuth();

    if (!auth) return <Redirect replace to="/welcome" />;

    return children;
};
