import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});

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

export const getUserProfile = async (token: string) => {
    try {
        const response = await api.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw new Error('Error fetching profile');
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
