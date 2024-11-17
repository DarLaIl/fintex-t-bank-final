'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Calendar.module.css';
import { useState } from 'react';

export default function Calendar() {
    const [events, setEvents] = useState([]);
    return (
        <div className={styles.calendarContainer}>
            <FullCalendar
                editable
                selectable
                events={events}
                headerToolbar={{
                    start: 'today prev next',
                    center: 'title',
                    end: 'dayGridMonth dayGridWeek dayGridDay',
                }}
                plugins={[dayGridPlugin, interactionPlugin]}
                views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
                height={'90vh'}
                locale={'ru'}
                buttonText={{
                    today: 'Сегодня',
                    day: 'день',
                    week: 'неделя',
                    month: 'месяц',
                }}
                firstDay={1}
            />
        </div>
    );
}
