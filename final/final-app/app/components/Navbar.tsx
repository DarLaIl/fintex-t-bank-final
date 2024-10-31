'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
    const router = useRouter();

    const buttonClickHandler = () => {
        router.push('/register')
    }
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Image
                    src="/plant_icon.png"
                    width={40}
                    height={40}
                    alt="plant"
                />
                <Link href="/">Planify</Link>
            </div>
            <button type="button" onClick={buttonClickHandler}>
                Начать планировать
            </button>
        </nav>
    );
};

export default Navbar;
