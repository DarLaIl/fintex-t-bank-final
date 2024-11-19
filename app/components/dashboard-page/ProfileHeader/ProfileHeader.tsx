import styles from './ProfileHeader.module.css';
import { EditUserInfoButton } from '../../buttons/EditUserInfoButton/EditUserInfoButton';

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
