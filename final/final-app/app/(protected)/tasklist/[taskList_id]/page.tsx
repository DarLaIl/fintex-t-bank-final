'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { getUsersTasks, getUserTaskLists } from '../../../lib/api';
import {
    setModalCurrentContent,
    setModalActive,
    RootState,
} from '../../../store/store';
import { Modal } from '../../../components/Modal/Modal/Modal';
import { ControlButton } from '../../../components/buttons/ControlButton/ControlButton';
import Calendar from '../../../components/taskList-page/Calendar/Calendar';
import styles from './taskList.module.css';

export type TaskList = {
    id: number;
    name: string;
    type: string;
};

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

const TaskList = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const taskList_id = params.taskList_id;

    const [currentTaskList, setCurrentTaskList] = useState<TaskList | null>(
        null
    );
    const [currentTasks, setCurrentTasks] = useState<Task[]>([]);

    const token: string | undefined = Cookies.get('jwt');

    useEffect(() => {
        const fetchTaskLists = async () => {
            try {
                const taskLists = await getUserTaskLists(token);
                const allTasks = await getUsersTasks(token);

                const currentTaskList = taskLists.find(
                    (taskList: TaskList) => taskList.id === Number(taskList_id)
                );
                setCurrentTaskList(currentTaskList);

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
    }, [taskList_id, useSelector((state: RootState) => state.events.isAdded)]);

    const addNewTaskButtonClickHandler = () => {
        dispatch(setModalCurrentContent('contentAddNewTask'));
        dispatch(setModalActive(true));
    };
    return (
        <div className={styles.taskListPage}>
            <div>
                <h2>Список: {currentTaskList?.name}</h2>
                <ControlButton onClick={addNewTaskButtonClickHandler}>
                    Добавить событие
                </ControlButton>
            </div>
            <Calendar usersTasks={currentTasks} />
            <Modal cookieValue={token} />
        </div>
    );
};

export default TaskList;
