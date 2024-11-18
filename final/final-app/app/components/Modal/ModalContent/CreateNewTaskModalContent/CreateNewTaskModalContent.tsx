import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState, setIsAdded, setModalActive } from '../../../../store/store';
import { createNewTask, getAllUser, updateTask } from '../../../../lib/api';
import { ControlButton } from '../../../buttons/ControlButton/ControlButton';
import type { ModalProps } from '../../Modal/Modal';
import styles from '../ModalContent.module.css';

type User = {
    id: number;
    email: string;
    name: string;
};

type TaskModalContentProps = {
    cookieValue: string | undefined;
    update: boolean;
};
export const CreateNewTaskModalContent: React.FC<TaskModalContentProps> = ({
    cookieValue,
    update,
}) => {
    const [name, setName] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [assigned, setAssigned] = useState<string[]>([]);
    const [notification, setNotification] = useState<boolean>(false);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const params = useParams();
    const taskList_id = params.taskList_id;
    const dispatch = useDispatch();

    const events = useSelector((state: RootState) => state.events);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const allUsers = await getAllUser(cookieValue);
                setAllUsers(allUsers);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchAllUsers();
    }, []);

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
            dispatch(setModalActive(false));
        }
    };

    const updateTaskButtonClickHandler = async () => {
        try {
            console.log(assigned.map((userId) => Number(userId)));
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
            dispatch(setModalActive(false));
        }
    };

    const assignedChangeHandler = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const values = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        console.log('Selected users:', values);
        setAssigned(values);
    };

    return (
        <div className={styles.contentContainer}>
            <h4>{update ? 'Изменить событие' : 'Добавить событие'}</h4>
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
            <label>
                Дата окончания:
                <br />
                <input
                    className={styles.inputText}
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </label>
            <label className={styles.label}>
                Добавить исполнителя:
                <select
                    name="assigned"
                    multiple={true}
                    value={assigned}
                    onChange={assignedChangeHandler}
                    className={styles.select}
                >
                    <option value="" disabled>
                        Выберите
                    </option>
                    {allUsers.length > 0 &&
                        allUsers.map((user) => (
                            <option key={user?.id} value={user?.id.toString()}>
                                {user?.name}({user?.email})
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
                    onChange={(e) => setNotification(!notification)}
                />
            </label>
            {!update && (
                <ControlButton onClick={CreateNewTaskButtonClickHandler}>
                    Добавить
                </ControlButton>
            )}
            {update && (
                <ControlButton onClick={updateTaskButtonClickHandler}>
                    Изменить
                </ControlButton>
            )}
        </div>
    );
};
