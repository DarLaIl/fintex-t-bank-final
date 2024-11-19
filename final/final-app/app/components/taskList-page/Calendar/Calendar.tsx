import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
    setCurrentTask,
    setModalActive,
    setModalCurrentContent,
} from '@/store/store';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './Calendar.module.css';
import type { Task, Event, CalendarProps } from '../../../types/types';

export default function Calendar({ usersTasks }: CalendarProps) {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    const events: Event[] = usersTasks.map((usersTask) => ({
        title: usersTask.name,
        start: `${usersTask.end_date}T00:00:00`,
        end: `${usersTask.end_date}T23:59:59`,
    }));

    useEffect(() => {
        const tasksForDate = usersTasks.filter(
            (task) => task.end_date === selectedDate
        );
        setFilteredTasks(tasksForDate);
    }, [selectedDate, usersTasks]);

    const dateClickHandler = (info: any) => {
        console.log(info);
        setSelectedDate(info.dateStr);
    };

    const eventClickHandler = (info: any) => {
        const task = usersTasks.find(
            (task) =>
                task.name === info.event.title &&
                task.end_date === info.event.end.toISOString().split('T')[0]
        );

        if (task) {
            dispatch(setCurrentTask(task));
            dispatch(setModalActive(true));
            dispatch(setModalCurrentContent('contentTaskDetails'));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.calendarContainer}>
                <FullCalendar
                    selectable
                    events={events}
                    headerToolbar={{
                        left: 'today prev next',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay',
                    }}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height={'85vh'}
                    locale={'ru'}
                    buttonText={{
                        today: 'Сегодня',
                        day: 'день',
                        week: 'неделя',
                        month: 'месяц',
                    }}
                    firstDay={1}
                    displayEventTime={false}
                    dateClick={dateClickHandler}
                    eventClick={(info) => {
                        eventClickHandler(info);
                    }}
                />
            </div>
            <div className={styles.detailsContainer}>
                {selectedDate && (
                    <>
                        <h3>События на {selectedDate}:</h3>
                        {filteredTasks ? (
                            <TaskCard filteredTasks={filteredTasks} />
                        ) : (
                            <p>Нет событий на эту дату.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
