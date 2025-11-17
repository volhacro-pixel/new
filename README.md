# EPAM Playwright Tests

This repository now includes an automated Playwright test in TypeScript that validates navigation to EPAM's Client Work page.

How to run locally:
- Install dependencies: `npm i`
- Install Playwright browsers: `npx playwright install`
- Run tests (headless): `npm test`
- Run tests with UI: `npm run test:ui`

Test added:
- tests/epam-client-work.spec.ts

Notes:
- The test accepts cookies if present to prevent overlay issues.
- Ensures the browser page is closed at the end of the test.
- Uses role-based selectors for stability and includes a fallback navigation when click is intercepted.