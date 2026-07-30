const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
p.author = "ProMarcom Inc.";
p.company = "ProMarcom Inc.";
p.title = "ProMarcom for Doft Candles — Diwali Pop-Up Retail Operations";

// ---------- Doft brand palette (sampled from doftcandles.com) ----------
const CREAM = "F6F1E6"; // page background (ivory)
const CARD  = "FCFAF5"; // card surface (warm white)
const SAND  = "EADFCE"; // subtle neutral fill
const ROSE  = "C39A98"; // signature dusty rose
const ROSEL = "D9BDB9"; // light rose
const DARK  = "4A343A"; // deep mauve-brown (dark slides)
const DARK2 = "3A2830"; // deeper mauve
const GOLD  = "B8924A"; // warm antique gold
const GOLDL = "D9B86B"; // light gold
const TERRA = "9E5A45"; // terracotta accent
const INK   = "35302B"; // charcoal text
const MUTED = "8C7F72"; // warm taupe-grey
const LINE  = "E3D8C7"; // hairline
const CREAMT = "F3ECE0"; // text on dark
const MUTEDD = "C9B4AC";  // muted text on dark

const SERIF = "Georgia";        // elegant serif — present on iOS, Mac & Windows
const SANS  = "Trebuchet MS";   // clean sans — present on iOS, Mac & Windows

const A = "assets/final/";
const W = 13.33, H = 7.5, M = 0.62;

function bg(slide, color) { slide.background = { color }; }

function goldDot(slide, x, y, r = 0.11, color = GOLD) {
  slide.addShape(p.ShapeType.ellipse, { x, y, w: r * 2, h: r * 2, fill: { color }, line: { type: "none" } });
}

// small ProMarcom logo on a clean white chip (logo art is transparent-bg)
function promTag(slide, x, y, w = 1.62) {
  const h = 0.5;
  slide.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.05,
    fill: { color: "FFFFFF" }, line: { color: LINE, width: 1 },
    shadow: { type: "outer", color: "B8A894", blur: 4, offset: 1, angle: 90, opacity: 0.35 } });
  const lw = w - 0.26, lh = lw * (104 / 456);
  slide.addImage({ path: A + "promarcom_logo_t.png", x: x + 0.13, y: y + (h - lh) / 2, w: lw, h: lh });
}

// Doft client-logo placeholder frame (user drops the real logo in)
function doftPlaceholder(slide, x, y, w, h, onDark = false) {
  slide.addShape(p.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: onDark ? "FFFFFF" : CARD, transparency: onDark ? 88 : 0 },
    line: { color: onDark ? MUTEDD : ROSE, width: 1, dashType: "dash" },
  });
  slide.addText("D  O  F  T", {
    x, y: y + 0.06, w, h: h - 0.34, fontFace: SERIF, fontSize: 22, bold: false,
    color: onDark ? CREAMT : INK, align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });
  slide.addText("client logo — placeholder", {
    x, y: y + h - 0.32, w, h: 0.26, fontFace: SANS, fontSize: 7.5, italic: true,
    color: onDark ? MUTEDD : MUTED, align: "center", valign: "middle", charSpacing: 1, margin: 0,
  });
}

function photo(slide, path, x, y, w, h, frame = true) {
  slide.addImage({ path: A + path, x, y, w, h, sizing: { type: "cover", w, h } });
  if (frame) slide.addShape(p.ShapeType.rect, { x, y, w, h, fill: { type: "none" }, line: { color: "FFFFFF", width: 1.5 } });
}

function contentTitle(slide, kicker, title) {
  slide.addText(kicker.toUpperCase(), {
    x: M, y: 0.44, w: W - 2 * M - 1.9, h: 0.3, fontFace: SANS, fontSize: 11, bold: true,
    color: GOLD, charSpacing: 3, align: "left", margin: 0,
  });
  slide.addText(title, {
    x: M, y: 0.74, w: W - 2 * M - 1.9, h: 0.72, fontFace: SERIF, fontSize: 31, bold: true,
    color: INK, align: "left", margin: 0,
  });
}

function pageFoot(slide, n, onDark = false) {
  slide.addText("ProMarcom  ×  Doft Candles", {
    x: M, y: H - 0.46, w: 5, h: 0.3, fontFace: SANS, fontSize: 8, color: onDark ? MUTEDD : MUTED, align: "left", margin: 0, charSpacing: 1,
  });
  slide.addText(String(n).padStart(2, "0"), {
    x: W - 1.1, y: H - 0.46, w: 0.6, h: 0.3, fontFace: SERIF, fontSize: 11, color: onDark ? MUTEDD : MUTED, align: "right", margin: 0,
  });
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(p.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.07,
    fill: { color: opts.fill || CARD }, line: opts.line || { color: LINE, width: 1 },
    shadow: opts.shadow === false ? undefined : { type: "outer", color: "CBBBA6", blur: 7, offset: 2, angle: 90, opacity: 0.4 },
  });
}

let sn = 0;
const nextn = () => ++sn;

