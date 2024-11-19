import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setModalActive } from '../../../../store/store';
import { updateUserProfile, uploadUserAvatar } from '../../../../lib/api';
import { ControlButton } from '../../../buttons/ControlButton/ControlButton';
import styles from '../ModalContent.module.css';
import type { СookieProps } from '../../../../types/types';

export const ChangeUserInfoModalContent: React.FC<СookieProps> = ({
    cookieValue,
}) => {
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [error, setError] = useState<string>('');

    const router = useRouter();
    const dispatch = useDispatch();

    const updateUserButtonClickHandler = async () => {
        const formData = new FormData();

        if (avatar) {
            formData.append('file', avatar);
        }
        try {
            await updateUserProfile(cookieValue, name, lastname);
            await uploadUserAvatar(cookieValue, formData);
            setAvatar(null);
        } catch (err) {
            console.error('Update failed:', err);
            setError('Update failed. Please try again.');
        } finally {
            setName('');
            setLastname('');
            setError('');
            dispatch(setModalActive(false));
            router.push('/dashboard');
        }
    };

    const handleFileChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setAvatar(selectedFile);
        }
    };

    return (
        <div className={styles.contentContainer}>
            <h4>Изменить данные профиля:</h4>
            {error && <p>{error}</p>}
            <input
                className={styles.inputText}
                placeholder="Имя"
                type="text"
                id="userFirstName"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className={styles.inputText}
                placeholder="Фамилия"
                type="text"
                id="userLastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            <div>
                <span>Установите аватар:</span>
                <label className={styles.fileLabel}>
                    <span className={styles.fileLabelText}>
                        {avatar?.name || 'Выберите файл'}
                    </span>
                    <input
                        type="file"
                        onChange={handleFileChangeHandler}
                        className={styles.inputFile}
                    />
                </label>
            </div>
            <ControlButton onClick={updateUserButtonClickHandler}>
                Сохранить
            </ControlButton>
        </div>
    );
};
