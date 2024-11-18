import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Calendar.module.css';
import type { Task } from '@/(protected)/tasklist/[taskList_id]/page';
import { useState } from 'react';

type CalendarProps = {
    usersTasks: Task[];
};
type Event = {
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
};

export default function Calendar({ usersTasks }: CalendarProps) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    const events: Event[] = usersTasks.map((usersTask) => ({
        title: usersTask.name,
        start: `${usersTask.end_date}T00:00:00`,
        end: `${usersTask.end_date}T23:59:59`,
    }));

    const dateClickHandle = (info: { dateStr: string }) => {
        console.log(info);
        setSelectedDate(info.dateStr);

        const tasksForDate = usersTasks.filter(
            (task) => task.end_date === info.dateStr
        );
        setFilteredTasks(tasksForDate);
    };
    console.log(filteredTasks);
    return (
        <div className={styles.container}>
            <div className={styles.calendarContainer}>
                <FullCalendar
                    //editable
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
                    dateClick={dateClickHandle}
                />
            </div>
            <div className={styles.detailsContainer}>
                {selectedDate && (
                    <>
                        <h3>События на {selectedDate}:</h3>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task, index) => (
                                <div key={index} className={styles.taskItem}>
                                    <h4>Название: {task.name}</h4>
                                    <p>Описание: {task.description}</p>
                                    <p>Дата дедлайна: {task.end_date}</p>
                                    <p>
                                        Нужно напоминать о дедлайне, {task.notification
                                            ? 'Напоминать'
                                            : 'Не напоминать'}
                                    </p>
                                    <button>Подробнее</button>
                                </div>
                            ))
                        ) : (
                            <p>Нет событий на эту дату.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
