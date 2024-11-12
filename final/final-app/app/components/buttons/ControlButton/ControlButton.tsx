import styles from './ControlButton.module.css';

type ControlButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: string;
};

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
