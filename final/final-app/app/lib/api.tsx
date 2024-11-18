import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});

const HolidaysData = {
    api: {
        endpoint: 'https://calendarific.com/api/v2/holidays',
        key: 'Y4Mj16r8M4r6VdAAhH6VvrZu57HiVTbB',
    },
};

export const register = async (
    email: string,
    password: string,
    name: string,
    lastname: string
) => {
    const response = await api.post('/register', {
        email,
        password,
        name,
        lastname,
    });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    const token = response.data.access_token;
    Cookies.set('jwt', token, { expires: 1 });
    return token;
};

export const logout = async () => {
    Cookies.remove('jwt');
};

export const getAllUser = async (token: string | undefined) => {
    try {
        const response = await api.get('/users', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
};

export const getUserProfile = async (token: string | undefined) => {
    try {
        const response = await api.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
};

export const updateUserProfile = async (
    token: string | undefined,
    name: string,
    lastname: string
) => {
    try {
        const response = await api.put(
            '/users/me',
            { name, lastname },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw new Error('Error updating profile');
    }
};

export const getUserAvatar = async (token: string | undefined) => {
    try {
        const response = await api.get('/users/me/avatar', {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob',
        });
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.warn('Error fetching avatar:', error);
        throw new Error('Error fetching avatar');
    }
};

export const uploadUserAvatar = async (
    token: string | undefined,
    formData: FormData
) => {
    try {
        const response = await api.post('/users/me/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating avatar:', error);
        throw new Error('Error updating avatar');
    }
};

export const getUserTaskLists = async (token: string | undefined) => {
    try {
        const response = await api.get('/tasklists', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching Tasks Lists:', error);
    }
};

export const createNewTaskList = async (
    token: string | undefined,
    listName: string,
    type: string
) => {
    try {
        const response = await api.post(
            '/tasklists',
            { name: `${listName}`, type: `${type}` },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Upload failed:', error);
        throw new Error('Upload failed');
    }
};

export const updateTaskList = async (
    token: string | undefined,
    listName: string,
    type: string,
    tasklist_id: number
) => {
    try {
        const response = await api.put(
            `/tasklists/${tasklist_id}`,
            { name: `${listName}`, type: `${type}` },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Upload failed:', error);
        throw new Error('Upload failed');
    }
};

export const deleteTaskList = async (
    token: string | undefined,
    tasklist_id: number
) => {
    try {
        const response = await api.delete(`/tasklists/${tasklist_id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Delete failed:', error);
        throw new Error('Delete failed');
    }
};

export const getHolidays = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    try {
        const response = await fetch(
            `${HolidaysData.api.endpoint}?api_key=${HolidaysData.api.key}&country=RU&year=${year}&month=${month}&day=${day}`
        );

        const data = await response.json();

        return data.response.holidays;
    } catch (error) {
        console.error('Fetch failed:', error);
    }
};

export const getUsersTasks = async (token: string | undefined) => {
    try {
        const response = await api.get('/tasks/author', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

export const getAssignedTasks = async (token: string | undefined) => {
    try {
        const response = await api.get('/tasks/assigned', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

export const createNewTask = async (
    token: string | undefined,
    name: string,
    end_date: string,
    description: string,
    notification: boolean,
    assigned: number[],
    task_list_id: number
) => {
    try {
        const response = await api.post(
            '/tasks',
            {
                name: `${name}`,
                end_date: `${end_date}`,
                description: `${description}`,
                assigned: assigned,
                notification: `${notification}`,
                task_list_id: `${task_list_id}`,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Upload failed:', error);
        throw new Error('Upload failed');
    }
};

export const updateTask = async (
    token: string | undefined,
    name: string,
    end_date: string,
    description: string,
    notification: boolean,
    assigned: number[],
    task_id: number | undefined
) => {
    try {
        const response = await api.put(
            `/tasks/${task_id}`,
            {
                name: `${name}`,
                end_date: `${end_date}`,
                description: `${description}`,
                assigned: assigned,
                notification: `${notification}`,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Upload failed:', error);
        throw new Error('Upload failed');
    }
};

export const deleteTask = async (
    token: string | undefined,
    task_id: number | undefined
) => {
    try {
        const response = await api.delete(`/tasks/${task_id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Delete failed:', error);
        throw new Error('Delete failed');
    }
};
