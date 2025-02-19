import styles from './LogoutButton.module.css';
import type { ControlButtonProps } from '../../../types/types';

export const LogoutButton: React.FC<ControlButtonProps> = ({
    children,
    onClick,
}) => {
    return (
        <button className={styles.btn} type="button" onClick={onClick}>
            {children}
        </button>
    );
};
