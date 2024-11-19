'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '../../../lib/api';
import { setToken } from '@/store/store';
import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton';
import styles from './Navbar.module.css';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const startButtonClickHandler = () => {
        router.push('/login');
    };
    const returnButtonClickHandler = () => {
        router.push('/');
    };
    const logoutButtonClickHandler = async () => {
        try {
            await logout();
            setToken('');
        } catch (err) {
            console.error('Logout failed:', err);
        }
        router.push('/login');
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Image
                    src="/plantIcon.png"
                    width={40}
                    height={40}
                    priority
                    placeholder="empty"
                    alt="plant"
                />
                <Link href="/">Planify</Link>
            </div>
            {pathname === '/' && (
                <LogoutButton onClick={startButtonClickHandler}>
                    Начать планировать
                </LogoutButton>
            )}
            {(pathname === '/login' || pathname === '/registration') && (
                <LogoutButton onClick={returnButtonClickHandler}>
                    Назад
                </LogoutButton>
            )}
            {!(
                pathname === '/login' ||
                pathname === '/registration' ||
                pathname === '/'
            ) && (
                <LogoutButton onClick={logoutButtonClickHandler}>
                    Выйти
                </LogoutButton>
            )}
        </nav>
    );
};

export default Navbar;
