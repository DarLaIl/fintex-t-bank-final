'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/store';
import { login } from '../../lib/api';
import SwitchBar from '../../components/SwitchBar';
import styles from '../../../styles/Authorization.module.css';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const loginButtonClickHandler = async () => {
        try {
            const token = await login(email, password);
            if (token) {
                dispatch(setToken(token));
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <main>
            <div className={styles.container}>
                <SwitchBar />
                {error && <p>{error}</p>}
                <div className={styles['data-container']}>
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
                    <button
                        className={styles['control-btn']}
                        onClick={loginButtonClickHandler}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </main>
    );
}
