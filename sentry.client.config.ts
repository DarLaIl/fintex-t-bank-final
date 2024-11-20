import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://9c7d9a2a79947df21719788ffcc66a80@o4508330701160448.ingest.de.sentry.io/4508330704633936',

    integrations: [Sentry.replayIntegration()],

    tracesSampleRate: 1,

    replaysSessionSampleRate: 0.1,

    replaysOnErrorSampleRate: 1.0,

    debug: false,
});
