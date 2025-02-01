import { expect } from "@playwright/test";
import { Given, Scenario, When, Then } from "../common/ghkerkin";

Scenario(
  `Multi Styled Input is shown`,
  async ({
    smartInputPage: {
      mainComponent,
      use,
    },
  }) => {
    await Given('the multi styled Input component is shwon', async () => {
      await use('');
    });

    await Then('the control appears as expected', async () => {
      await expect(mainComponent).toHaveScreenshot(`multi-styled-input-is-shown.png`);
    });
  }
);

Scenario(
  `Multi Styled Input is shown with focus`,
  async ({
    smartInputPage: {
      mainComponent,
      editComponent,
      use,
    },
  }) => {
    await Given('the multi styled Input component is shown', async () => {
      await use('');
    });

    await When('the multi styled Input component is in focus', async () => {
      editComponent.focus();
    });

    await Then('a border will be sbown', async () => {
      await expect(mainComponent).toHaveScreenshot(`multi-styled-input-has-focus-border.png`);
    });
  }
);

