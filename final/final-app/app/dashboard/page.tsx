import { cookies } from 'next/headers';
import { getUserProfile } from '../lib/api';

import { UserInfo } from '../components/dashboard/UserInfo';
import { Avatar } from '../components/dashboard/Avatar';
import { ProfileHeader } from '../components/dashboard/ProfileHeader';
import { TasksListList } from '../components/dashboard/TasksListList';
import { SharedTasks } from '../components/dashboard/SharedTasks';
import { HolidaysToday } from '../components/dashboard/HolidaysToday';
import { Modal } from '@/components/utils/Modal';
import styles from '../../styles/Dashboard.module.css';

const Dashboard = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;
    let user = null;

    if (token) {
        user = await getUserProfile(token);
    }

    const taskLists = [
        { id: 1, name: 'Рабочие дела' },
        { id: 2, name: 'Личные дела' },
        { id: 3, name: 'Семейные дела' },
    ];
    const sharedTasks = [{ task: 'Сделать проект', date: '21.11.24' }];
    const holidaysToday = ['День мороженого'];

    return (
        <>
            <main className={styles.profilePage}>
                <div className={styles.userInfo}>
                    <ProfileHeader />
                    <div className={styles.userInfoData}>
                        <Avatar />
                        <UserInfo user={user} />
                    </div>
                </div>
                <div>
                    <div>
                        <TasksListList lists={taskLists} />
                        <SharedTasks tasks={sharedTasks} />
                    </div>
                    <HolidaysToday holidays={holidaysToday} />
                </div>
                <Modal cookieValue={token} />
            </main>
        </>
    );
};

export default Dashboard;
