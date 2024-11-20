import {withSentryConfig} from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
};

export default withSentryConfig(nextConfig, {
org: "nan-i1",
project: "javascript-nextjs",
silent: !process.env.CI,
widenClientFileUpload: true,
reactComponentAnnotation: {
enabled: true,
},
tunnelRoute: "/monitoring",
hideSourceMaps: true,
disableLogger: true,
automaticVercelMonitors: true,
});