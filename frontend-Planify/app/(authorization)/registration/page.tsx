'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register } from '../../lib/api';
import { AuthWrapper } from '../../components/auth-page/AuthWrapper/AuthWrapper';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/store';

export default function RegistrationForm() {
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const router = useRouter();
    const dispatch = useDispatch();

    const registerButtonClickHandler = async () => {
        try {
            await register(email, password, name, lastname);
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
            console.error('Registration failed:', err);
        }
    };

    return (
        <AuthWrapper
            error={error}
            onClick={registerButtonClickHandler}
            buttonText={'Зарегистрироваться'}
        >
            <input
                placeholder="Имя"
                type="text"
                id="userFirstName"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Фамилия"
                type="text"
                id="userLastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            <input
                placeholder="Email"
                type="email"
                id="email"
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
}
