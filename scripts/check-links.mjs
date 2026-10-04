// Checks every link on the rendered homepage: vysusgroup.com URLs must be in the live sitemap index and answer 200;
// other external URLs must answer (2xx/3xx; some social sites refuse bots, reported but not failed); every outbound
// link must open in a new tab with rel="noopener"; "#" links must point at an element on the page; no bare "#".
// Usage: node scripts/check-links.mjs [http://127.0.0.1:3040/]
const page = process.argv[2] ?? "http://127.0.0.1:3040/";
const UA = { "user-agent": "Mozilla/5.0 (Macintosh) Chrome/130" };
const html = await (await fetch(page)).text();
const locs = async (u) => [...(await (await fetch(u, { headers: UA })).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const index = await locs("https://www.vysusgroup.com/sitemaps-1-sitemap.xml");
const sitemap = new Set();
for (const u of index) (u.endsWith(".xml") ? await locs(u) : [u]).forEach((l) => sitemap.add(l.replace(/\/$/, "")));
const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map((m) => m[0]);
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const problems = [], seen = new Map();
for (const a of anchors) {
  const href = (a.match(/href="([^"]*)"/) ?? [])[1];
  if (!href) continue;
  const h = href.replace(/&amp;/g, "&");
  if (h.startsWith("#")) { if (h === "#") problems.push("bare # link"); else if (h !== "#top" && !ids.has(h.slice(1))) problems.push(`missing anchor ${h}`); continue; }
  if (!/target="_blank"/.test(a) || !/rel="noopener"/.test(a)) problems.push(`not new-tab/noopener: ${h}`);
  seen.set(h, null);
}
const SOCIAL = /linkedin\.com|twitter\.com|instagram\.com|youtube\.com/;
for (const h of seen.keys()) {
  const u = new URL(h);
  if (u.hostname === "www.vysusgroup.com" && u.pathname !== "/" && !sitemap.has(u.origin + u.pathname.replace(/\/$/, ""))) problems.push(`not in sitemap: ${h}`);
  let status;
  try { status = (await fetch(h, { headers: UA, redirect: "follow", signal: AbortSignal.timeout(15000) })).status; } catch (e) { status = "error " + e.message; }
  seen.set(h, status);
  if (!(typeof status === "number" && status < 400) && !SOCIAL.test(h)) problems.push(`${status}: ${h}`);
}
console.log(`${sitemap.size} sitemap URLs; ${seen.size} unique destinations, ${anchors.length} links`);
for (const [h, s] of seen) console.log(String(s).padEnd(6), h);
console.log(problems.length ? "\nPROBLEMS\n" + problems.join("\n") : "\nAll links OK");
