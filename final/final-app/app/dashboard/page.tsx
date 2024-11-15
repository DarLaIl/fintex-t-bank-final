import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getHolidays, getUserProfile, getUserTaskLists } from '../lib/api';

import { UserInfo } from '../components/dashboard-page/UserInfo/UserInfo';
import { Avatar } from '../components/dashboard-page/Avatar/Avatar';
import { ProfileHeader } from '../components/dashboard-page/ProfileHeader/ProfileHeader';
import { TaskLists } from '../components/dashboard-page/TasksLists/TasksListList';
import { SharedTasks } from '../components/dashboard-page/SharedTasks/SharedTasks';
import { HolidaysToday } from '../components/dashboard-page/HolidaysToday/HolidaysToday';
import { Modal } from '../components/Modal/Modal/Modal';
import styles from './Dashboard.module.css';

const Dashboard = async () => {
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get('jwt')?.value;

    if (token) {
        try {
            const userPromise = getUserProfile(token);
            const taskListsPromise = getUserTaskLists(token);
            const holidaysPromise = getHolidays();
            const [user, taskLists, holidaysToday] = await Promise.all([
                userPromise,
                taskListsPromise,
                holidaysPromise,
            ]);
            const sharedTasks = [{ task: 'Сделать проект', date: '21.11.24' }];

            return (
                <main className={styles.profilePage}>
                    <div className={styles.userInfo}>
                        <ProfileHeader />
                        <div className={styles.userInfoData}>
                            <Avatar user={user} cookieValue={token} />
                            <UserInfo user={user} />
                        </div>
                    </div>
                    <div className={styles.userTasks}>
                        <TaskLists lists={taskLists} cookieValue={token} />
                        <SharedTasks tasks={sharedTasks} />
                        <HolidaysToday holidays={holidaysToday} />
                    </div>
                    <Modal cookieValue={token} />
                </main>
            );
        } catch (err) {
            console.error('Error fetching profile:', err);
            redirect('/login');
        }
    } else {
        redirect('/login');
    }
};

export default Dashboard;
