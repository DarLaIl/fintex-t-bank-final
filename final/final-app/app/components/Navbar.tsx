'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
                    src="/plant_icon.png"
                    width={40}
                    height={40}
                    priority
                    placeholder="empty"
                    alt="plant"
                />
                <Link href="/">Planify</Link>
            </div>
            {pathname === '/' ? (
                <button
                    className={styles.btn}
                    type="button"
                    onClick={startButtonClickHandler}
                >
                    Начать планировать
                </button>
            ) : (
                <button
                    className={styles.btn}
                    type="button"
                    onClick={returnButtonClickHandler}
                >
                    Назад
                </button>
            )}
        </nav>
    );
};

export default Navbar;
