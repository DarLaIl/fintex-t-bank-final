import { Header } from './components/Header/Header';
import { ReduxProvider } from './providers/ReduxProvider';
import type { LayoutProps } from './types/types';
import '../styles/globals.css';

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="ru">
            <body>
                <ReduxProvider>
                    <Header />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
