import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import { setIsAdded, setModalActive } from '../../../../store/store';
import { createNewTask } from '../../../../lib/api';
import { ControlButton } from '../../../buttons/ControlButton/ControlButton';
import type { ModalProps } from '../../Modal/Modal';
import styles from '../ModalContent.module.css';

export const CreateNewTaskModalContent: React.FC<ModalProps> = ({
    cookieValue,
}) => {
    const [name, setName] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    //const [assigned, setAssigned] = useState<number[]>([]);
    const [notification, setNotification] = useState<boolean>(false);

    const params = useParams();
    const taskList_id = params.taskList_id;
    const dispatch = useDispatch();

    const CreateNewTaskButtonClickHandler = async () => {
        try {
            await createNewTask(
                cookieValue,
                name,
                endDate,
                description,
                notification,
                Number(taskList_id)
            );
            dispatch(setIsAdded());
        } catch (err) {
            console.error('Update failed:', err);
        } finally {
            dispatch(setModalActive(false));
        }
    };

    return (
        <div className={styles.contentContainer}>
            <h4>Добавить событие</h4>
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
            <label htmlFor="checkbox">
                Напоминание
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={notification}
                    onChange={(e) => setNotification(!notification)}
                />
            </label>
            <ControlButton onClick={CreateNewTaskButtonClickHandler}>
                Сохранить
            </ControlButton>
        </div>
    );
};
