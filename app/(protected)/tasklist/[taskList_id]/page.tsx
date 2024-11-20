'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { getUsersTasks, getUserTaskLists } from '../../../lib/api';
import {
    setModalCurrentContent,
    setModalActive,
    type RootState,
} from '../../../store/store';
import { Modal } from '../../../components/Modal/Modal/Modal';
import { ControlButton } from '../../../components/buttons/ControlButton/ControlButton';
import Calendar from '../../../components/taskList-page/Calendar/Calendar';
import styles from './taskList.module.css';
import type { TaskList, Task } from '../../../types/types';

const TaskListPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const taskList_id: string | string[] | undefined = params.taskList_id;

    const [currentTaskList, setCurrentTaskList] = useState<TaskList | null>(
        null
    );
    const [currentTasks, setCurrentTasks] = useState<Task[]>([]);

    const token: string | undefined = Cookies.get('jwt');

    const isAdded = useSelector((state: RootState) => state.events.isAdded);

    useEffect(() => {
        const fetchTaskLists = async () => {
            try {
                const taskLists: TaskList[] = await getUserTaskLists(token);
                const allTasks: Task[] = await getUsersTasks(token);

                const currentTaskList = taskLists.find(
                    (taskList: TaskList) => taskList.id === Number(taskList_id)
                );
                setCurrentTaskList(currentTaskList || null);

                const allCurrentTasks = allTasks.filter(
                    (task: Task) =>
                        task.task_list_name === currentTaskList?.name
                );
                setCurrentTasks(allCurrentTasks);
            } catch (err) {
                console.error('Error fetching task lists:', err);
            }
        };
        fetchTaskLists();
    }, [token, taskList_id, isAdded]);

    const addNewTaskButtonClickHandler = () => {
        dispatch(setModalCurrentContent('contentAddNewTask'));
        dispatch(setModalActive(true));
    };
    return (
        <div className={styles.taskListPage}>
            <div className={styles.taskListHeader}>
                <h2>Список: {currentTaskList?.name}</h2>
                <ControlButton onClick={addNewTaskButtonClickHandler}>
                    Добавить событие
                </ControlButton>
                <br />
                <button
                    className={styles.smallButton}
                    onClick={() => router.push('/dashboard')}
                >
                    Назад
                </button>
            </div>
            <Calendar usersTasks={currentTasks} />
            <Modal cookieValue={token} />
        </div>
    );
};

export default TaskListPage;
