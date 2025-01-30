import { Locator, Page } from "@playwright/test"

export interface SmartFilterPage {
  readonly filterBar: Locator,

  use: (example: string) => void;
  pause: (milliseconds: number) => void;
}

export const createSmartFilterPage = (page: Page): SmartFilterPage => {
  const filterBar = page.locator('#sf-filter-bar');

  return {
    filterBar,

    use: async (testPage: string) => await page.goto(`/${testPage}`),
    pause: async (milliseconds: number) => await page.waitForTimeout(milliseconds),
  };
}