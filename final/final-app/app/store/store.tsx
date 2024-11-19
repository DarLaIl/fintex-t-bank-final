import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import type { AnyAction } from 'redux';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: object | null;
}

interface ModalState {
    isActive: boolean;
    currentContent: string | null;
}

const initialAuthState: AuthState = {
    token: null,
    user: null,
};

const initialModalState: ModalState = {
    isActive: false,
    currentContent: null,
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
        setCurrentContent(state, action: PayloadAction<string | null>) {
            state.currentContent = action.payload;
        },
    },
});

export const { setToken, setUser } = authSlice.actions;
export const { setModalActive, setCurrentContent } = ModalSlice.actions;

export const makeStore = () =>
    configureStore({
        reducer: {
            auth: authSlice.reducer,
            modal: ModalSlice.reducer,
        },
    });

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
