import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000' },
  webServer: { command: 'pnpm start', port: 3000, reuseExistingServer: true }
});
