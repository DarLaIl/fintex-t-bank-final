import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import { setIsAdded, setModalActive } from '../../../../store/store';
import { createNewTask, deleteTask } from '../../../../lib/api';
import { ControlButton } from '../../../buttons/ControlButton/ControlButton';
import type { ModalProps } from '../../Modal/Modal';
import styles from '../ModalContent.module.css';
import { Task } from '@/(protected)/tasklist/[taskList_id]/page';

type TaskProps = {
    cookieValue?: string;
    task: Task | null;
};
export const TaskDetailsModalContent: React.FC<TaskProps> = ({
    cookieValue,
    task,
}) => {
    const dispatch = useDispatch();

    console.log(task?.id);
    const deleteTaskButtonClickHandler = async (task_id) => {
        try {
            await deleteTask(cookieValue, task_id);
        } catch (err) {
            console.error('Update failed:', err);
        } finally {
            dispatch(setModalActive(false));
        }
    };

    return (
        <div className={styles.contentContainer}>
            <div>
                <h4>Информация о событии {task?.name}</h4>
                <p>
                    <strong>Название:</strong> {task?.name}
                </p>
                <p>
                    <strong>Описание:</strong> {task?.description}
                </p>
                <p>
                    <strong>Дата завершения:</strong> {task?.end_date}
                </p>
                <p>
                    <strong>Напоминание:</strong>
                    {task?.notification ? 'Да' : 'Нет'}
                </p>
            </div>
            <div>
                <button className={styles.editButton}>Изменить</button>
                <button
                    className={styles.deleteButton}
                    onClick={() => deleteTaskButtonClickHandler(task?.id)}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};
