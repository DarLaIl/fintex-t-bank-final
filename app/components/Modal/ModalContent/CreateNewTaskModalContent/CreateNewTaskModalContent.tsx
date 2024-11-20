import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import {
    type RootState,
    setIsAdded,
    setModalActive,
} from '../../../../store/store';
import {
    createNewTask,
    getAllUser,
    getUserProfile,
    updateTask,
} from '../../../../lib/api';
import { ControlButton } from '../../../buttons/ControlButton/ControlButton';
import type { User, TaskModalContentProps } from '../../../../types/types';
import styles from '../ModalContent.module.css';

export const CreateNewTaskModalContent: React.FC<TaskModalContentProps> = ({
    cookieValue,
    shouldUpdate,
}) => {
    const [name, setName] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [assigned, setAssigned] = useState<string[]>([]);
    const [notification, setNotification] = useState<boolean>(false);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const params = useParams();
    const { taskList_id } = params;
    const dispatch = useDispatch();

    const events = useSelector((state: RootState) => state.events);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const allUsers = await getAllUser(cookieValue);
                const userProfile = await getUserProfile(cookieValue);
                setAllUsers(allUsers);
                setCurrentUser(userProfile);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchAllUsers();
    }, [cookieValue]);

    const resetState = () => {
        dispatch(setModalActive(false));
        setName('');
        setDescription('');
        setEndDate('');
        setNotification(false);
    };

    const CreateNewTaskButtonClickHandler = async () => {
        try {
            await createNewTask(
                cookieValue,
                name,
                endDate,
                description,
                notification,
                assigned.map((userId) => Number(userId)),
                Number(taskList_id)
            );
            dispatch(setIsAdded());
        } catch (err) {
            console.error('Update failed:', err);
        } finally {
            resetState();
        }
    };

    const updateTaskButtonClickHandler = async () => {
        try {
            await updateTask(
                cookieValue,
                name,
                endDate,
                description,
                notification,
                assigned.map((userId) => Number(userId)),
                events.currentTask?.id
            );
            dispatch(setIsAdded());
        } catch (err) {
            console.error('Update failed:', err);
        } finally {
            resetState();
        }
    };

    const assignedChangeHandler = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const values = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        setAssigned(values);
    };

    return (
        <div className={styles.contentContainer}>
            <h4>{shouldUpdate ? 'Изменить событие' : 'Добавить событие'}</h4>
            <input
                className={styles.inputText}
                placeholder="Название"
                type="text"
                id="TaskName"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className={styles.inputText}
                placeholder="Описание"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <span>Дата окончания:</span>
            <input
                className={styles.inputText}
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <span>Добавить исполнителя:</span>
            <label className={styles.label}>
                <select
                    name="assigned"
                    multiple={true}
                    value={assigned}
                    onChange={assignedChangeHandler}
                    className={styles.selectMulti}
                >
                    <option value="" disabled>
                        Выберите
                    </option>
                    {allUsers
                        .filter((user) => user.id !== currentUser?.id)
                        .map((user) => (
                            <option key={user.id} value={user.id.toString()}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                </select>
            </label>
            <label htmlFor="checkbox">
                Напоминание
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={notification}
                    onChange={() => setNotification(!notification)}
                />
            </label>
            {!shouldUpdate && (
                <ControlButton onClick={CreateNewTaskButtonClickHandler}>
                    Добавить
                </ControlButton>
            )}
            {shouldUpdate && (
                <ControlButton onClick={updateTaskButtonClickHandler}>
                    Изменить
                </ControlButton>
            )}
        </div>
    );
};
