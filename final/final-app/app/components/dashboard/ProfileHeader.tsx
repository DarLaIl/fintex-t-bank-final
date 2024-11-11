import styles from '../../../styles/Dashboard.module.css';
import { EditUserInfoButton } from './EditUserInfoButton';

export const ProfileHeader = () => {
    return (
        <header className={styles.userInfoHeader}>
            <h2 className={styles.userInfoHeaderTitle}>
                Профиль пользователя:
            </h2>
            <EditUserInfoButton />
        </header>
    );
};
