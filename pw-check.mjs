import { chromium } from "playwright-core";


const EXEC = "/home/inocents/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome";
const URL = "http://localhost:5173/";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small", width: 320, height: 700 },
];

const browser = await chromium.launch({
  executablePath: EXEC,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("requestfailed", (r) => errors.push("reqfail: " + r.url() + " " + r.failure()?.errorText));

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForSelector(".hero h1");

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const overflowX = doc.scrollWidth - doc.clientWidth;
    const topbar = document.querySelector(".topbar");
    const nav = document.querySelector(".topbar nav");
    const brand = document.querySelector(".brand");
    const h1 = document.querySelector(".hero h1");
    const term = document.querySelector(".terminal");
    const emailBtn = document.querySelector(".email-button");
    const cards = [...document.querySelectorAll(".project-card")];
    const stats = document.querySelector(".stats");
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), right: Math.round(b.right) };
    };
    // find any element wider than viewport
    const wide = [];
    for (const el of document.querySelectorAll("body *")) {
      const b = el.getBoundingClientRect();
      if (b.right > doc.clientWidth + 1 || b.left < -1) {
        wide.push(`${el.tagName}.${el.className?.toString().slice(0, 30)} right=${Math.round(b.right)}`);
      }
    }
    return {
      overflowX,
      clientWidth: doc.clientWidth,
      scrollWidth: doc.scrollWidth,
      topbar: r(topbar),
      nav: r(nav),
      brand: r(brand),
      h1: r(h1),
      term: r(term),
      emailBtn: r(emailBtn),
      cards: cards.map(r),
      stats: r(stats),
      wide: wide.slice(0, 12),
    };
  });

  console.log(`\n=== ${vp.name} ${vp.width}x${vp.height} ===`);
  console.log(JSON.stringify(metrics, null, 2));
  console.log("errors:", errors.length ? errors : "none");

  await page.screenshot({ path: `/tmp/shot-${vp.name}-top.png` });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/shot-${vp.name}-bottom.png` });
  await page.close();
}

await browser.close();
