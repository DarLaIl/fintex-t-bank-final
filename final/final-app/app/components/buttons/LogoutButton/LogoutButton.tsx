import type { MouseEventHandler } from 'react';
import styles from './LogoutButton.module.css';

type LogoutButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: string;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({
    children,
    onClick,
}) => {
    return (
        <button className={styles.btn} type="button" onClick={onClick}>
            {children}
        </button>
    );
};
