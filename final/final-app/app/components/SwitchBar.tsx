'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from '../../styles/Authorization.module.css';

export default function SwitchBar() {
    const router = useRouter();
    const pathname = usePathname();

    const loginButtonClickHandler = () => {
        router.push('/login');
    };

    const registrationButtonClickHandler = () => {
        router.push('/registration');
    };

    return (
        <div className={styles.topbar}>
            <button
                className={
                    pathname === '/login'
                        ? styles['switch-btn-active']
                        : styles['switch-btn']
                }
                onClick={loginButtonClickHandler}
            >
                Вход
            </button>

            <button
                className={
                    pathname === '/registration'
                        ? styles['switch-btn-active']
                        : styles['switch-btn']
                }
                onClick={registrationButtonClickHandler}
            >
                Регистрация
            </button>
        </div>
    );
}
