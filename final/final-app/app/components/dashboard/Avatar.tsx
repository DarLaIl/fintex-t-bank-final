import Image from 'next/image';
import styles from '../../../styles/Dashboard.module.css';

export const Avatar = () => {
    return (
        <div className={styles.avatar}>
            <Image
                src="/cactus-avatar.png"
                width={100}
                height={100}
                alt="User avatar"
            />
        </div>
    );
};
