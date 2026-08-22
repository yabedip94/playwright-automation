import { test, expect } from '@playwright/test';

import {
    getTestUser,
} from '../../../src/helpers/parabankAuth';

import {
    UpdateProfilePage,
} from '../../../src/pages/parabank/UpdateProfilePage';


test.describe('ParaBank - Update Profile', () => {

    test('User can successfully update profile', async ({ page }) => {

        // Create dynamic user
        const user = await getTestUser(page);

        console.log(`Testing with user: ${user.username}`);


        // User is automatically logged in after registration
        const updateProfilePage = new UpdateProfilePage(page);


        // Open Update Profile page
        await updateProfilePage.goto();


        // Wait until profile page is loaded
        await expect(
            updateProfilePage.pageTitle
        ).toBeVisible();


        // Update profile information
        await updateProfilePage.updateProfile(
            'Bedi',
            'QA Updated',
            '456 Testing Street',
            'Jakarta',
            'DKI Jakarta',
            '12345',
            '081234567890'
        );


        // Validate profile update success
        await expect(
            updateProfilePage.successTitle
        ).toBeVisible();


        await expect(
            updateProfilePage.successMessage
        ).toContainText(
            'Your updated address and phone number have been added to the system.'
        );

    });

});