'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, setToken } from '../../store/store';
import { login } from '../../lib/api';
import { AuthWrapper } from '../../components/auth-page/AuthWrapper/AuthWrapper';

const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user.token) {
            router.push('/dashboard');
        }
    }, [router, user.token]);

    const loginButtonClickHandler = async () => {
        try {
            const token: string | undefined = await login(email, password);
            if (token) {
                dispatch(setToken(token));
                router.push('/dashboard');
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Неизвестная ошибка.');
            }
            console.error('Login failed:', err);
        }
    };

    return (
        <AuthWrapper
            error={error}
            onClick={loginButtonClickHandler}
            buttonText="Войти"
        >
            <input
                placeholder="Email"
                type="text"
                id="login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Пароль"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </AuthWrapper>
    );
};
export default LoginForm;
