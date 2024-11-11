type HolidaysTodayProps = {
    holidays: string[];
};

export const HolidaysToday: React.FC<HolidaysTodayProps> = ({ holidays }) => {
    return (
        <div>
            <h4>Праздники сегодня:</h4>
            {holidays.length > 0 ? (
                <ul>
                    {holidays.map((holiday, index) => (
                        <li key={index}>{holiday}</li>
                    ))}
                </ul>
                ) : (
                    <p>Сегодня нет праздников</p>
                )}
        </div>
    );
};
