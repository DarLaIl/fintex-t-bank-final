'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setCurrentContent, setModalActive } from '../../../store/store';
import styles from './EditUserInfoButton.module.css';

export const EditUserInfoButton = () => {
    const dispatch = useDispatch();

    const updateUserProfileButtonClick = () => {
        dispatch(setModalActive(true));
        dispatch(setCurrentContent('contentUpdateUser'));
    };
    return (
        <button
            title="редактировать профиль"
            onClick={updateUserProfileButtonClick}
            className={styles.editUserInfoButton}
        >
            <Image src="/pencil.png" width={30} height={30} alt="plant" />
        </button>
    );
};
