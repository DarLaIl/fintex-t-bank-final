import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Calendar.module.css';
import type { Task } from '@/(protected)/tasklist/[taskList_id]/page';

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
    const events: Event[] = usersTasks.map((usersTask) => ({
        title: usersTask.name,
        start: `${usersTask.end_date}T00:00:00`,
        end: `${usersTask.end_date}T23:59:59`,
    }));

    return (
        <div className={styles.calendarContainer}>
            <FullCalendar
                editable
                selectable
                events={events}
                headerToolbar={{
                    left: 'today prev next',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay',
                }}
                plugins={[dayGridPlugin, interactionPlugin]}
                //views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
                initialView='dayGridMonth'
                height={'90vh'}
                locale={'ru'}
                buttonText={{
                    today: 'Сегодня',
                    day: 'день',
                    week: 'неделя',
                    month: 'месяц',
                }}
                firstDay={1}
                displayEventTime={false}
            />
        </div>
    );
}
