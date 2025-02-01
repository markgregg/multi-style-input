import { Locator, Page } from "@playwright/test"

export interface SmartInputPage {
  readonly mainComponent: Locator,
  readonly editComponent: Locator,

  use: (example: string) => void;
  pause: (milliseconds: number) => void;
}

export const createSmartFilterPage = (page: Page): SmartInputPage => {
  const mainComponent = page.locator('#si-enhanced-Input');
  const editComponent = page.locator('#si-edit-element');

  return {
    mainComponent,
    editComponent,

    use: async (testPage: string) => await page.goto(`/${testPage}`),
    pause: async (milliseconds: number) => await page.waitForTimeout(milliseconds),
  };
}