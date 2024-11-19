'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setModalActive } from '../../../store/store';
import { ChangeUserInfoModalContent } from '../ModalContent/ChangeUserInfoModalContent/ChangeUserInfoModalContent';
import { TaskListModalContent } from '../ModalContent/TaskListModalContent/TaskListModalContent';
import { CreateNewTaskModalContent } from '../ModalContent/CreateNewTaskModalContent/CreateNewTaskModalContent';
import styles from './Modal.module.css';
import { TaskDetailsModalContent } from '../ModalContent/TaskDetailsModalContent/TaskDetailsModalContent';
import type { RootState } from '../../../store/store';
import type { СookieProps } from '../../../types/types';

export const Modal: React.FC<СookieProps> = ({ cookieValue }) => {
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);
    const events = useSelector((state: RootState) => state.events);

    const renderContent = () => {
        switch (modal.modalCurrentContent) {
            case 'contentUpdateUser':
                return <ChangeUserInfoModalContent cookieValue={cookieValue} />;
            case 'contentAddNewTaskList':
                return (
                    <TaskListModalContent
                        cookieValue={cookieValue}
                        title={'Добавить новый список:'}
                        shouldUpdate={false}
                    />
                );
            case 'contentUpdateTaskList':
                return (
                    <TaskListModalContent
                        cookieValue={cookieValue}
                        title={'Изменить список:'}
                        shouldUpdate
                    />
                );
            case 'contentAddNewTask':
                return (
                    <CreateNewTaskModalContent
                        cookieValue={cookieValue}
                        shouldUpdate={false}
                    />
                );
            case 'contentUpdateTask':
                return (
                    <CreateNewTaskModalContent
                        cookieValue={cookieValue}
                        shouldUpdate
                    />
                );
            case 'contentTaskDetails':
                return (
                    <TaskDetailsModalContent
                        task={events.currentTask}
                        cookieValue={cookieValue}
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
