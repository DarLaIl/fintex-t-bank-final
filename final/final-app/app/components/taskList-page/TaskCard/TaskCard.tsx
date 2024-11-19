import { useDispatch } from 'react-redux';
import {
    setCurrentTask,
    setModalActive,
    setModalCurrentContent,
} from '@/store/store';
import type { Task, TaskCardProps } from '../../../types/types';
import styles from '../Calendar/Calendar.module.css';

export const TaskCard: React.FC<TaskCardProps> = ({ filteredTasks }) => {
    const dispatch = useDispatch();

    const checkDetailButtonClickHandler = (task: Task) => {
        dispatch(setCurrentTask(task));
        dispatch(setModalActive(true));
        dispatch(setModalCurrentContent('contentTaskDetails'));
    };
    return (
        <>
            {filteredTasks.map((task, index) => (
                <div key={index} className={styles.taskItem}>
                    <h4>Название: {task.name}</h4>
                    <p>
                        <strong>Описание</strong>: {task.description}
                    </p>
                    <p>
                        <strong>Дата дедлайна</strong>: {task.end_date}
                    </p>
                    <p>
                        <strong>Нужно напоминать о дедлайне</strong>:{' '}
                        {task.notification ? 'Напоминать' : 'Не напоминать'}
                    </p>
                    <button
                        className={styles.smallButton}
                        onClick={(task) => checkDetailButtonClickHandler}
                    >
                        Подробнее
                    </button>
                </div>
            ))}
        </>
    );
};
