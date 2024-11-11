import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ModalProps } from '../utils/Modal';
import { setModalActive } from '../../store/store';
import { updateUserProfile } from '../../lib/api';
import styles from '../../../styles/Modal.module.css';

export const ChangeUserInfoModalContent: React.FC<ModalProps> = ({
    cookieValue,
}) => {
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [error, setError] = useState<string>('');

    const router = useRouter();
    const dispatch = useDispatch();

    const updateUserButtonClickHandler = async () => {
        try {
            await updateUserProfile(cookieValue, name, lastname);
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Please try again.');
        } finally {
            dispatch(setModalActive(false));
            router.push('/dashboard');
        }
    };

    return (
        <div className={styles.contentContainer}>
            <h4>Изменить данные профиля:</h4>
            {error && <p>{error}</p>}
            <input
                placeholder="Имя"
                type="text"
                id="userFirstName"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Фамилия"
                type="text"
                id="userLastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            <button
                className={styles.controlBtn}
                onClick={updateUserButtonClickHandler}
            >
                Сохранить
            </button>
        </div>
    );
};
