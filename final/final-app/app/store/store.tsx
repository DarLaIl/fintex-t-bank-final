import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

interface AuthState {
    token: string | null;
    name: string | null;
    email: string | null;
}

const initialAuthState: AuthState = {
    token: null,
    name: null,
    email: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        setUser(state, action: PayloadAction<string | null>) {
            state.name = action.payload;
        },
        setEmail(state, action: PayloadAction<string | null>) {
            state.name = action.payload;
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

export const { setToken, setUser, setEmail } = authSlice.actions;

export const makeStore = () =>
    configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
    });

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
