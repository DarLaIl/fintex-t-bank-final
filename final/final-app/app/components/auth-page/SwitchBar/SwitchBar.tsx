'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './SwitchBar.module.css';

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
                className={styles.switchBtn}
                data-is-active={pathname === '/login'}
                onClick={loginButtonClickHandler}
            >
                Вход
            </button>

            <button
                className={styles.switchBtn}
                data-is-active={pathname === '/registration'}
                onClick={registrationButtonClickHandler}
            >
                Регистрация
            </button>
        </div>
    );
}
