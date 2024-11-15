import styles from './HolidaysToday.module.css';
type Holiday = {
    name: string;
    description: string;
    date: {
        iso: string;
        datetime: {
            year: number;
            month: number;
            day: number;
        };
    };
    type: string[];
};

type HolidaysTodayProps = {
    holidays: Holiday[];
};

export const HolidaysToday: React.FC<HolidaysTodayProps> = ({ holidays }) => {
    return (
        <div className={styles.container}>
            <h4>Праздники сегодня:</h4>
            {holidays.length > 0 ? (
                <ul>
                    {holidays.map((holiday, index) => (
                        <li key={index}>
                            <strong>{holiday.name}</strong> -{' '}
                            {holiday.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Сегодня нет праздников</p>
            )}
        </div>
    );
};
