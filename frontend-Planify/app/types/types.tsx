// Общие типы
export type LayoutProps = {
    children: React.ReactNode;
};

export type User = {
    id: number;
    name: string;
    lastname: string;
    email: string;
};

export type Task = {
    id: number;
    name: string;
    end_date: string;
    description: string;
    assigned: number[];
    author: number;
    notification: boolean;
    is_completed: boolean;
    task_list_id: number;
    task_list_name: string;
};

export type Comment = {
    id: number;
    author: number;
    text: string;
};

export type TaskList = {
    id: number;
    name: string;
    type: string;
};

export type Holiday = {
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

export type Event = {
    title: string;
    start: string;
    end: string;
    allDay?: boolean;
};

// Типы для компонентов

export type AuthWrapperProps = ButtonProps & {
    error: string;
    children: React.ReactNode;
    buttonText: string;
};

export type ButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ControlButtonProps = ButtonProps & {
    children: string;
};

export type UserInfoProps = {
    user: User;
};

export type AvatarProps = UserInfoProps & {
    cookieValue?: string;
};

export type HolidaysTodayProps = {
    holidays: Holiday[];
};

export type SharedTasksProps = {
    tasks: Task[];
};

export type СookieProps = {
    cookieValue?: string;
};

export type TaskListsProps = СookieProps & {
    lists: TaskList[];
};

export type TaskModalContentProps = СookieProps & {
    shouldUpdate: boolean;
};

export type TaskListModalContentProps = TaskModalContentProps & {
    title: string;
};

export type TaskProps = СookieProps & {
    task: Task | null;
};

export type TaskCardProps = {
    filteredTasks: Task[];
};

export type CalendarProps = {
    usersTasks: Task[];
};

export type CommentsProps = СookieProps & {
    eventId: number | undefined;
};
