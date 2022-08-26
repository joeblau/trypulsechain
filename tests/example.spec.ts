import { test, PageScreenshotOptions } from "@playwright/test";

const defaultSettings: PageScreenshotOptions = {
  animations: "disabled",
  fullPage: false,
  scale: "device",
  quality: 100,
  type: "jpeg",
};

test("pulsex screenshot", async ({ page }) => {
  await page.goto("https://app.v2b.testnet.pulsex.com");
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: "ss/pulsex.jpg",
    ...defaultSettings,
  });
});

test("pulse ramp screenshot", async ({ page }) => {
  await page.goto("https://pulseramp.com");
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: "ss/pulseramp.jpg",
    ...defaultSettings,
  });
});

test("pulse stake screenshot", async ({ page }) => {
  await page.goto("https://stake.v2b.testnet.pulsechain.com/");
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: "ss/pulsestake.jpg",
    ...defaultSettings,
  });
});

test("pulse faucet screenshot", async ({ page }) => {
  await page.goto("https://faucet.v2b.testnet.pulsechain.com");
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: "ss/pulsefaucet.jpg",
    ...defaultSettings,
  });
});

test("block explorer screenshot", async ({ page }) => {
  await page.goto("https://scan.v2b.testnet.pulsechain.com");
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: "ss/explorer.jpg",
    ...defaultSettings,
  });
});

test("sacrifice checker screenshot", async ({ page }) => {
  await page.goto("https://pulsechain-sacrifice-checker.vercel.app");
  await page.waitForTimeout(5000);
  await page.screenshot({
    path: "ss/checker.jpg",
    ...defaultSettings,
  });
});
