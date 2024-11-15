'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setModalActive } from '../../../store/store';
import { ChangeUserInfoModalContent } from '../ModalContent/ChangeUserInfoModalContent/ChangeUserInfoModalContent';
import { TaskListModalContent } from '../ModalContent/TaskListModalContent/TaskListModalContent';
import type { RootState } from '../../../store/store';
import styles from './Modal.module.css';

export type ModalProps = {
    cookieValue?: string;
};

export const Modal: React.FC<ModalProps> = ({ cookieValue }) => {
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);

    const renderContent = () => {
        switch (modal.currentContent) {
            case 'contentUpdateUser':
                return <ChangeUserInfoModalContent cookieValue={cookieValue} />;
            case 'contentAddNewTaskList':
                return (
                    <TaskListModalContent
                        cookieValue={cookieValue}
                        title={'Добавить новый список:'}
                        update={false}
                    />
                );
            case 'contentUpdateTaskList':
                return (
                    <TaskListModalContent
                        cookieValue={cookieValue}
                        title={'Изменить список:'}
                        update
                    />
                );
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
