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
            {filteredTasks.map((task) => (
                <div key={task.id} className={styles.taskItem}>
                    <h4>Название: {task.name}</h4>
                    <p>
                        <b>Описание</b>: {task.description}
                    </p>
                    <p>
                        <b>Дата дедлайна</b>: {task.end_date}
                    </p>
                    <p>
                        <b>Нужно напоминать о дедлайне</b>:{' '}
                        {task.notification ? 'Напоминать' : 'Не напоминать'}
                    </p>
                    <button
                        className={styles.smallButton}
                        onClick={() => checkDetailButtonClickHandler(task)}
                    >
                        Подробнее
                    </button>
                </div>
            ))}
        </>
    );
};
