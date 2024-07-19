import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['dot'],
    ["line"],
    ['json', { outputFile: 'report.json' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retry-with-video',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        screenshot: 'on',
        trace: 'on',
        viewport: { width: 1600, height: 1200 }
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        screenshot: 'on',
        trace: 'on',
        viewport: { width: 1600, height: 1200 }
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        screenshot: 'on',
        trace: 'on',
        viewport: { width: 1600, height: 1200 }
      },
    },

  ],

  outputDir: 'test-results/',

});
