'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../../lib/api';
import { AuthWrapper } from '../../components/auth/AuthWrapper';

export default function RegistrationForm() {
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    
    const router = useRouter();

    const registerButtonClickHandler = async () => {
        try {
            await register(email, password, name, lastname);
            router.push('/login');
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <AuthWrapper
            error={error}
            onClick={registerButtonClickHandler}
            submitButtonText={'Зарегистрироваться'}
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
