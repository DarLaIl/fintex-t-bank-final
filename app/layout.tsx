import { Header } from './components/Header/Header';
import { ReduxProvider } from './providers/ReduxProvider';
import type { LayoutProps } from './types/types';
import '../styles/globals.css';
import Script from 'next/script';

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="ru">
            <head>
                <Script
                    id="yandex-metrika"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(m,e,t,r,i,k,a){
                                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                                m[i].l=1*new Date();
                                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                                k.async=1;k.src=r;a.parentNode.insertBefore(k,a)
                            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                            ym(98990686, "init", {
                                clickmap:true,
                                trackLinks:true,
                                accurateTrackBounce:true,
                                webvisor:true
                            });
                        `,
                    }}
                />
                <noscript>
                    <div>
                        <img
                            src={'https://mc.yandex.ru/watch/98990686'}
                            style={{ position: 'absolute', left: '-9999px' }}
                            alt=''
                        />
                    </div>
                </noscript>
            </head>
            <body>
                <ReduxProvider>
                    <Header />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
