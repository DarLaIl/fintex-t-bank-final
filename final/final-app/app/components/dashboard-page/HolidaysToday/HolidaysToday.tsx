import styles from './HolidaysToday.module.css';
import type { HolidaysTodayProps } from '../../../types/types';

export const HolidaysToday: React.FC<HolidaysTodayProps> = ({ holidays }) => {
    return (
        <div className={styles.container}>
            <h4>Праздники сегодня:</h4>
            {holidays.length > 0 ? (
                <ul>
                    {holidays.map((holiday, index) => (
                        <li key={index}>
                            <strong>{holiday.name}</strong> -
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
