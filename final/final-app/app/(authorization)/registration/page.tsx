'use client';

//import { useRouter } from 'next/navigation';
import SwitchBar from '../../components/SwitchBar';
import styles from '../../../styles/Authorization.module.css';

export default function RegistrationForm() {
    //const router = useRouter();

    return (
        <main>
            <div className={styles.container}>
                <SwitchBar />
                <form className={styles['data-container']}>
                    <input
                        placeholder="Имя"
                        type="text"
                        id="userFirstName"
                        //value={}
                        //onChange={}
                    />
                    <input
                        placeholder="Фамилия"
                        type="text"
                        id="userLastName"
                        //value={}
                        //onChange={}
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        id="email"
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
                    <button className={styles['control-btn']}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </main>
    );
}
