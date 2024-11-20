import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
    getAssignedTasks,
    getUserProfile,
    getUserTaskLists,
} from '../../lib/api';
import { UserInfo } from '../../components/dashboard-page/UserInfo/UserInfo';
import { Avatar } from '../../components/dashboard-page/Avatar/Avatar';
import { ProfileHeader } from '../../components/dashboard-page/ProfileHeader/ProfileHeader';
import { TaskLists } from '../../components/dashboard-page/TasksLists/TasksLists';
import { SharedTasks } from '../../components/dashboard-page/SharedTasks/SharedTasks';
import { Modal } from '../../components/Modal/Modal/Modal';
import { Notification } from '../../components/dashboard-page/Notification/Notification';
import styles from './Dashboard.module.css';

const Dashboard = async () => {
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get('jwt')?.value;

    if (!token) {
        redirect('/login');
    }

    let user = null;
    let taskLists = [];
    let assignedTasks = [];

    try {
        const [fetchedUser, fetchedTaskLists, fetchedAssignedTasks] =
            await Promise.all([
                getUserProfile(token),
                getUserTaskLists(token),
                getAssignedTasks(token),
            ]);

        user = fetchedUser;
        taskLists = fetchedTaskLists;
        assignedTasks = fetchedAssignedTasks;
    } catch (err) {
        console.error('Error fetching profile:', err);
        redirect('/login');
    }

    return (
        <div className={styles.profilePage}>
            <div className={styles.userInfo}>
                <ProfileHeader />
                <div className={styles.userInfoData}>
                    <Avatar user={user} cookieValue={token} />
                    <UserInfo user={user} />
                </div>
            </div>
            <div className={styles.userTasks}>
                <TaskLists lists={taskLists} cookieValue={token} />
                <SharedTasks tasks={assignedTasks} />
            </div>
            <Notification cookieValue={token} />
            <Modal cookieValue={token} />
        </div>
    );
};

export default Dashboard;
