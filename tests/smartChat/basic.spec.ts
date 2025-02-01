import { expect } from "@playwright/test";
import { Given, Scenario, When, Then } from "../common/ghkerkin";

Scenario(
  `Smart input is shown`,
  async ({
    smartInputPage: {
      mainComponent,
      use,
    },
  }) => {
    await Given('the smart input component is shwon', async () => {
      await use('');
    });

    await Then('the control appears as expected', async () => {
      await expect(mainComponent).toHaveScreenshot(`smart-input-is-shown.png`);
    });
  }
);

Scenario(
  `Smart input is shown with focus`,
  async ({
    smartInputPage: {
      mainComponent,
      editComponent,
      use,
    },
  }) => {
    await Given('the smart input component is shown', async () => {
      await use('');
    });

    await When('the smart input component is in focus', async () => {
      editComponent.focus();
    });

    await Then('a border will be sbown', async () => {
      await expect(mainComponent).toHaveScreenshot(`smart-input-has-focus-border.png`);
    });
  }
);

