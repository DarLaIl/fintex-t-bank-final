import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {} from '../../../lib/api';
import { Modal } from '../../../components/Modal/Modal/Modal';
import Calendar from '../../../components/taskList-page/Calendar/Calendar';
import styles from './taskList.module.css';

const TaskList = async () => {
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get('jwt')?.value;

    if (token) {
        try {
            //const userPromise = getUserProfile(token);
            //const taskListsPromise = getUserTaskLists(token);
            //const holidaysPromise = getHolidays();
            //const [user, taskLists, holidaysToday] = await Promise.all([
            //        userPromise,
            //        taskListsPromise,
            //        holidaysPromise,
            //    ]);
            return (
                <div className={styles.taskListPage}>
                    <Calendar />
                    <Modal cookieValue={token} />
                </div>
            );
        } catch (err) {
            console.error('Error fetching profile:', err);
            redirect('/login');
        }
    } else {
        redirect('/login');
    }
};

export default TaskList;
