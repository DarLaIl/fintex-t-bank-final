type TaskListsProps = {
    lists: { id: number; name: string }[];
};

export const TasksLists: React.FC<TaskListsProps> = ({ lists }) => {
    return (
        <div>
            <h3>Мои списки дел:</h3>
            {lists.length > 0 ? (
                <ul>
                    {lists.map((list) => (
                        <li key={list.id}>
                            {list.name} <button>Подробнее</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Здесь пока ничего нет</p>
            )}
        </div>
    );
};
