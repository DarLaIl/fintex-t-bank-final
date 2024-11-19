'use client';
import {
    setCurrentTask,
    setModalActive,
    setModalCurrentContent,
} from '@/store/store';
import { useDispatch } from 'react-redux';
import styles from '../../../(protected)/dashboard/Dashboard.module.css';
import type { Task, SharedTasksProps } from '@/types/types';

export const SharedTasks: React.FC<SharedTasksProps> = ({ tasks }) => {
    const dispatch = useDispatch();

    const checkDetailButtonClickHandler = (task: Task) => {
        dispatch(setCurrentTask(task));
        dispatch(setModalActive(true));
        dispatch(setModalCurrentContent('contentTaskDetails'));
    };

    return (
        <div className={styles.SharedTasksContainer}>
            <h3>Совместные дела:</h3>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task?.id}>
                            <p>
                                <b>Название:</b>
                                {task.name}
                            </p>
                            <p>
                                <b>Дата окончания:</b>
                                {task.end_date}
                            </p>
                            <p>
                                <b>Описание:</b> {task.description}
                            </p>
                            <button
                                className={styles.smallButton}
                                onClick={() =>
                                    checkDetailButtonClickHandler(task)
                                }
                            >
                                Подробнее
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Здесь пока ничего нет</p>
            )}
        </div>
    );
};
