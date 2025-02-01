import { expect } from "@playwright/test";
import { Given, Scenario, When, Then } from "../common/ghkerkin";

Scenario(
  `Multi Style Input is shown`,
  async ({
    smartInputPage: {
      mainComponent,
      use,
    },
  }) => {
    await Given('the Multi Style Input component is shwon', async () => {
      await use('');
    });

    await Then('the control appears as expected', async () => {
      await expect(mainComponent).toHaveScreenshot(`multi-style-input-is-shown.png`);
    });
  }
);

Scenario(
  `Multi Style Input is shown with focus`,
  async ({
    smartInputPage: {
      mainComponent,
      editComponent,
      use,
    },
  }) => {
    await Given('the Multi Style Input component is shown', async () => {
      await use('');
    });

    await When('the Multi Style Input component is in focus', async () => {
      editComponent.focus();
    });

    await Then('a border will be sbown', async () => {
      await expect(mainComponent).toHaveScreenshot(`multi-style-input-has-focus-border.png`);
    });
  }
);

