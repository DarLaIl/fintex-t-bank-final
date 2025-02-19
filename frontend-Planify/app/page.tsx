'use client';

import { useRouter } from 'next/navigation';
import { LogoutButton } from './components/buttons/LogoutButton/LogoutButton';
import styles from './Home.module.css';

export default function Home() {
    const router = useRouter();

    return (
        <main className={styles.wrapper}>
            <h1 className={styles.wrapperTitle}>Добро пожаловать в Planify!</h1>
            <p className={styles.wrapperText}>
                <em>Planify</em> — ваш персональный органайзер для управления
                задачами и планированием дел. Приложение предлагает интуитивный
                интерфейс для создания и организации задач, а также поддерживает
                функциональность календаря и возможности для совместной работы.
            </p>
            <h4 className={styles.wrapperFeaturesTitle}>
                Ключевые функции Planify:
            </h4>
            <ul className={styles.wrapperFeaturesList}>
                <li>
                    <strong>Множественные списки дел:</strong> создавайте
                    отдельные списки для рабочих задач, личных целей, проектов и
                    других важных дел.
                </li>
                <li>
                    <strong>Календарь задач:</strong> отслеживайте сроки и
                    приоритеты — задачи автоматически добавляются в календарь,
                    позволяя увидеть свой план на неделю или месяц.
                </li>
                <li>
                    <strong>Напоминания о задачах:</strong> устанавливайте
                    напоминания, чтобы не упустить важные сроки и события.
                </li>
                <li>
                    <strong>Совместная работа:</strong> делитесь задачами и
                    списками с друзьями, коллегами и семьей для совместного
                    планирования и выполнения.
                </li>
            </ul>
            <p className={styles.wrapperText}>
                Погружайтесь в мир удобного и эффективного планирования с
                Planify и следите за своим прогрессом каждый день!
            </p>
            <LogoutButton onClick={() => router.push('/login')}>
                Начать планировать
            </LogoutButton>
        </main>
    );
}
