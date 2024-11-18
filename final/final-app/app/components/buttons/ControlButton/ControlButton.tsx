import styles from './ControlButton.module.css';
import type { ControlButtonProps } from '../../../types/types';

export const ControlButton: React.FC<ControlButtonProps> = ({
    onClick,
    children,
}) => {
    return (
        <button className={styles.controlBtn} onClick={onClick}>
            {children}
        </button>
    );
};
