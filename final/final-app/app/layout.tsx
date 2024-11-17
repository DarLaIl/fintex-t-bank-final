import { Header } from './components/Header/Header';
import { ReduxProvider } from './providers/ReduxProvider';
import '../styles/globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
