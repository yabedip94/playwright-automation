import { test, expect } from '@playwright/test';

import {
    getTestUser,
    logoutUser,
    loginAsUser,
} from '../../../src/helpers/parabankAuth';

test('Successful Login', async ({ page }) => {
    const user = await getTestUser(page);

    await logoutUser(page);

    await loginAsUser(
        page,
        user.username,
        user.password
    );

    await expect(
        page.getByRole('heading', {
            name: 'Accounts Overview',
        })
    ).toBeVisible();
});