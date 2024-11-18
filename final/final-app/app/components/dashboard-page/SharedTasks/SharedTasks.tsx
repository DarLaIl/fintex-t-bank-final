'use client';
import {
    setCurrentTask,
    setModalActive,
    setModalCurrentContent,
} from '@/store/store';
import { useDispatch } from 'react-redux';
import styles from '../../../(protected)/tasklist/[taskList_id]/taskList.module.css';

export type Task = {
    id: number;
    name: string;
    end_date: string;
    description: string;
    assigned: number[];
    author: number;
    notification: boolean;
    is_completed: boolean;
    task_list_id: number;
    task_list_name: string;
};

type SharedTasksProps = {
    tasks: Task[];
};

export const SharedTasks: React.FC<SharedTasksProps> = ({ tasks }) => {
    const dispatch = useDispatch();

    const checkDetailButtonClickHandler = (task: Task) => {
        dispatch(setCurrentTask(task));
        dispatch(setModalActive(true));
        dispatch(setModalCurrentContent('contentTaskDetails'));
    };

    return (
        <div>
            <h3>Совместные дела:</h3>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task?.id}>
                            <p>
                                <strong>Название:</strong>
                                {task.name}
                            </p>
                            <p>
                                <strong>Дата окончания:</strong>
                                {task.end_date}
                            </p>
                            <p>
                                <strong>Описание:</strong> {task.description}
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
