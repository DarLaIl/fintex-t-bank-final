'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, setToken } from '../../store/store';
import { login } from '../../lib/api';
import { AuthWrapper } from '../../components/auth-page/AuthWrapper/AuthWrapper';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user.token) {
            router.push('/dashboard');
        }
    }, []);

    const loginButtonClickHandler = async () => {
        try {
            const token: string | undefined = await login(email, password);
            if (token) {
                dispatch(setToken(token));
                router.push('/dashboard');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail);
            } else {
                setError('Неизвестная ошибка.');
            }
            console.error('Registration failed:', err);
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
