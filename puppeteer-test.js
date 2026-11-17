const puppeteer = require("puppeteer");

const URL = "http://127.0.0.1:4173/?v=38#u=939962710391672832&bg=glass&bgm=1&th=dark&ap=1";

(async () => {
  const browser = await puppeteer.launch({ headless: "new", executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push(`console:${msg.type()}:${msg.text()}`.slice(0, 180)));
  page.on("pageerror", (err) => logs.push(`pageerror:${String(err).slice(0, 180)}`));
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => document.querySelector("#card-name")?.textContent?.includes("Mr. Belly"), { timeout: 20000 });

  await page.evaluate(() => window.scrollTo(0, document.querySelector("#bg-picker").getBoundingClientRect().top + window.scrollY - 180));
  await page.hover('[data-bg="marble"]');
  await new Promise((r) => setTimeout(r, 400));
  const hover = await page.evaluate(() => ({
    preview: document.querySelector('[data-bg="marble"]').classList.contains("is-preview"),
    active: document.querySelector(".bg-option.is-active")?.dataset.bg,
    hasBg: document.body.classList.contains("has-bg")
  }));
  await page.mouse.move(8, 8);
  await new Promise((r) => setTimeout(r, 400));
  const hoverEnd = await page.evaluate(() => ({
    preview: document.querySelector('[data-bg="marble"]').classList.contains("is-preview"),
    active: document.querySelector(".bg-option.is-active")?.dataset.bg
  }));

  await page.click("#music-input");
  await page.type("#music-input", "On Sight Coco Jones");
  await page.waitForFunction(() => document.querySelectorAll("#music-results .result").length > 0, { timeout: 25000 });
  const results = await page.evaluate(() => Array.from(document.querySelectorAll("#music-results .result")).slice(0, 4).map((row) => ({
    title: row.querySelector(".result__title")?.textContent,
    badge: row.querySelector(".result__badge")?.textContent,
    time: row.querySelector(".result__time")?.textContent
  })));
  await page.click("#music-results .result");
  await new Promise((r) => setTimeout(r, 5000));
  const player = await page.evaluate(() => ({
    mode: document.querySelector("#music")?.dataset.mode,
    title: document.querySelector("#music-title")?.textContent,
    artist: document.querySelector("#music-artist")?.textContent,
    duration: document.querySelector("#music-duration")?.textContent,
    current: document.querySelector("#music-current")?.textContent,
    label: document.querySelector("#music-label")?.textContent,
    needsTap: document.querySelector("#music")?.classList.contains("is-needs-tap"),
    startVisible: !document.querySelector("#start-at")?.hidden,
    startValue: document.querySelector("#start-input")?.value
  }));

  await page.$eval("#start-input", (input) => { input.value = "0:29"; input.dispatchEvent(new Event("change", { bubbles: true })); });
  await new Promise((r) => setTimeout(r, 500));
  const start29 = await page.evaluate(() => ({
    value: document.querySelector("#start-input")?.value,
    warning: document.querySelector("#start-warning")?.hidden === false,
    toast: document.querySelector("#toast")?.textContent
  }));
  await page.$eval("#start-input", (input) => { input.value = "4:27"; input.dispatchEvent(new Event("change", { bubbles: true })); });
  await new Promise((r) => setTimeout(r, 500));
  const startEnd = await page.evaluate(() => ({
    value: document.querySelector("#start-input")?.value,
    toast: document.querySelector("#toast")?.textContent
  }));

  await page.evaluate(() => {
    window.__copied = "";
    try { navigator.clipboard.writeText = async (text) => { window.__copied = text; }; } catch {}
    try { Object.defineProperty(navigator, "clipboard", { value: { writeText: async (text) => { window.__copied = text; } }, configurable: true }); } catch {}
  });
  const name = "puppeteer-teste-" + Math.random().toString(36).slice(2, 7);
  await page.click("#share-name");
  await page.type("#share-name", name);
  await page.click("#copy-btn");
  await new Promise((r) => setTimeout(r, 12000));
  const copied = await page.evaluate(() => ({ url: window.__copied, toast: document.querySelector("#toast")?.textContent }));

  let share = null;
  if (copied.url) {
    const page2 = await browser.newPage();
    page2.on("pageerror", (err) => logs.push(`share-pageerror:${String(err).slice(0, 180)}`));
    await page2.goto(copied.url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page2.waitForFunction(() => document.querySelector("#card-name")?.textContent?.includes("Mr. Belly"), { timeout: 25000 });
    await new Promise((r) => setTimeout(r, 3500));
    share = await page2.evaluate(() => ({
      hash: location.hash,
      path: location.pathname,
      sharing: document.body.classList.contains("is-sharing"),
      card: document.querySelector("#card-name")?.textContent,
      mode: document.querySelector("#music")?.dataset.mode,
      title: document.querySelector("#music-title")?.textContent,
      duration: document.querySelector("#music-duration")?.textContent,
      label: document.querySelector("#music-label")?.textContent,
      needsTap: document.querySelector("#music")?.classList.contains("is-needs-tap"),
      intro: getComputedStyle(document.querySelector(".intro")).display
    }));
  }

  console.log(JSON.stringify({ hover, hoverEnd, results, player, start29, startEnd, copied, share, logs }, null, 2));
  await browser.close();
})().catch((error) => {
  console.error("TEST ERROR", error);
  process.exit(1);
});
