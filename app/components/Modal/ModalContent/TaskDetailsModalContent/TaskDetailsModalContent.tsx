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
import { Comments } from '@/components/taskList-page/Comments/Comments';

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
    }, [cookieValue]);

    const isAuthor = task?.author === currentUser?.id;
    const assignedUsers = allUsers.filter((user) =>
        task?.assigned.includes(user.id)
    );

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
            <h3>Информация о событии</h3>
            <p>
                <b>Название: </b> {task?.name}
            </p>
            <p>
                <b>Автор: </b> {currentUser?.name}
            </p>
            <p>
                <b>Описание: </b> {task?.description}
            </p>
            <p>
                <b>Дата завершения: </b> {task?.end_date}
            </p>
            <p>
                <b>Добавленные пользователи: </b>
            </p>
            {assignedUsers.length > 0 ? (
                <ul>
                    {assignedUsers.map((user) => (
                        <li key={user?.id}>
                            {user?.name} ({user?.email})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет добавленных пользователей</p>
            )}
            <p>
                <b>Напоминание: </b>
                {task?.notification ? 'Да' : 'Нет'}
            </p>
            <Comments eventId={task?.id} cookieValue={cookieValue} />
            {isAuthor && (
                <div className={styles.buttonsContainer}>
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