// =========================================================
// SLIDE 1 — COVER
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM);
  // right-side candle imagery panel (clean hard edge)
  const px = 8.7;
  s.addImage({ path: A + "doft_hero_left.png", x: px, y: 0, w: W - px, h: H, sizing: { type: "cover", w: W - px, h: H } });
  s.addShape(p.ShapeType.line, { x: px, y: 0, w: 0, h: H, line: { color: "FFFFFF", width: 2 } });
  const TW = px - M - 0.3; // safe text width, clears the image

  doftPlaceholder(s, M, 0.6, 2.5, 0.95);

  s.addText("CONTRACTOR EXECUTION & PARTNERSHIP PROPOSAL", { x: M, y: 2.15, w: TW, h: 0.3, fontFace: SANS, fontSize: 11, bold: true, color: GOLD, charSpacing: 2, margin: 0 });
  s.addText("Diwali Pop-Up", { x: M, y: 2.55, w: TW, h: 0.95, fontFace: SERIF, fontSize: 50, bold: true, color: INK, margin: 0 });
  s.addText("Retail Operations", { x: M, y: 3.5, w: TW, h: 0.95, fontFace: SERIF, fontSize: 50, bold: true, color: TERRA, margin: 0 });

  s.addShape(p.ShapeType.line, { x: M + 0.02, y: 4.6, w: 3.6, h: 0, line: { color: ROSE, width: 1.5 } });
  s.addText([
    { text: "For  ", options: { color: MUTED } },
    { text: "Doft Candles", options: { color: INK, bold: true } },
    { text: "     ·     Diwali Seasons 2026 · 2027 · 2028", options: { color: MUTED } },
  ], { x: M, y: 4.76, w: TW, h: 0.4, fontFace: SANS, fontSize: 13, margin: 0 });

  s.addText("“Experiencing the world through scent.”", { x: M, y: 5.5, w: TW, h: 0.4, fontFace: SERIF, italic: true, fontSize: 15, color: ROSE, margin: 0 });

  s.addText("Prepared by", { x: M, y: 6.28, w: 1.4, h: 0.5, fontFace: SANS, fontSize: 9, italic: true, color: MUTED, valign: "middle", margin: 0 });
  promTag(s, M + 1.15, 6.24, 1.7);
}

// =========================================================
// SLIDE 2 — Understanding your brief
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "The Ask", "Understanding your brief");
  promTag(s, W - M - 1.62, 0.46);
  s.addText("Premium seasonal pop-up kiosks in leading malls — staffed and run end-to-end, as a long-term partner for Diwali 2026–28.",
    { x: M, y: 1.52, w: W - 2 * M, h: 0.4, fontFace: SANS, fontSize: 12.5, color: MUTED, margin: 0 });

  const items = [
    ["3–5 wks", "Operating window before Diwali, each season"],
    ["~300 sq ft", "Kiosk footprint, plus a ~90 sq ft stockroom"],
    ["2–4", "Pop-ups per region, across multiple cities"],
    ["12 / kiosk", "Full staffing team at every pop-up"],
    ["1-day", "Doft product & sales training, 100% attendance"],
    ["Doft supplies", "Stock, furniture, POS/EDC, returnable uniforms"],
  ];
  const cols = 3, cw = (W - 2 * M - 2 * 0.35) / cols, ch = 1.5, gy = 0.32;
  items.forEach((it, i) => {
    const cx = M + (i % cols) * (cw + 0.35);
    const cy = 2.15 + Math.floor(i / cols) * (ch + gy);
    card(s, cx, cy, cw, ch);
    goldDot(s, cx + 0.28, cy + 0.36, 0.05, ROSE);
    s.addText(it[0], { x: cx + 0.45, y: cy + 0.2, w: cw - 0.6, h: 0.5, fontFace: SERIF, fontSize: 24, bold: true, color: TERRA, margin: 0 });
    s.addText(it[1], { x: cx + 0.28, y: cy + 0.78, w: cw - 0.5, h: 0.6, fontFace: SANS, fontSize: 11, color: INK, margin: 0, valign: "top" });
  });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 3 — Why ProMarcom (dark)
// =========================================================
{
  const s = p.addSlide(); bg(s, DARK); const n = nextn();
  s.addShape(p.ShapeType.ellipse, { x: 10.9, y: -1.6, w: 4.6, h: 4.6, fill: { color: DARK2 }, line: { type: "none" } });
  s.addText("WHY PROMARCOM", { x: M, y: 0.56, w: 10, h: 0.3, fontFace: SANS, fontSize: 11, bold: true, color: GOLDL, charSpacing: 3, margin: 0 });
  s.addText("A partner built for premium mall retail", { x: M, y: 0.88, w: 12, h: 0.7, fontFace: SERIF, fontSize: 31, bold: true, color: CREAMT, margin: 0 });
  s.addText("ProMarcom delivers below-the-line, retail and experiential marketing end to end — concept, design, fabrication, manpower, operations and reporting.",
    { x: M, y: 1.62, w: 12, h: 0.5, fontFace: SANS, fontSize: 12.5, color: MUTEDD, margin: 0 });

  const pillars = [
    ["Mall & Retail Promotions", "Multi-month mall activations and in-shop demonstrations for global brands."],
    ["Premium Retail VM", "Show-windows & VM for Burberry, Louis Vuitton, LG, Samsung across 90+ cities."],
    ["Manpower at Scale", "Recruit, train, deploy and manage large field teams with tracking and reporting."],
    ["Exhibitions & Events", "1,000–24,000 sqm exhibitions; events for LG, Samsung, HP, ICC World Cup."],
  ];
  const cw = (W - 2 * M - 3 * 0.3) / 4, cy = 2.5, ch = 3.5;
  pillars.forEach((it, i) => {
    const cx = M + i * (cw + 0.3);
    s.addShape(p.ShapeType.roundRect, { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.07, fill: { color: DARK2 }, line: { color: "5C4048", width: 1 } });
    s.addShape(p.ShapeType.ellipse, { x: cx + 0.3, y: cy + 0.35, w: 0.55, h: 0.55, fill: { color: GOLD }, line: { type: "none" } });
    s.addText(String(i + 1), { x: cx + 0.3, y: cy + 0.35, w: 0.55, h: 0.55, fontFace: SERIF, fontSize: 20, bold: true, color: DARK2, align: "center", valign: "middle", margin: 0 });
    s.addText(it[0], { x: cx + 0.28, y: cy + 1.15, w: cw - 0.56, h: 0.85, fontFace: SERIF, fontSize: 16, bold: true, color: CREAMT, margin: 0, valign: "top" });
    s.addText(it[1], { x: cx + 0.28, y: cy + 2.0, w: cw - 0.56, h: 1.3, fontFace: SANS, fontSize: 10.5, color: MUTEDD, margin: 0, valign: "top" });
  });
  pageFoot(s, n, true);
}

