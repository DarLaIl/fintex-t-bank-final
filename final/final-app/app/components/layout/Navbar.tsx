'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './Button';
import styles from '../../../styles/Navbar.module.css';
import { logout } from '../../lib/api';
import { setToken } from '@/store/store';

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
                <Button onClick={startButtonClickHandler}>
                    Начать планировать
                </Button>
            )}
            {pathname === '/login' ||
                (pathname === '/registration' && (
                    <Button onClick={returnButtonClickHandler}>Назад</Button>
                ))}
            {!(
                pathname === '/login' ||
                pathname === '/registration' ||
                pathname === '/'
            ) && <Button onClick={logoutButtonClickHandler}>Выйти</Button>}
        </nav>
    );
};

export default Navbar;
