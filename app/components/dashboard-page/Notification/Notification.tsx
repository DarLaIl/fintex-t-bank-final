'use client';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Task, СookieProps } from '../../../types/types';
import { useEffect } from 'react';
import { getTasksToday } from '@/lib/api';
import styles from './Notification.module.css';

export const Notification: React.FC<СookieProps> = ({ cookieValue }) => {
    useEffect(() => {
        const fetchTaskDueToday = async () => {
            const tasksDueToday = await getTasksToday(cookieValue);
            if (tasksDueToday.length > 0) {
                toast.warn(
                    <div>
                        <p>Сегодня последний день для события</p>
                        <ol className={styles.lists}>
                            {tasksDueToday.map((task: Task) => (
                                <li key={task.id}>
                                    <p>Название: {task.name}</p>
                                    <p>Описание: {task.description}</p>
                                </li>
                            ))}
                        </ol>
                    </div>,
                    {
                        position: 'bottom-right',
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'light',
                    }
                );
            }
        };
        fetchTaskDueToday();
    }, [cookieValue]);

    return (
        <ToastContainer
            position="bottom-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
        />
    );
};
