'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setModalActive } from '../../../../store/store';
import { ChangeUserInfoModalContent } from '../ChangeUserInfoModalContent/ChangeUserInfoModalContent';
import type { RootState } from '../../../../store/store';
import styles from './Modal.module.css';

export type ModalProps = {
    cookieValue: string | undefined;
};

export const Modal: React.FC<ModalProps> = ({ cookieValue }) => {
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);

    const renderContent = () => {
        switch (modal.currentContent) {
            case 'contentUpdateUser':
                return <ChangeUserInfoModalContent cookieValue={cookieValue} />;

            default:
                return null;
        }
    };

    return (
        <div data-is-active={modal.isActive} className={styles.modal}>
            <div
                data-is-active={modal.isActive}
                className={styles.modalContent}
            >
                <button
                    className={styles.modalBtn}
                    onClick={() => dispatch(setModalActive(false))}
                >
                    ✘
                </button>
                {renderContent()}
            </div>
        </div>
    );
};
