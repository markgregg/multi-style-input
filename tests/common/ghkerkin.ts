import test from "@playwright/test";
import { SmartInputPage, createSmartFilterPage } from "./SmartViewPage";

const SmartFilterTest = test.extend<{
  smartInputPage: SmartInputPage;
}>({
  smartInputPage: async ({ page }, use) => {
    await use(createSmartFilterPage(page));
  }
});

type Test = typeof SmartFilterTest;

export const Scenario: Test = SmartFilterTest;

export const Given: Test['step'] = (state: string, ...rest) =>
  test.step(`Given ${state}`, ...rest);

export const When: Test['step'] = (action, ...rest) =>
  test.step(`When ${action}`, ...rest);

export const Then: Test['step'] = (state, ...rest) =>
  test.step(`Then ${state}`, ...rest);

export const And: Test['step'] = (state, ...rest) =>
  test.step(`And ${state}`, ...rest);