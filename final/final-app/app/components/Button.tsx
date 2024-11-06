import type { MouseEventHandler } from 'react';
import styles from '../../styles/Button.module.css';

type ButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: string;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button className={styles.btn} type="button" onClick={onClick}>
            {children}
        </button>
    );
};
