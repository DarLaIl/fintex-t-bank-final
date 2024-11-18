'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setModalActive } from '../../../store/store';
import { ChangeUserInfoModalContent } from '../ModalContent/ChangeUserInfoModalContent/ChangeUserInfoModalContent';
import { TaskListModalContent } from '../ModalContent/TaskListModalContent/TaskListModalContent';
import { CreateNewTaskModalContent } from '../ModalContent/CreateNewTaskModalContent/CreateNewTaskModalContent';
import type { RootState } from '../../../store/store';
import styles from './Modal.module.css';
import { TaskDetailsModalContent } from '../ModalContent/TaskDetailsModalContent/TaskDetailsModalContent';

export type ModalProps = {
    cookieValue?: string;
};

export const Modal: React.FC<ModalProps> = ({ cookieValue }) => {
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
            case 'contentAddNewTask':
                return (
                    <CreateNewTaskModalContent
                        cookieValue={cookieValue}
                        update={false}
                    />
                );

            case 'contentUpdateTask':
                return (
                    <CreateNewTaskModalContent
                        cookieValue={cookieValue}
                        update
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
