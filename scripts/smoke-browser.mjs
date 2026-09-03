import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright-core";
import sharp from "sharp";

const outputRoot = path.join(process.cwd(), "out");
const anniversaryEnabled = process.env.PRISMSHOT_ANNIVERSARY === "1";
const mimeTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function check(condition, message) {
  if (!condition) throw new Error(message);
}

async function checkHomeWordmark(page, label) {
  const wordmark = page.locator("#home-title");
  await wordmark.evaluate((node) => {
    node.style.background = "#000";
    node.style.filter = "none";
    node.children[1].style.display = "none";
  });

  const screenshot = await wordmark.screenshot();
  const { data, info } = await sharp(screenshot)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const verticalInset = Math.max(3, Math.round(info.height * 0.12));
  let minX = info.width;
  let maxX = -1;

  for (let y = verticalInset; y < info.height - verticalInset; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * 3;
      if (data[offset] + data[offset + 1] + data[offset + 2] > 330) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
    }
  }

  const centerOffset = (minX + maxX) / 2 - info.width / 2;
  check(minX > info.width * 0.025, `${label} wordmark clips its left edge (${minX}px)`);
  check(
    Math.abs(centerOffset) < info.width * 0.015,
    `${label} wordmark is not visually centred (${centerOffset}px)`,
  );
}

async function existingFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function resolveRequestPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const safePath = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const relativePath = safePath === "/" ? "index.html" : safePath.replace(/^\//, "");
  const candidates = path.extname(relativePath)
    ? [relativePath]
    : [`${relativePath}.html`, path.join(relativePath, "index.html"), relativePath];

  for (const candidate of candidates) {
    const absolutePath = path.join(outputRoot, candidate);
    if (absolutePath.startsWith(outputRoot) && (await existingFile(absolutePath))) {
      return absolutePath;
    }
  }
  return null;
}

