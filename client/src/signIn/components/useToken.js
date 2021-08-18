import { useState } from 'react';

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return sessionStorage.getItem('userToken');
    });

    const setToken = newToken => {
        sessionStorage.setItem('userToken', newToken);
        setTokenInternal(newToken);
    }

    return [token, setToken];
}