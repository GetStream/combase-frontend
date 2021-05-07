import { useLocalStorage } from 'react-use';
import { Redirect } from 'react-router-dom';

// TODO: Snackbar on redirect.
export const AuthGuard = ({ children }) => {
    const [auth] = useLocalStorage('auth');

    if (auth) return <Redirect replace to="/" />;

    return children;
};