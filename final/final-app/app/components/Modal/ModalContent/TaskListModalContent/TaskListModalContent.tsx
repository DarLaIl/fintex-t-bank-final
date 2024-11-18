import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { type RootState, setModalActive } from '../../../../store/store';
import { createNewTaskList, updateTaskList } from '../../../../lib/api';
import { ControlButton } from '../../../buttons/ControlButton/ControlButton';
import styles from '../ModalContent.module.css';

export type TaskListModalContentProps = {
    cookieValue: string | undefined;
    update: boolean;
    title: string;
};

export const TaskListModalContent: React.FC<TaskListModalContentProps> = ({
    cookieValue,
    title,
    update,
}) => {
    const [listName, setListName] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [error, setError] = useState<string>('');

    const router = useRouter();
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);

    const AddNewTaskListButtonClickHandler = async () => {
        try {
            await createNewTaskList(cookieValue, listName, type);
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Upload failed. Please try again.');
        } finally {
            setListName('');
            setType('');
            setError('');
            dispatch(setModalActive(false));
            router.push('/dashboard');
        }
    };
    const updateTaskListButtonClickHandler = async () => {
        try {
            await updateTaskList(
                cookieValue,
                listName,
                type,
                modal.currentTaskListId
            );
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Upload failed. Please try again.');
        } finally {
            setListName('');
            setType('');
            setError('');
            dispatch(setModalActive(false));
            router.push('/dashboard');
        }
    };

    return (
        <div className={styles.contentContainer}>
            <h4>{title}</h4>
            {error && <p>{error}</p>}
            <input
                className={styles.inputText}
                placeholder="Название списка"
                type="text"
                id="listName"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
            />
            <label className={styles.label}>
                Выберите тип списка:
                <select
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={styles.select}
                >
                    <option value="" disabled>
                        Выберите
                    </option>
                    <option value="Личные дела">Личные дела</option>
                    <option value="Семейные дела">Семейные дела</option>
                    <option value="Учебные дела">Учебные дела</option>
                    <option value="Рабочие дела">Рабочие дела</option>
                </select>
            </label>

            {!update && (
                <ControlButton onClick={AddNewTaskListButtonClickHandler}>
                    Добавить
                </ControlButton>
            )}
            {update && (
                <ControlButton onClick={updateTaskListButtonClickHandler}>
                    Изменить
                </ControlButton>
            )}
        </div>
    );
};
