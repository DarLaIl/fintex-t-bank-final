'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../store/store';

const store = makeStore();

interface ReduxProviderProps {
    children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
    return <Provider store={store}>{children}</Provider>;
}
