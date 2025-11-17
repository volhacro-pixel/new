import { test, expect } from '@playwright/test';

// Test: EPAM Services -> Explore Our Client Work -> Verify "Client Work" text
// Notes:
// - Accept cookies to prevent overlay from blocking header interactions
// - Use role-based selectors for resilience
// - Always close the page at the end

test.describe('EPAM - Client Work navigation', () => {
  test('Navigate to Client Work from Services and verify text is visible', async ({ page, context }) => {
    // Setup: viewport and route timeouts can be adjusted if needed
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Navigate to homepage
    await page.goto('https://www.epam.com/');

    // 1.a. Accept cookies if banner is present
    const acceptAllButton = page.getByRole('button', { name: /Accept All/i });
    if (await acceptAllButton.isVisible().catch(() => false)) {
      await acceptAllButton.click();
    }

    // 2. Select "Services" from the header menu (retry logic if an overlay intercepts the click)
    const servicesLink = page.getByRole('link', { name: 'Services', exact: true });
    try {
      await servicesLink.click({ timeout: 5000 });
    } catch (e) {
      // Fallback: navigate directly if click gets intercepted
      await page.goto('https://www.epam.com/services');
    }

    // Ensure Services page is loaded
    await expect(page).toHaveURL(/\/services(\/)?$/);

    // 3. Click "Explore Our Client Work"
    const exploreClientWork = page.getByRole('link', { name: 'Explore Our Client Work' });
    await expect(exploreClientWork).toBeVisible();
    await exploreClientWork.click();

    // 4. Validate that "Client Work" text is visible on the page
    await expect(page).toHaveURL(/\/services\/client-work/);
    await expect(page.getByText('Client Work').first()).toBeVisible();

    // Teardown: Close the page (ensures browser resources are released)
    await page.close();
  });
});
