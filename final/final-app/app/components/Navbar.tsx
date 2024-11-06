'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../components/Button';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const startButtonClickHandler = () => {
        router.push('/login');
    };
    const returnButtonClickHandler = () => {
        router.push('/');
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
            {pathname === '/' ? (
                <Button onClick={startButtonClickHandler}>
                    Начать планировать
                </Button>
            ) : (
                <Button onClick={returnButtonClickHandler}>Назад</Button>
            )}
        </nav>
    );
};

export default Navbar;
