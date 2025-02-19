import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { ChangeUserInfoModalContent } from '../ModalContent/ChangeUserInfoModalContent/ChangeUserInfoModalContent';
import { TaskListModalContent } from '../ModalContent/TaskListModalContent/TaskListModalContent';
import { CreateNewTaskModalContent } from '../ModalContent/CreateNewTaskModalContent/CreateNewTaskModalContent';
import { TaskDetailsModalContent } from '../ModalContent/TaskDetailsModalContent/TaskDetailsModalContent';
import type { СookieProps } from '../../../types/types';

export const RenderContent: React.FC<СookieProps> = ({ cookieValue }) => {
    const modal = useSelector((state: RootState) => state.modal);
    const events = useSelector((state: RootState) => state.events);

    switch (modal.modalCurrentContent) {
        case 'contentUpdateUser':
            return <ChangeUserInfoModalContent cookieValue={cookieValue} />;
        case 'contentAddNewTaskList':
            return (
                <TaskListModalContent
                    cookieValue={cookieValue}
                    title={'Добавить новый список:'}
                    shouldUpdate={false}
                />
            );
        case 'contentUpdateTaskList':
            return (
                <TaskListModalContent
                    cookieValue={cookieValue}
                    title={'Изменить список:'}
                    shouldUpdate
                />
            );
        case 'contentAddNewTask':
            return (
                <CreateNewTaskModalContent
                    cookieValue={cookieValue}
                    shouldUpdate={false}
                />
            );
        case 'contentUpdateTask':
            return (
                <CreateNewTaskModalContent
                    cookieValue={cookieValue}
                    shouldUpdate
                />
            );
        case 'contentTaskDetails':
            return (
                <TaskDetailsModalContent
                    task={events.currentTask}
                    cookieValue={cookieValue}
                />
            );
        default:
            return null;
    }
};