// =========================================================
// SLIDE 4 — Proven track record
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Credentials", "A proven track record");
  promTag(s, W - M - 1.62, 0.46);
  const stats = [
    ["90+", "Cities covered for retail VM & activations"],
    ["3,000", "Man-days on one multi-city retail rollout"],
    ["24,000", "Sqm of exhibition floor managed (max)"],
    ["6+ yrs", "As LG's BTL / retail / digital partner"],
  ];
  const cw = (W - 2 * M - 3 * 0.3) / 4, cy = 1.65, ch = 1.85;
  stats.forEach((it, i) => {
    const cx = M + i * (cw + 0.3);
    card(s, cx, cy, cw, ch);
    s.addText(it[0], { x: cx + 0.22, y: cy + 0.24, w: cw - 0.4, h: 0.7, fontFace: SERIF, fontSize: 33, bold: true, color: TERRA, align: "left", margin: 0 });
    s.addText(it[1], { x: cx + 0.22, y: cy + 1.0, w: cw - 0.4, h: 0.75, fontFace: SANS, fontSize: 10.5, color: INK, margin: 0, valign: "top" });
  });
  s.addText("Trusted by leading brands", { x: M, y: 3.85, w: 11, h: 0.35, fontFace: SANS, fontSize: 12, bold: true, color: MUTED, charSpacing: 1, margin: 0 });
  const clients = ["LG", "Samsung", "Hewlett-Packard", "Bajaj", "Castrol", "Pepsi", "ITC", "Burberry", "Louis Vuitton", "Panasonic", "Pearson", "ICC World Cup"];
  const perRow = 6, gap = 0.2, chh = 0.62;
  const chw = (W - 2 * M - (perRow - 1) * gap) / perRow;
  clients.forEach((c, i) => {
    const cx = M + (i % perRow) * (chw + gap);
    const cy2 = 4.3 + Math.floor(i / perRow) * (chh + gap);
    s.addShape(p.ShapeType.roundRect, { x: cx, y: cy2, w: chw, h: chh, rectRadius: 0.05, fill: { color: CARD }, line: { color: LINE, width: 1 } });
    s.addText(c, { x: cx + 0.05, y: cy2, w: chw - 0.1, h: chh, fontFace: SERIF, fontSize: 12, bold: true, color: INK, align: "center", valign: "middle", margin: 0 });
  });
  s.addText("Illustrative selection from ProMarcom credentials.", { x: M, y: 6.35, w: 10, h: 0.3, fontFace: SANS, fontSize: 8.5, italic: true, color: MUTED, margin: 0 });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 5 — Directly relevant experience (real photos)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Relevant Experience", "We have run exactly this before");
  promTag(s, W - M - 1.62, 0.46);
  const cases = [
    ["hp_mall_promo.png", "HP — Mall Promotions", "Mumbai & Bengaluru", "3-month mall promotion: fabrication, manpower, props, merchandising, logistics & reporting."],
    ["burberry_window.png", "Burberry & Louis Vuitton", "Premium Retail VM", "Luxury show-windows, in-shop props & merchandise — the premium standard Doft demands."],
    ["hp_veg_cart.png", "LG Cookie Pep Carnival", "70+ cities · 3,000 man-days", "Shop-to-shop retail activation across India — multi-city manpower at scale."],
  ];
  const cw = (W - 2 * M - 2 * 0.35) / 3, cy = 1.68, ch = 4.5, ih = 2.0;
  cases.forEach((it, i) => {
    const cx = M + i * (cw + 0.35);
    card(s, cx, cy, cw, ch);
    photo(s, it[0], cx + 0.12, cy + 0.12, cw - 0.24, ih);
    s.addText(it[1], { x: cx + 0.22, y: cy + ih + 0.22, w: cw - 0.44, h: 0.5, fontFace: SERIF, fontSize: 15, bold: true, color: INK, margin: 0, valign: "top" });
    s.addText(it[2], { x: cx + 0.22, y: cy + ih + 0.68, w: cw - 0.44, h: 0.3, fontFace: SANS, fontSize: 10, italic: true, color: TERRA, margin: 0 });
    s.addText(it[3], { x: cx + 0.22, y: cy + ih + 1.02, w: cw - 0.44, h: 1.2, fontFace: SANS, fontSize: 10.5, color: INK, margin: 0, valign: "top" });
  });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 6 — Operating model
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Our Approach", "One accountable partner, end to end");
  promTag(s, W - M - 1.62, 0.46);
  const steps = [
    ["Kiosk Build", "On-site fabrication & install to Doft design"],
    ["Mall & Legal", "Liaison, licences, permits, approvals"],
    ["Logistics", "Ghaziabad pickup, replenishment, returns"],
    ["Recruit & Staff", "Hire, BGV, payroll, statutory compliance"],
    ["Training", "100% attendance + a trained bench"],
    ["Store Ops", "Open–close, sales, POS, VM, cash"],
    ["Reporting", "Daily sales, footfall, stock, attendance"],
  ];
  const cw = 2.85, chh = 1.6;
  const topXs = [M, M + 3.05, M + 6.1, M + 9.15];
  const botXs = [M + 1.5, M + 4.55, M + 7.6];
  steps.slice(0, 4).forEach((it, i) => {
    const cx = topXs[i], cy = 1.95;
    card(s, cx, cy, cw, chh);
    s.addText(String(i + 1), { x: cx + 0.2, y: cy + 0.16, w: 0.5, h: 0.4, fontFace: SERIF, fontSize: 17, bold: true, color: GOLD, margin: 0 });
    s.addText(it[0], { x: cx + 0.2, y: cy + 0.52, w: cw - 0.4, h: 0.4, fontFace: SERIF, fontSize: 15, bold: true, color: INK, margin: 0 });
    s.addText(it[1], { x: cx + 0.2, y: cy + 0.92, w: cw - 0.4, h: 0.6, fontFace: SANS, fontSize: 10, color: INK, margin: 0, valign: "top" });
  });
  steps.slice(4).forEach((it, i) => {
    const cx = botXs[i], cy = 3.9;
    card(s, cx, cy, cw, chh, { fill: DARK });
    s.addText(String(i + 5), { x: cx + 0.2, y: cy + 0.16, w: 0.5, h: 0.4, fontFace: SERIF, fontSize: 17, bold: true, color: GOLDL, margin: 0 });
    s.addText(it[0], { x: cx + 0.2, y: cy + 0.52, w: cw - 0.4, h: 0.4, fontFace: SERIF, fontSize: 15, bold: true, color: CREAMT, margin: 0 });
    s.addText(it[1], { x: cx + 0.2, y: cy + 0.92, w: cw - 0.4, h: 0.6, fontFace: SANS, fontSize: 10, color: MUTEDD, margin: 0, valign: "top" });
  });
  s.addText("A single Team Leader on ProMarcom's payroll owns daily operations at every kiosk — your one point of contact.",
    { x: M, y: 5.8, w: W - 2 * M, h: 0.5, fontFace: SERIF, italic: true, fontSize: 13, color: TERRA, align: "center", margin: 0 });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 7 — Staffing model
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Staffing", "12 people per kiosk — exactly to brief");
  promTag(s, W - M - 1.62, 0.46);
  const roles = [
    ["6", "Sales Executives", "Female, 22–25, fluent English, retail experience"],
    ["2", "Sales Support", "Merchandising, stock, queue management"],
    ["1", "Helper", "Housekeeping & material handling"],
    ["1", "Cashier", "Experienced on POS / EDC machines"],
    ["1", "Driver", "Stock transport & replenishment runs"],
    ["1", "Team Leader", "Permanent ProMarcom employee — ops owner"],
  ];
  const cw = (W - 2 * M - 2 * 0.35) / 3, ch = 1.72, gy = 0.3;
  roles.forEach((it, i) => {
    const cx = M + (i % 3) * (cw + 0.35);
    const cy = 1.72 + Math.floor(i / 3) * (ch + gy);
    card(s, cx, cy, cw, ch);
    s.addShape(p.ShapeType.ellipse, { x: cx + 0.24, y: cy + 0.3, w: 0.82, h: 0.82, fill: { color: i === 5 ? DARK : CREAM }, line: { color: GOLD, width: 1.5 } });
    s.addText(it[0], { x: cx + 0.24, y: cy + 0.3, w: 0.82, h: 0.82, fontFace: SERIF, fontSize: 25, bold: true, color: i === 5 ? GOLDL : TERRA, align: "center", valign: "middle", margin: 0 });
    s.addText(it[1], { x: cx + 1.25, y: cy + 0.32, w: cw - 1.45, h: 0.5, fontFace: SERIF, fontSize: 15, bold: true, color: INK, margin: 0, valign: "top" });
    s.addText(it[2], { x: cx + 1.25, y: cy + 0.8, w: cw - 1.45, h: 0.8, fontFace: SANS, fontSize: 9.5, color: INK, margin: 0, valign: "top" });
  });
  s.addShape(p.ShapeType.roundRect, { x: M, y: 5.85, w: W - 2 * M, h: 0.72, rectRadius: 0.07, fill: { color: DARK }, line: { type: "none" } });
  s.addText([
    { text: "12 per kiosk", options: { bold: true, color: GOLDL } },
    { text: "   ×   pop-ups   =   your deployed field force.   Illustrative 9-kiosk rollout  =  ", options: { color: CREAMT } },
    { text: "108 trained staff", options: { bold: true, color: GOLDL } },
  ], { x: M + 0.3, y: 5.85, w: W - 2 * M - 0.6, h: 0.72, fontFace: SANS, fontSize: 14, valign: "middle", margin: 0 });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 8 — Recruit, train, guarantee
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "People", "Recruit  ·  Train  ·  Guarantee");
  promTag(s, W - M - 1.62, 0.46);
  const cols = [
    ["Recruit & Verify", ["City-level sourcing & referrals", "Prioritise proven prior-season staff", "Background verification before deploy", "Onboard to payroll, full compliance"]],
    ["Train to Doft Standard", ["100% attendance at Doft's 1-day training", "Scheduled 10–21 days before go-live", "Completion tracked per candidate", "Replacements trained too — always equal"]],
    ["Zero-Gap Guarantee", ["~15% trained bench held per city", "Immediate same-day replacement", "Attrition covered at no extra cost", "Trading never stops for a vacancy"]],
  ];
  const cw = (W - 2 * M - 2 * 0.35) / 3, cy = 1.68, ch = 3.65;
  cols.forEach((c, i) => {
    const cx = M + i * (cw + 0.35);
    card(s, cx, cy, cw, ch);
    s.addShape(p.ShapeType.ellipse, { x: cx + 0.25, y: cy + 0.3, w: 0.5, h: 0.5, fill: { color: ROSE }, line: { type: "none" } });
    s.addText(String(i + 1), { x: cx + 0.25, y: cy + 0.3, w: 0.5, h: 0.5, fontFace: SERIF, fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
    s.addText(c[0], { x: cx + 0.9, y: cy + 0.3, w: cw - 1.1, h: 0.5, fontFace: SERIF, fontSize: 15, bold: true, color: INK, margin: 0, valign: "middle" });
    s.addText(c[1].map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 12 }, color: INK, breakLine: true, paraSpaceAfter: 8 } })),
      { x: cx + 0.3, y: cy + 1.05, w: cw - 0.55, h: 2.45, fontFace: SANS, fontSize: 10.5, margin: 0, valign: "top" });
  });
  s.addShape(p.ShapeType.roundRect, { x: M, y: 5.7, w: W - 2 * M, h: 0.82, rectRadius: 0.07, fill: { color: TERRA }, line: { type: "none" } });
  s.addText("Contractual commitment:  any attrition after training or during operations is replaced immediately with equally-trained staff — at no additional cost to Doft.",
    { x: M + 0.3, y: 5.7, w: W - 2 * M - 0.6, h: 0.82, fontFace: SANS, fontSize: 12.5, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 9 — Kiosk, mall coordination & compliance
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Setup", "Kiosk, mall coordination & compliance");
  promTag(s, W - M - 1.62, 0.46);
  const rows = [
    ["Kiosk fabrication & install", "On-site fabrication to Doft-approved design; transport, install, maintain, dismantle & return fixtures — with a 3-day buffer before go-live."],
    ["Mall coordination", "Liaison with mall management; electricity, access passes, loading/unloading and operational approvals."],
    ["Legal & licensing", "All permissions, licences and documentation — started at T-7 weeks to de-risk go-live."],
    ["Compliance sign-off", "Shops & Establishment, GST/e-invoicing, PF/ESIC, insurance, fire & electrical, staff BGV — signed before opening."],
  ];
  const cy0 = 1.75, rh = 1.12, gap = 0.12;
  rows.forEach((it, i) => {
    const cy = cy0 + i * (rh + gap);
    card(s, M, cy, W - 2 * M, rh, { shadow: false });
    s.addShape(p.ShapeType.ellipse, { x: M + 0.3, y: cy + 0.31, w: 0.5, h: 0.5, fill: { color: DARK }, line: { type: "none" } });
    s.addText(String(i + 1), { x: M + 0.3, y: cy + 0.31, w: 0.5, h: 0.5, fontFace: SERIF, fontSize: 18, bold: true, color: GOLDL, align: "center", valign: "middle", margin: 0 });
    s.addText(it[0], { x: M + 1.05, y: cy + 0.12, w: 3.2, h: rh - 0.24, fontFace: SERIF, fontSize: 15, bold: true, color: INK, margin: 0, valign: "middle" });
    s.addText(it[1], { x: M + 4.35, y: cy + 0.12, w: W - 2 * M - 4.65, h: rh - 0.24, fontFace: SANS, fontSize: 11, color: INK, margin: 0, valign: "middle" });
  });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 10 — Logistics & replenishment
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Supply Chain", "Logistics & stock replenishment");
  promTag(s, W - M - 1.62, 0.46);
  const flow = [
    ["Ghaziabad Warehouse", "Collect from Doft's warehouse; insured in transit"],
    ["Stockroom · ~90 sq ft", "Local buffer beside each kiosk for fast refill"],
    ["Kiosk Shelf", "Daily fill to plan; reorder at minimum levels"],
    ["Reconcile & Return", "Daily counts; unsold stock returned & reconciled"],
  ];
  const gapx = 0.55, cy = 2.15, ch = 2.75;
  const cw = (W - 2 * M - 3 * gapx) / 4;
  flow.forEach((it, i) => {
    const cx = M + i * (cw + gapx);
    card(s, cx, cy, cw, ch);
    s.addShape(p.ShapeType.ellipse, { x: cx + cw / 2 - 0.35, y: cy + 0.4, w: 0.7, h: 0.7, fill: { color: ROSE }, line: { type: "none" } });
    s.addText(String(i + 1), { x: cx + cw / 2 - 0.35, y: cy + 0.4, w: 0.7, h: 0.7, fontFace: SERIF, fontSize: 22, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
    s.addText(it[0], { x: cx + 0.12, y: cy + 1.35, w: cw - 0.24, h: 0.7, fontFace: SERIF, fontSize: 13.5, bold: true, color: INK, align: "center", margin: 0, valign: "top" });
    s.addText(it[1], { x: cx + 0.15, y: cy + 1.95, w: cw - 0.3, h: 0.7, fontFace: SANS, fontSize: 9.5, color: MUTED, align: "center", margin: 0, valign: "top" });
    if (i < 3) s.addText("→", { x: cx + cw + 0.03, y: cy + 0.55, w: gapx - 0.06, h: 0.7, fontFace: SANS, fontSize: 22, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
  });
  s.addShape(p.ShapeType.roundRect, { x: M, y: 5.55, w: W - 2 * M, h: 0.82, rectRadius: 0.07, fill: { color: SAND }, line: { type: "none" } });
  s.addText("Timely replenishment protects peak-day sales — no stock-outs when footfall is highest.",
    { x: M + 0.3, y: 5.55, w: W - 2 * M - 0.6, h: 0.82, fontFace: SERIF, italic: true, fontSize: 14, color: TERRA, align: "center", valign: "middle", margin: 0 });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 11 — Store operations & daily reporting
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Operations", "Daily operations & reporting");
  promTag(s, W - M - 1.62, 0.46);
  s.addText("Consistent open-to-close execution, with a standard daily report to Doft per kiosk — consolidated by city.",
    { x: M, y: 1.52, w: W - 2 * M, h: 0.4, fontFace: SANS, fontSize: 12, color: MUTED, margin: 0 });
  const reports = ["Sales", "Footfall", "Conversion", "Inventory", "Replenishment", "Attendance", "Customer Feedback", "Operational Issues"];
  const cw = (W - 2 * M - 3 * 0.3) / 4, ch = 1.2, gy = 0.3;
  reports.forEach((r, i) => {
    const cx = M + (i % 4) * (cw + 0.3);
    const cy = 2.2 + Math.floor(i / 4) * (ch + gy);
    card(s, cx, cy, cw, ch);
    s.addShape(p.ShapeType.ellipse, { x: cx + 0.26, y: cy + ch / 2 - 0.09, w: 0.18, h: 0.18, fill: { color: GOLD }, line: { type: "none" } });
    s.addText(r, { x: cx + 0.52, y: cy, w: cw - 0.66, h: ch, fontFace: SERIF, fontSize: 12.5, bold: true, color: INK, valign: "middle", margin: 0 });
  });
  s.addShape(p.ShapeType.roundRect, { x: M, y: 5.5, w: W - 2 * M, h: 1.02, rectRadius: 0.07, fill: { color: DARK }, line: { type: "none" } });
  s.addText("GOVERNANCE CADENCE", { x: M + 0.35, y: 5.63, w: 5, h: 0.32, fontFace: SANS, fontSize: 10, bold: true, color: GOLDL, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Daily", options: { bold: true, color: GOLDL } }, { text: " written report     ", options: { color: CREAMT } },
    { text: "·   ", options: { color: GOLD } },
    { text: "Weekly", options: { bold: true, color: GOLDL } }, { text: " city review call     ", options: { color: CREAMT } },
    { text: "·   ", options: { color: GOLD } },
    { text: "End-of-season", options: { bold: true, color: GOLDL } }, { text: " reconciliation", options: { color: CREAMT } },
  ], { x: M + 0.35, y: 5.98, w: W - 2 * M - 0.7, h: 0.42, fontFace: SANS, fontSize: 12.5, margin: 0, valign: "middle" });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 12 — Project timeline
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Plan", "Project timeline");
  promTag(s, W - M - 1.62, 0.46);
  const line_y = 3.45, lw = 1.7;
  const startX = M + lw / 2, endX = W - M - lw / 2;
  s.addShape(p.ShapeType.line, { x: startX, y: line_y, w: endX - startX, h: 0, line: { color: ROSE, width: 2 } });
  const ph = [
    ["T-8w", "Award & kick-off", 1], ["T-7w", "Malls & licences", 0], ["T-6w", "Recruit & BGV", 1],
    ["T-3w", "Kiosk fit-out", 0], ["T-2w", "Doft training", 1], ["T-1w", "Stock & first fill", 0],
    ["T", "Go-live — ops", 1], ["T+6w", "Dismantle & review", 0],
  ];
  ph.forEach((it, i) => {
    const cx = startX + (endX - startX) * (i / (ph.length - 1));
    const up = it[2] === 1;
    const boxY = up ? line_y - 1.5 : line_y + 0.5;
    const bx = cx - lw / 2;
    s.addText(it[0], { x: bx, y: boxY, w: lw, h: 0.3, fontFace: SERIF, fontSize: 14, bold: true, color: TERRA, align: "center", margin: 0 });
    s.addText(it[1], { x: bx, y: boxY + 0.32, w: lw, h: 0.6, fontFace: SANS, fontSize: 10.5, color: INK, align: "center", margin: 0, valign: up ? "bottom" : "top" });
    s.addShape(p.ShapeType.line, { x: cx, y: up ? boxY + 0.92 : line_y, w: 0, h: up ? line_y - (boxY + 0.92) : boxY - line_y, line: { color: LINE, width: 1 } });
    goldDot(s, cx - 0.11, line_y - 0.11, 0.11, DARK);
  });
  s.addText("Relative to go-live (T). Operations run 3–5 weeks per the brief. Full per-region Gantt is in the operations workbook.",
    { x: M, y: 6.25, w: W - 2 * M, h: 0.4, fontFace: SANS, fontSize: 10, italic: true, color: MUTED, align: "center", margin: 0 });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 13 — Illustrative rollout & scale (dark)
// =========================================================
{
  const s = p.addSlide(); bg(s, DARK); const n = nextn();
  s.addText("ROLLOUT", { x: M, y: 0.56, w: 10, h: 0.3, fontFace: SANS, fontSize: 11, bold: true, color: GOLDL, charSpacing: 3, margin: 0 });
  s.addText("An illustrative first-season footprint", { x: M, y: 0.88, w: 12, h: 0.7, fontFace: SERIF, fontSize: 31, bold: true, color: CREAMT, margin: 0 });
  s.addText("A starting scenario for a premium brand — fully scalable. Final cities & kiosk counts are yours to set.",
    { x: M, y: 1.62, w: 12, h: 0.4, fontFace: SANS, fontSize: 12.5, color: MUTEDD, margin: 0 });
  const cities = [["Delhi-NCR", "3 kiosks"], ["Mumbai", "3 kiosks"], ["Bengaluru", "3 kiosks"]];
  const cw = (W - 2 * M - 2 * 0.4) / 3, cy = 2.5, ch = 1.85;
  cities.forEach((c, i) => {
    const cx = M + i * (cw + 0.4);
    s.addShape(p.ShapeType.roundRect, { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.07, fill: { color: DARK2 }, line: { color: "5C4048", width: 1 } });
    s.addText(c[0], { x: cx + 0.3, y: cy + 0.35, w: cw - 0.6, h: 0.6, fontFace: SERIF, fontSize: 22, bold: true, color: CREAMT, margin: 0 });
    s.addText(c[1], { x: cx + 0.3, y: cy + 1.05, w: cw - 0.6, h: 0.5, fontFace: SANS, fontSize: 13, color: GOLDL, margin: 0 });
  });
  const stats = [["9", "Total kiosks"], ["108", "Trained staff"], ["3–5 wks", "Operating window"], ["2028", "Committed through"]];
  const sw = (W - 2 * M - 3 * 0.4) / 4, sy = 4.75, sh = 1.45;
  stats.forEach((c, i) => {
    const cx = M + i * (sw + 0.4);
    s.addShape(p.ShapeType.line, { x: cx, y: sy, w: 0, h: sh, line: { color: GOLD, width: 2 } });
    s.addText(c[0], { x: cx + 0.2, y: sy, w: sw - 0.2, h: 0.85, fontFace: SERIF, fontSize: 38, bold: true, color: GOLDL, margin: 0 });
    s.addText(c[1], { x: cx + 0.2, y: sy + 0.92, w: sw - 0.2, h: 0.5, fontFace: SANS, fontSize: 11.5, color: MUTEDD, margin: 0, valign: "top" });
  });
  s.addText("Scenario only — the brief specifies 2–4 pop-ups per region across multiple cities. Change two inputs in the workbook to re-scope.",
    { x: M, y: 6.5, w: W - 2 * M, h: 0.4, fontFace: SANS, fontSize: 10, italic: true, color: MUTEDD, margin: 0 });
  pageFoot(s, n, true);
}

// =========================================================
// SLIDE 14 — Commercial model (chart)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Commercials", "A transparent, built-up cost model");
  promTag(s, W - M - 1.62, 0.46);
  s.addText("Priced bottom-up per kiosk, then rolled up. Every line is an editable input in the workbook.",
    { x: M, y: 1.5, w: W - 2 * M, h: 0.4, fontFace: SANS, fontSize: 12, color: MUTED, margin: 0 });
  const data = [{
    name: "Per-kiosk cost heads",
    labels: ["Manpower", "Mall licence*", "Kiosk fabrication", "Logistics & stockroom", "Welfare & incentives", "Other setup & compliance"],
    values: [393, 250, 225, 100, 55, 102],
  }];
  s.addChart(p.ChartType.doughnut, data, {
    x: M, y: 2.05, w: 5.6, h: 4.15, holeSize: 56,
    chartColors: [TERRA, ROSE, DARK, GOLD, "C9B9A6", "E0D4C1"],
    showLegend: true, legendPos: "b", legendColor: INK, legendFontFace: SANS, legendFontSize: 9,
    showTitle: false, showValue: false,
  });
  const bx = 6.7, bw = W - M - bx;
  const rows = [
    ["Direct cost / kiosk", "₹ 11.3 L", INK], ["+ Management margin (15%)", "₹ 1.7 L", INK],
    ["Contract value / kiosk (pre-GST)", "₹ 12.9 L", TERRA], ["× 9 kiosks (illustrative)", "₹ 1.16 Cr", TERRA],
    ["+ GST (18%)", "₹ 0.21 Cr", INK], ["Total programme (incl. GST)", "₹ 1.37 Cr", GOLD],
  ];
  const rh = 0.62;
  rows.forEach((r, i) => {
    const cy = 2.1 + i * (rh + 0.06);
    const strong = i === 5;
    s.addShape(p.ShapeType.roundRect, { x: bx, y: cy, w: bw, h: rh, rectRadius: 0.05, fill: { color: strong ? DARK : CARD }, line: { color: LINE, width: 1 } });
    s.addText(r[0], { x: bx + 0.2, y: cy, w: bw - 2.0, h: rh, fontFace: SANS, fontSize: 11.5, bold: i >= 2, color: strong ? CREAMT : INK, valign: "middle", margin: 0 });
    s.addText(r[1], { x: bx + bw - 1.9, y: cy, w: 1.7, h: rh, fontFace: SERIF, fontSize: 14, bold: true, color: strong ? GOLDL : r[2], align: "right", valign: "middle", margin: 0 });
  });
  s.addText("* Mall licence / space fee is the biggest swing item and is often reimbursed by the brand. Figures illustrative at placeholder rates.",
    { x: M, y: 6.5, w: W - 2 * M, h: 0.4, fontFace: SANS, fontSize: 8.5, italic: true, color: MUTED, margin: 0 });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 15 — Governance & risk
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Assurance", "How we protect the season");
  promTag(s, W - M - 1.62, 0.46);
  const risks = [
    ["Staff attrition after training", "15% trained bench; same-day no-cost replacement"],
    ["Mall permission delays", "Licensing kicked off at T-7w; parallel mall shortlist"],
    ["Stock-out on peak days", "Reorder levels + daily replenishment from stockroom"],
    ["POS / EDC downtime", "Backup EDC + connectivity failover; trained cashier"],
    ["Kiosk fabrication delay", "Vendor SLA + 3-day buffer before go-live"],
  ];
  const tx = M, tw = W - 2 * M, rh = 0.9, ty = 1.8, split = 4.5, hh = 0.52;
  s.addShape(p.ShapeType.rect, { x: tx, y: ty, w: split, h: hh, fill: { color: DARK }, line: { type: "none" } });
  s.addShape(p.ShapeType.rect, { x: tx + split, y: ty, w: tw - split, h: hh, fill: { color: DARK2 }, line: { type: "none" } });
  s.addText("RISK", { x: tx + 0.28, y: ty, w: split - 0.4, h: hh, fontFace: SANS, fontSize: 11, bold: true, color: GOLDL, valign: "middle", charSpacing: 2, margin: 0 });
  s.addText("MITIGATION", { x: tx + split + 0.28, y: ty, w: tw - split - 0.4, h: hh, fontFace: SANS, fontSize: 11, bold: true, color: GOLDL, valign: "middle", charSpacing: 2, margin: 0 });
  risks.forEach((r, i) => {
    const cy = ty + hh + i * rh;
    s.addShape(p.ShapeType.rect, { x: tx, y: cy, w: tw, h: rh, fill: { color: i % 2 ? CARD : SAND }, line: { color: LINE, width: 0.5 } });
    s.addText(r[0], { x: tx + 0.28, y: cy, w: split - 0.45, h: rh, fontFace: SERIF, fontSize: 12.5, bold: true, color: INK, valign: "middle", margin: 0 });
    s.addText(r[1], { x: tx + split + 0.28, y: cy, w: tw - split - 0.55, h: rh, fontFace: SANS, fontSize: 11.5, color: INK, valign: "middle", margin: 0 });
  });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 16 — The operations workbook
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Toolkit", "The operations workbook");
  promTag(s, W - M - 1.62, 0.46);
  s.addText("This deck ships with a live Excel workbook — the operating system for the engagement. Edit the assumptions; everything recalculates.",
    { x: M, y: 1.5, w: W - 2 * M, h: 0.4, fontFace: SANS, fontSize: 12, color: MUTED, margin: 0 });
  const tabs = ["Assumptions", "Project Timeline", "Staffing Plan", "Manpower Cost", "Budget Summary", "Recruitment Tracker",
    "Attendance", "Daily Sales", "Inventory & Replenish", "Footfall & Conversion", "Customer Feedback", "Compliance Checklist", "Risk Register"];
  const cols = 4, cw = (W - 2 * M - 3 * 0.3) / cols, ch = 0.92, gy = 0.24;
  tabs.forEach((t, i) => {
    const cx = M + (i % cols) * (cw + 0.3);
    const cy = 2.2 + Math.floor(i / cols) * (ch + gy);
    card(s, cx, cy, cw, ch, { shadow: false });
    s.addText(String(i + 1).padStart(2, "0"), { x: cx + 0.2, y: cy, w: 0.7, h: ch, fontFace: SERIF, fontSize: 18, bold: true, color: GOLD, valign: "middle", margin: 0 });
    s.addText(t, { x: cx + 0.85, y: cy, w: cw - 1.0, h: ch, fontFace: SANS, fontSize: 10.5, bold: true, color: INK, valign: "middle", margin: 0 });
  });
  pageFoot(s, n);
}

// =========================================================
// SLIDE 17 — Closing + contact (dark, with Doft giftbox)
// =========================================================
{
  const s = p.addSlide(); bg(s, DARK);
  const px = 8.9;
  s.addImage({ path: A + "doft_giftbox.png", x: px, y: 0, w: W - px, h: H, sizing: { type: "cover", w: W - px, h: H } });
  s.addShape(p.ShapeType.rect, { x: px - 0.7, y: 0, w: 1.1, h: H, fill: { color: DARK, transparency: 35 }, line: { type: "none" } });

  s.addText("Let's make Doft's Diwali unmissable.", { x: M, y: 1.3, w: 8.1, h: 1.7, fontFace: SERIF, fontSize: 38, bold: true, color: CREAMT, margin: 0 });
  s.addText("A premium retail partner with proven mall, VM and multi-city manpower experience — committed to Doft for Diwali 2026, 2027 and 2028.",
    { x: M, y: 3.05, w: 7.6, h: 0.9, fontFace: SANS, fontSize: 13, color: MUTEDD, margin: 0 });

  s.addShape(p.ShapeType.line, { x: M + 0.02, y: 4.2, w: 7.7, h: 0, line: { color: GOLD, width: 1.5 } });
  s.addText("Prepared by", { x: M, y: 4.4, w: 1.4, h: 0.42, fontFace: SANS, fontSize: 9, italic: true, color: MUTEDD, valign: "middle", margin: 0 });
  promTag(s, M + 1.1, 4.4, 1.8);
  doftPlaceholder(s, M + 3.2, 4.32, 2.1, 0.7, true);

  const contacts = [
    ["Prashant", "+91 99538 88889", "prashant@eventsactive.com"],
    ["Web  ·  USA", "www.eventsactive.com", "Padma  ·  +1 (408) 679-7148"],
  ];
  contacts.forEach((c, i) => {
    const cx = M + i * 4.0;
    s.addText(c[0], { x: cx, y: 5.3, w: 3.8, h: 0.32, fontFace: SANS, fontSize: 10, bold: true, color: GOLDL, charSpacing: 1, margin: 0 });
    s.addText(c[1], { x: cx, y: 5.62, w: 3.8, h: 0.32, fontFace: SERIF, fontSize: 15, color: CREAMT, margin: 0 });
    s.addText(c[2], { x: cx, y: 5.96, w: 3.8, h: 0.32, fontFace: SANS, fontSize: 10.5, color: MUTEDD, margin: 0 });
  });
  s.addText("Prepared as a planning response to the Doft Candles Request for Contractor. Figures illustrative at placeholder rates.",
    { x: M, y: 6.95, w: 8, h: 0.3, fontFace: SANS, fontSize: 8, italic: true, color: "8A7078", margin: 0 });
}

p.writeFile({ fileName: "Doft_Diwali_PopUp_ProMarcom_Pitch.pptx" })
  .then((f) => console.log("Saved deck:", f))
  .catch((e) => { console.error(e); process.exit(1); });
