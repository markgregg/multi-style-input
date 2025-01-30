import { expect } from "@playwright/test";
import { And, Given, Scenario, Then, When } from "../common/ghkerkin";

Scenario(
  `All icons are shown when enabled`,
  async ({
    smartFilterPage: {
      filterBar,
      use,
    },
  }) => {
    await Given('the SmartFilter test page is shown', async () => {
      await use();
    });

    await Then('the Smart Filter mathces valid screenshot', async () => {
      await expect(filterBar).toHaveScreenshot(`icons-shown.png`);
    });
  }
);
