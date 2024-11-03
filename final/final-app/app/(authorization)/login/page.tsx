'use client';

//import { useRouter } from 'next/navigation';
import SwitchBar from '../../components/SwitchBar';
import styles from '../../../styles/Authorization.module.css';

export default function LoginForm() {
    //const router = useRouter();

    return (
        <main>
            <div className={styles.container}>
                <SwitchBar />
                <form className={styles['data-container']}>
                    <input
                        placeholder="Email"
                        type="text"
                        id="login"
                        //value={}
                        //onChange={}
                    />
                    <input
                        placeholder="Пароль"
                        type="password"
                        id="password"
                        //value={}
                        //onChange={}
                    />
                    <button className={styles['control-btn']}>Войти</button>
                </form>
            </div>
        </main>
    );
}
