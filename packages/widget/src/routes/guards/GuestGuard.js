import React from 'react';
import { useLocalStorage } from 'react-use';
import { Redirect } from 'react-router-dom';

// TODO: Snackbar on redirect.
export const GuestGuard = ({ children }) => {
    const [auth] = useLocalStorage('auth');

    if (!auth) return <Redirect replace to="/welcome" />;

    return children;
};
