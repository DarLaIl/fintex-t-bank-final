import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://9c7d9a2a79947df21719788ffcc66a80@o4508330701160448.ingest.de.sentry.io/4508330704633936',

    tracesSampleRate: 1,

    debug: false,
});
