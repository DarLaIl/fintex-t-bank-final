import type { UserInfoProps } from '../../../types/types';

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <div>
            <p>Имя: {user.name}</p>
            <p>Фамилия: {user.lastname}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};
