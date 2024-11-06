'use client';

import SwitchBar from './SwitchBar';
import styles from '../../styles/Authorization.module.css';

type AuthWrapperProps = {
    error: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    submitButtonText: string;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
    error,
    children,
    onClick,
    submitButtonText,
}) => {
    return (
        <main>
            <div className={styles.container}>
                <SwitchBar />
                {error && <p>{error}</p>}
                <div className={styles.dataContainer}>
                    {children}
                    <button className={styles.controlBtn} onClick={onClick}>
                        {submitButtonText}
                    </button>
                </div>
            </div>
        </main>
    );
};
