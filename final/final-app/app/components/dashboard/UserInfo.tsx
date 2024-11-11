type UserInfoProps = {
    user: {
        name: string;
        lastname: string;
        email: string;
    };
};

export const UserInfo: React.FC<UserInfoProps> = ({
user
}) => {
    return (
        <div>
            <p>Имя: {user.name}</p>
            <p>Фамилия: {user.lastname}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};


