type SharedTasksProps = {
    tasks: { task: string; date: string }[];
};
//раздел в разработке, будет позже
export const SharedTasks: React.FC<SharedTasksProps> = ({ tasks }) => {
    return (
        <div>
            <h3>Совместные дела:</h3>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            {task.task} {task.date}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Здесь пока ничего нет</p>
            )}
        </div>
    );
};
