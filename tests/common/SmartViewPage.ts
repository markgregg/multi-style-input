import { Locator, Page } from "@playwright/test"

export interface SmartInputPage {
  readonly filterBar: Locator,

  use: (example: string) => void;
  pause: (milliseconds: number) => void;
}

export const createSmartFilterPage = (page: Page): SmartInputPage => {
  const filterBar = page.locator('#si-enhanced-Input');

  return {
    filterBar,

    use: async (testPage: string) => await page.goto(`/${testPage}`),
    pause: async (milliseconds: number) => await page.waitForTimeout(milliseconds),
  };
}