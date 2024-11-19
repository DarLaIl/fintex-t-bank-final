'use client';
import SwitchBar from '../SwitchBar/SwitchBar';
import { ControlButton } from '../../buttons/ControlButton/ControlButton';
import styles from './AuthWrapper.module.css';
import type { AuthWrapperProps } from '../../../types/types';

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
