'use client';

import SwitchBar from '../SwitchBar/SwitchBar';
import styles from './AuthWrapper.module.css';
import { ControlButton } from '../../buttons/ControlButton/ControlButton';

type AuthWrapperProps = {
    error: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    buttonText: string;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
    error,
    children,
    onClick,
    buttonText,
}) => {
    return (
        <main>
            <div className={styles.container}>
                <SwitchBar />
                {error && <p>{error}</p>}
                <div className={styles.dataContainer}>
                    {children}
                    <ControlButton onClick={onClick}>
                        {buttonText}
                    </ControlButton>
                </div>
            </div>
        </main>
    );
};
