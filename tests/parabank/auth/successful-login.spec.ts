import { test, expect } from '@playwright/test';

import {
    createUser,
    logoutUser,
    loginAsUser,
} from '../../../src/helpers/parabankAuth';

test('Successful Login', async ({ page }) => {
    const user = await createUser(page);

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