const server = createServer(async (request, response) => {
  const filePath = await resolveRequestPath(request.url ?? "/");
  if (!filePath) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const body = await readFile(filePath);
  response.writeHead(200, {
    "content-type": mimeTypes[path.extname(filePath)] ?? "application/octet-stream",
  });
  response.end(body);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
check(address && typeof address !== "string", "static test server failed to start");
const baseUrl = `http://127.0.0.1:${address.port}`;

const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const failures = [];

async function runFlow(name, options, flow) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const runtimeErrors = [];
  const externalRequests = [];

  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.protocol.startsWith("http") && url.hostname !== "127.0.0.1") {
      externalRequests.push(request.url());
    }
  });

  try {
    await flow(page);
    check(runtimeErrors.length === 0, `runtime errors: ${runtimeErrors.join(" | ")}`);
    check(externalRequests.length === 0, `runtime external requests: ${externalRequests.join(", ")}`);
    console.log(`✓ ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
    console.error(`✗ ${name}`);
  } finally {
    await context.close();
  }
}

await runFlow(
  "desktop bilingual homepage",
  { viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" },
  async (page) => {
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    check((await page.locator("html").getAttribute("lang")) === "zh-CN", "Chinese html lang missing");
    check(
      (await page.getByRole("link", { name: "一周年摄影赛", exact: true }).count()) ===
        (anniversaryEnabled ? 1 : 0),
      "Chinese anniversary navigation does not match the feature flag",
    );
    check((await page.locator('img[src*="crystal-"]').count()) === 2, "homepage crystal layers missing");
    check((await page.locator("footer").count()) === 0, "homepage must not render a footer");
    const homepageImageSources = await page
      .locator('img[src*="/images/home/"], img[src*="/images/brand/"]')
      .evaluateAll((images) => images.map((image) => image.getAttribute("src")));
    check(
      homepageImageSources.length === 5 && homepageImageSources.every((source) => source?.endsWith(".webp")),
      `homepage still references a non-WebP visual: ${homepageImageSources.join(", ")}`,
    );
    const crystalAnimation = await page.locator('img[src*="crystal-left"]').evaluate((image) => getComputedStyle(image.parentElement).animationName);
    check(crystalAnimation === "none", "reduced-motion crystal fallback is not static");
    const crystalMask = await page.locator('img[src*="crystal-left"]').evaluate((image) => getComputedStyle(image.parentElement).getPropertyValue("--crystal-mask"));
    check(crystalMask.includes("crystal-left.webp"), "homepage crystal mask is not WebP");
    await checkHomeWordmark(page, "desktop");

    await Promise.all([
      page.waitForURL(`${baseUrl}/en`),
      page.locator('a[aria-label="Switch to English"]').first().click(),
    ]);
    check((await page.locator("html").getAttribute("lang")) === "en", "English html lang missing");
    check(await page.getByRole("link", { name: "Home", exact: true }).first().getAttribute("aria-current") === "page", "English current navigation missing");
    check(
      (await page.getByRole("link", { name: "Anniversary", exact: true }).count()) ===
        (anniversaryEnabled ? 1 : 0),
      "English anniversary navigation does not match the feature flag",
    );

    await page.goto(`${baseUrl}/events`, { waitUntil: "networkidle" });
    await Promise.all([
      page.waitForURL(`${baseUrl}/contests`),
      page.getByRole("link", { name: "主题赛", exact: true }).first().click(),
    ]);
    await page.waitForTimeout(1000);
    check((await page.evaluate(() => window.scrollY)) === 0, "route navigation did not reset scroll position to the top");

    const anniversaryResponse = await page.request.get(`${baseUrl}/anniversary`);
    check(
      anniversaryResponse.status() === (anniversaryEnabled ? 200 : 404),
      "Chinese anniversary route status does not match the feature flag",
    );
    if (anniversaryEnabled) {
      await page.goto(`${baseUrl}/anniversary`, { waitUntil: "networkidle" });
      check(
        await page.getByRole("heading", { name: "一周年摄影赛" }).isVisible(),
        "Chinese anniversary heading is missing",
      );
      check(
        await page.locator('[data-anniversary-wordmark="one-year"]').isVisible(),
        "Anniversary wordmark is missing",
      );
      check(
        await page.locator('[data-anniversary-prism="one"]').isVisible(),
        "Anniversary prism artwork is missing",
      );
      await Promise.all([
        page.waitForURL(`${baseUrl}/en/anniversary`),
        page.locator('a[aria-label="Switch to English"]').first().click(),
      ]);
      check(
        await page.getByRole("heading", { name: "Anniversary Photo Contest" }).isVisible(),
        "English anniversary heading is missing",
      );
    }
  },
);

await runFlow(
  "mobile events interactions",
  { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  async (page) => {
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await checkHomeWordmark(page, "mobile");
    await page.goto(`${baseUrl}/events`, { waitUntil: "networkidle" });
    const menuButton = page.locator('button[aria-controls="mobile-menu"]');
    check(await menuButton.isVisible(), "mobile menu button is not visible at the mobile breakpoint");
    await menuButton.click();
    check(await menuButton.getAttribute("aria-expanded") === "true", "mobile menu did not open");
    await page.locator("#mobile-menu").waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    check(await menuButton.getAttribute("aria-expanded") === "false", "Escape did not close mobile menu");

    const calendarMonth = page.locator('section[aria-labelledby="calendar-title"] strong').first();
    check((await calendarMonth.textContent())?.trim() === "09", "runtime did not select the Shanghai current month");
    await page.getByRole("button", { name: "下一个有活动的月份" }).click();
    check((await calendarMonth.textContent())?.trim() === "10", "calendar month navigation failed");

    const activity = page.getByRole("button", { name: /同镜搭子/ });
    await activity.click();
    check(await activity.getAttribute("aria-expanded") === "true", "accordion did not switch panels");
    const photoTrigger = page.getByRole("button", { name: "盲盒任务：氛围卡" });
    await photoTrigger.click();
    const dialog = page.getByRole("dialog", { name: "照片大图查看器" });
    check(await dialog.isVisible(), "photo viewer did not open");
    const before = await dialog.locator("aside").textContent();
    await page.keyboard.press("ArrowRight");
    const after = await dialog.locator("aside").textContent();
    check(before !== after, "photo viewer keyboard navigation failed");
    await page.keyboard.press("Escape");
    check((await dialog.count()) === 0, "photo viewer did not close");
    check(await photoTrigger.evaluate((node) => node === document.activeElement), "photo viewer did not restore focus");
    check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "mobile events page has horizontal overflow");

    await page.goto(`${baseUrl}/contests`, { waitUntil: "networkidle" });
    const landscapeChampion = page.getByRole("button", { name: "醒来之前" });
    check(await landscapeChampion.isVisible(), "mobile contest champion is not visible");
    await landscapeChampion.scrollIntoViewIfNeeded();
    const championPreview = await landscapeChampion.evaluate((node) => {
      const bounds = node.getBoundingClientRect();
      return {
        ratio: bounds.width / bounds.height,
        fit: getComputedStyle(node.querySelector("img")).objectFit,
      };
    });
    check(
      Math.abs(championPreview.ratio - 4 / 5) < 0.02,
      `champion preview is not 4:5 (${championPreview.ratio})`,
    );
    check(championPreview.fit === "cover", "champion preview does not crop to its 4:5 frame");
    await landscapeChampion.click();
    const contestDialog = page.getByRole("dialog", { name: "照片大图查看器" });
    check(await contestDialog.isVisible(), "contest champion viewer did not open on mobile");
    check(await contestDialog.locator("img").evaluate((image) => getComputedStyle(image).objectFit === "contain"), "contest viewer crops the full image");
    await page.keyboard.press("Escape");
    check(await landscapeChampion.evaluate((node) => node === document.activeElement), "contest viewer did not restore focus");
    check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "mobile contest page has horizontal overflow");

    if (anniversaryEnabled) {
      await page.goto(`${baseUrl}/anniversary`, { waitUntil: "networkidle" });
      check(
        await page.locator('[data-anniversary-prism="one"]').isVisible(),
        "mobile anniversary prism artwork is missing",
      );
      check(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        "mobile anniversary page has horizontal overflow",
      );
    }
  },
);

await runFlow(
  "contest gallery and about content",
  { viewport: { width: 1280, height: 900 } },
  async (page) => {
    await page.goto(`${baseUrl}/contests`, { waitUntil: "networkidle" });
    check(await page.getByText("投稿中", { exact: true }).isVisible(), "contest status is not submitting at the configured date");
    check((await page.getByText(/等待投票/).count()) === 0, "forbidden intermediate contest state is present");
    const champion = page.getByRole("button", { name: "边界以外" });
    await champion.click();
    const contestDialog = page.getByRole("dialog", { name: "照片大图查看器" });
    check(await contestDialog.isVisible(), "contest champion did not open the shared photo viewer");
    check((await contestDialog.locator("aside").textContent())?.includes("第 06 期"), "contest viewer is missing issue metadata");
    await page.keyboard.press("Escape");
    check(await champion.evaluate((node) => node === document.activeElement), "contest viewer did not restore focus");
    check((await page.locator("img:not([alt])").count()) === 0, "contest page contains an image without alt text");

    await page.goto(`${baseUrl}/gallery`, { waitUntil: "networkidle" });
    const photos = page.locator('button[aria-label^="活动档案"]');
    check((await photos.count()) === 24, "gallery initial page is not 24 photographs");
    await page.getByRole("button", { name: "加载更多 24 张" }).click();
    check((await photos.count()) === 48, "gallery did not append 24 photographs");
    await photos.first().click();
    check(await page.getByRole("dialog", { name: "照片大图查看器" }).isVisible(), "gallery did not reuse the photo viewer");
    await page.keyboard.press("Escape");
    check((await page.locator("img:not([alt])").count()) === 0, "gallery contains an image without alt text");

    await page.goto(`${baseUrl}/about`, { waitUntil: "networkidle" });
    const connectSection = page.locator('section[aria-labelledby="connect-title"]');
    check((await connectSection.locator('a[target="_blank"]').count()) === 5, "about page does not expose five platforms");
    const qrImages = connectSection.locator('img[alt$="二维码"]');
    check((await qrImages.count()) === 5, "about page does not render five QR codes");
    check((await qrImages.first().getAttribute("src"))?.startsWith("data:image/png;base64,") === true, "QR code was not generated at build time");
    check(await page.getByRole("heading", { name: "一份支持，让更多光影赛事发生" }).isVisible(), "about support section is missing");
    check((await page.locator('section[aria-labelledby="team-title"] article').count()) === 4, "about team does not list four members");
    check((await page.getByText("人物照片待替换", { exact: true }).count()) === 4, "team portrait placeholders are not explicit");

    await page.goto(`${baseUrl}/en/about`, { waitUntil: "networkidle" });
    check(await page.getByRole("heading", { name: "A little support, more stories in light" }).isVisible(), "English support copy is missing");
    check(await page.getByText("Founder", { exact: true }).isVisible(), "English team roles are missing");
  },
);

await browser.close();
await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("[smoke] 3 Chromium flows passed");
}
