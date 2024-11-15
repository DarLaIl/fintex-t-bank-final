'use client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
    FcBriefcase,
    FcFullTrash,
    FcGraduationCap,
    FcHome,
    FcLike,
} from 'react-icons/fc';
import { FaPencilAlt } from 'react-icons/fa';
import { ControlButton } from '../../buttons/ControlButton/ControlButton';
import {
    setCurrentContent,
    setModalActive,
    setCurrentTaskListId,
} from '../../../store/store';
import { deleteTaskList } from '../../../lib/api';
import styles from './TaskLists.module.css';

type TaskListsProps = {
    lists: { id: number; name: string; type: string }[];
    cookieValue: string | undefined;
};

export const TaskLists: React.FC<TaskListsProps> = ({ lists, cookieValue }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const addNewListButtonClickHandler = () => {
        dispatch(setModalActive(true));
        dispatch(setCurrentContent('contentAddNewTaskList'));
    };
    const updateListButtonClickHandler = (listId: number) => {
        dispatch(setModalActive(true));
        dispatch(setCurrentContent('contentUpdateTaskList'));
        dispatch(setCurrentTaskListId(listId));
    };

    const deleteTaskListButtonClickHandler = async (
        listId: number
    ): Promise<void> => {
        try {
            await deleteTaskList(cookieValue, listId);
            router.push('/dashboard');
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Мои списки дел:</h3>
                <ControlButton onClick={addNewListButtonClickHandler}>
                    Добавить
                </ControlButton>
            </div>
            {lists?.length > 0 ? (
                <ul className={styles.lists}>
                    {lists.map((list) => (
                        <li key={list.id}>
                            <div className={styles.text}>
                                {list.type === 'Личные дела' && <FcLike />}
                                {list.type === 'Семейные дела' && <FcHome />}
                                {list.type === 'Учебные дела' && (
                                    <FcGraduationCap />
                                )}
                                {list.type === 'Рабочие дела' && (
                                    <FcBriefcase />
                                )}
                                {list.name}
                            </div>
                            <div>
                                <button
                                    className={styles.iconsButtons}
                                    onClick={() =>
                                        updateListButtonClickHandler(list.id)
                                    }
                                >
                                    <FaPencilAlt />
                                </button>
                                <button
                                    className={styles.iconsButtons}
                                    onClick={() =>
                                        deleteTaskListButtonClickHandler(
                                            list.id
                                        )
                                    }
                                >
                                    <FcFullTrash />
                                </button>
                                <button className={styles.details}>
                                    Подробнее
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Здесь пока ничего нет</p>
            )}
        </div>
    );
};
function currentTaskListId(): any {
    throw new Error('Function not implemented.');
}
