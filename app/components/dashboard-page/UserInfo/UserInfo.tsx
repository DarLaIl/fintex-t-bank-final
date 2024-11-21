import type { UserInfoProps } from '../../../types/types';
import styles from '../../../(protected)/dashboard/Dashboard.module.css'

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <div className={styles.personalData}>
            <p>Имя: {user.name}</p>
            <p>Фамилия: {user.lastname}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};
