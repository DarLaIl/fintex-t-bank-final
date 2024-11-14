import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserProfile } from '../lib/api';

import { UserInfo } from '../components/dashboard-page/UserInfo/UserInfo';
import { Avatar } from '../components/dashboard-page/Avatar/Avatar';
import { ProfileHeader } from '../components/dashboard-page/ProfileHeader/ProfileHeader';
import { TasksLists } from '../components/dashboard-page/TasksLists/TasksListList';
import { SharedTasks } from '../components/dashboard-page/SharedTasks/SharedTasks';
import { HolidaysToday } from '../components/dashboard-page/HolidaysToday/HolidaysToday';
import { Modal } from '../components/Modal/ModalContent/Modal/Modal';
import styles from './Dashboard.module.css';

const Dashboard = async () => {
    let user;
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get('jwt')?.value;

    if (!token) {
        redirect('/login');
    }

    try {
        user = await getUserProfile(token);
    } catch (err) {
        console.error('Error fetching profile:', err);
        redirect('/login');
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
                <div>
                    <ProfileHeader />
                    <div className={styles.userInfoData}>
                        <Avatar user={user} cookieValue={token} />
                        <UserInfo user={user} />
                    </div>
                </div>
                <div>
                    <div>
                        <TasksLists lists={taskLists} />
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
