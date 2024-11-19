'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '../../../lib/api';
import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton';
import styles from './Navbar.module.css';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/store';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const startButtonClickHandler = () => {
        router.push('/login');
    };
    const returnButtonClickHandler = () => {
        router.push('/');
    };
    const logoutButtonClickHandler = async () => {
        try {
            await logout();
            router.push('/login');
            dispatch(setToken(''));
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const shouldShowLogoutButton = !(
        pathname === '/login' ||
        pathname === '/registration' ||
        pathname === '/'
    );

    const shouldShowReturnButton =
        pathname === '/login' || pathname === '/registration';

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
            {shouldShowReturnButton && (
                <LogoutButton onClick={returnButtonClickHandler}>
                    Назад
                </LogoutButton>
            )}
            {shouldShowLogoutButton && (
                <LogoutButton onClick={logoutButtonClickHandler}>
                    Выйти
                </LogoutButton>
            )}
        </nav>
    );
};

export default Navbar;
