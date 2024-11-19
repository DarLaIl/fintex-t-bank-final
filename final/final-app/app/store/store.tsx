import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import type { AnyAction } from 'redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../types/types';

interface AuthState {
    token: string | null;
    user: object | null;
}

interface ModalState {
    isActive: boolean;
    modalCurrentContent: string | null;
    currentTaskListId: number;
}

interface EventsState {
    isAdded: boolean;
    currentTask: Task | null;
}

const initialAuthState: AuthState = {
    token: null,
    user: null,
};

const initialModalState: ModalState = {
    isActive: false,
    modalCurrentContent: null,
    currentTaskListId: 0,
};

const initialEventState: EventsState = {
    isAdded: false,
    currentTask: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        setUser(state, action: PayloadAction<object | null>) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action: AnyAction) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        });
    },
});

const ModalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        setModalActive(state, action: PayloadAction<boolean>) {
            state.isActive = action.payload;
        },
        setModalCurrentContent(state, action: PayloadAction<string | null>) {
            state.modalCurrentContent = action.payload;
        },
        setCurrentTaskListId(state, action: PayloadAction<number>) {
            state.currentTaskListId = action.payload;
        },
    },
});

const EventsSlice = createSlice({
    name: 'events',
    initialState: initialEventState,
    reducers: {
        setIsAdded: (state) => {
            state.isAdded = !state.isAdded;
        },
        setCurrentTask(state, action: PayloadAction<Task | null>) {
            state.currentTask = action.payload;
        },
    },
});

export const { setToken, setUser } = authSlice.actions;
export const { setModalActive, setModalCurrentContent, setCurrentTaskListId } =
    ModalSlice.actions;
export const { setIsAdded, setCurrentTask } = EventsSlice.actions;

export const makeStore = () =>
    configureStore({
        reducer: {
            auth: authSlice.reducer,
            modal: ModalSlice.reducer,
            events: EventsSlice.reducer,
        },
    });

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
