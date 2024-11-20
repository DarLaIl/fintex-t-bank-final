'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setModalActive } from '../../../store/store';
import styles from './Modal.module.css';
import type { RootState } from '../../../store/store';
import type { СookieProps } from '../../../types/types';
import { RenderContent } from '../ModalContent/RenderContent';

export const Modal: React.FC<СookieProps> = ({ cookieValue }) => {
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);

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
                <RenderContent cookieValue={cookieValue} />
            </div>
        </div>
    );
};
