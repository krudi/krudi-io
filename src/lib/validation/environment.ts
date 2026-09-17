import { z } from 'zod';

export const serverEnvironmentSchema = {
    GITHUB_ACCESS_TOKEN: z.string().min(1),
    GITHUB_USERNAME: z.string().min(1),
} as const;

export const clientEnvironmentSchema = {
    NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
} as const;
