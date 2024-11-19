import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    setCurrentTask,
    setIsAdded,
    setModalActive,
    setModalCurrentContent,
} from '../../../../store/store';
import { deleteTask, getAllUser, getUserProfile } from '../../../../lib/api';
import styles from '../ModalContent.module.css';
import type { User, Task, TaskProps } from '../../../../types/types';

export const TaskDetailsModalContent: React.FC<TaskProps> = ({
    cookieValue,
    task,
}) => {
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const allUsers = await getAllUser(cookieValue);
                const currentUser = await getUserProfile(cookieValue);
                setAllUsers(allUsers);
                setCurrentUser(currentUser);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchAllUsers();
    }, []);

    const isAuthor = task?.author === currentUser?.id;

    const updateTaskButtonClickHandler = (task: Task | null) => {
        dispatch(setCurrentTask(task));
        dispatch(setModalActive(true));
        dispatch(setModalCurrentContent('contentUpdateTask'));
    };

    const deleteTaskButtonClickHandler = async (
        task_id: number | undefined
    ) => {
        try {
            await deleteTask(cookieValue, task_id);
        } catch (err) {
            console.error('Update failed:', err);
        } finally {
            dispatch(setModalActive(false));
            dispatch(setIsAdded());
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
                    <strong>Добавленные пользователи:</strong>
                </p>
                <ul>
                    {allUsers
                        .filter((user) => task?.assigned.includes(user.id))
                        .map((user) => (
                            <li key={user?.id}>
                                {user?.name} ({user?.email})
                            </li>
                        ))}
                </ul>
                <p>
                    <strong>Напоминание:</strong>
                    {task?.notification ? 'Да' : 'Нет'}
                </p>
            </div>
            {isAuthor && (
                <div>
                    <button
                        className={styles.editButton}
                        onClick={() => updateTaskButtonClickHandler(task)}
                    >
                        Изменить
                    </button>
                    <button
                        className={styles.deleteButton}
                        onClick={() => deleteTaskButtonClickHandler(task?.id)}
                    >
                        Удалить
                    </button>
                </div>
            )}
        </div>
    );
};
