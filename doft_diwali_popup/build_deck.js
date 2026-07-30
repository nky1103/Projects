const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
p.author = "ProMarcom Inc.";
p.company = "ProMarcom Inc.";
p.title = "ProMarcom for Doft Candles — Diwali Pop-Up Retail Operations";

// ---------- palette ----------
const INK   = "20182B"; // deep plum-charcoal (dark bg)
const PLUM  = "37294D";
const GOLD  = "C9A24B"; // premium accent
const GOLDL = "E4C877";
const CREAM = "F6F1E9"; // light bg
const CARD  = "FFFFFF";
const TEXT  = "332B3D";
const MUTED = "8C8398";
const ROSE  = "B05C6B";
const LINE  = "E4DBCE";

const HF = "Cambria";   // header font (safe serif)
const BF = "Calibri";   // body font (safe sans)

const W = 13.33, H = 7.5, M = 0.6;

function bg(slide, color) { slide.background = { color }; }

function goldDot(slide, x, y, r = 0.14, color = GOLD) {
  slide.addShape(p.ShapeType.ellipse, { x, y, w: r * 2, h: r * 2, fill: { color }, line: { type: "none" } });
}

// Title band for content slides (no accent-bar: just text + kicker)
function contentTitle(slide, kicker, title, colorTitle = INK) {
  slide.addText(kicker.toUpperCase(), {
    x: M, y: 0.42, w: W - 2 * M, h: 0.3, fontFace: BF, fontSize: 12, bold: true,
    color: GOLD, charSpacing: 2, align: "left", margin: 0,
  });
  slide.addText(title, {
    x: M, y: 0.72, w: W - 2 * M, h: 0.72, fontFace: HF, fontSize: 32, bold: true,
    color: colorTitle, align: "left", margin: 0,
  });
}

function pageNum(slide, n) {
  slide.addText(String(n).padStart(2, "0"), {
    x: W - 1.0, y: H - 0.5, w: 0.6, h: 0.3, fontFace: BF, fontSize: 10, color: MUTED, align: "right", margin: 0,
  });
  slide.addText("ProMarcom  ×  Doft Candles", {
    x: M, y: H - 0.5, w: 5, h: 0.3, fontFace: BF, fontSize: 9, color: MUTED, align: "left", margin: 0,
  });
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(p.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: opts.fill || CARD }, line: opts.line || { color: LINE, width: 1 },
    shadow: opts.shadow === false ? undefined : { type: "outer", color: "D9CFC0", blur: 6, offset: 2, angle: 90, opacity: 0.5 },
  });
}

let sn = 0;
const nextn = () => ++sn;

// =========================================================
// SLIDE 1 — COVER (dark)
// =========================================================
{
  const s = p.addSlide(); bg(s, INK);
  // subtle motif: three gold dots (flames)
  s.addShape(p.ShapeType.ellipse, { x: 10.7, y: -1.4, w: 4.6, h: 4.6, fill: { color: PLUM }, line: { type: "none" } });
  s.addShape(p.ShapeType.ellipse, { x: 11.9, y: 4.6, w: 3.4, h: 3.4, fill: { color: PLUM }, line: { type: "none" } });
  goldDot(s, 1.0, 1.0, 0.09); goldDot(s, 1.28, 1.0, 0.09); goldDot(s, 1.56, 1.0, 0.09);

  s.addText("PROMARCOM", { x: 1.0, y: 1.35, w: 8, h: 0.5, fontFace: HF, fontSize: 22, bold: true, color: "FFFFFF", charSpacing: 3, margin: 0 });
  s.addText("Integrated Marketing Innovations", { x: 1.0, y: 1.85, w: 8, h: 0.35, fontFace: BF, fontSize: 12, italic: true, color: GOLDL, charSpacing: 1, margin: 0 });

  s.addText("Diwali Pop-Up", { x: 1.0, y: 2.7, w: 11, h: 0.95, fontFace: HF, fontSize: 54, bold: true, color: "FFFFFF", margin: 0 });
  s.addText("Retail Operations", { x: 1.0, y: 3.62, w: 11, h: 0.95, fontFace: HF, fontSize: 54, bold: true, color: GOLD, margin: 0 });

  s.addText("Contractor Execution & Partnership Proposal", { x: 1.0, y: 4.75, w: 11, h: 0.4, fontFace: BF, fontSize: 18, color: "E9E3F0", margin: 0 });

  s.addText([
    { text: "Prepared for  ", options: { color: MUTED } },
    { text: "Doft Candles", options: { color: GOLDL, bold: true } },
    { text: "     |     Diwali Seasons 2026 · 2027 · 2028", options: { color: MUTED } },
  ], { x: 1.0, y: 5.35, w: 11, h: 0.4, fontFace: BF, fontSize: 14, margin: 0 });

  s.addShape(p.ShapeType.line, { x: 1.0, y: 6.15, w: 4.5, h: 0, line: { color: GOLD, width: 1.5 } });
  s.addText("“We help you fly higher — from concept to completion.”", { x: 1.0, y: 6.3, w: 10, h: 0.4, fontFace: HF, italic: true, fontSize: 13, color: "C9C2D6", margin: 0 });
}

// =========================================================
// SLIDE 2 — Understanding your brief (light)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "The Ask", "Understanding Your Brief");
  s.addText("Premium seasonal pop-up kiosks in leading malls, staffed and run end-to-end — a long-term partner for Diwali 2026–28.",
    { x: M, y: 1.5, w: W - 2 * M, h: 0.4, fontFace: BF, fontSize: 14, color: MUTED, margin: 0 });

  const items = [
    ["3–5 wks", "Operating window before Diwali, each season"],
    ["~300 sq ft", "Kiosk footprint + ~90 sq ft stockroom"],
    ["2–4", "Pop-ups per region, across multiple cities"],
    ["12 / kiosk", "Full staffing team per pop-up"],
    ["1-day", "Doft product & sales training, 100% attendance"],
    ["Doft supplies", "Stock, furniture, POS/EDC, returnable uniforms"],
  ];
  const cols = 3, cw = (W - 2 * M - 2 * 0.35) / cols, ch = 1.55, gy = 0.35;
  items.forEach((it, i) => {
    const cx = M + (i % cols) * (cw + 0.35);
    const cy = 2.15 + Math.floor(i / cols) * (ch + gy);
    card(s, cx, cy, cw, ch);
    s.addText(it[0], { x: cx + 0.25, y: cy + 0.22, w: cw - 0.5, h: 0.55, fontFace: HF, fontSize: 26, bold: true, color: GOLD, margin: 0 });
    s.addText(it[1], { x: cx + 0.25, y: cy + 0.82, w: cw - 0.5, h: 0.6, fontFace: BF, fontSize: 12.5, color: TEXT, margin: 0, valign: "top" });
  });
  pageNum(s, n);
}

// =========================================================
// SLIDE 3 — Why ProMarcom (dark)
// =========================================================
{
  const s = p.addSlide(); bg(s, INK); const n = nextn();
  s.addText("WHY PROMARCOM", { x: M, y: 0.55, w: 10, h: 0.3, fontFace: BF, fontSize: 12, bold: true, color: GOLD, charSpacing: 2, margin: 0 });
  s.addText("A partner built for premium mall retail", { x: M, y: 0.85, w: 11.5, h: 0.7, fontFace: HF, fontSize: 32, bold: true, color: "FFFFFF", margin: 0 });
  s.addText("ProMarcom (EventsActive) delivers below-the-line, retail and experiential marketing end-to-end — concept, design, fabrication, manpower, operations and reporting.",
    { x: M, y: 1.6, w: 12, h: 0.5, fontFace: BF, fontSize: 14, color: "CBC3D8", margin: 0 });

  const pillars = [
    ["Mall & Retail Promotions", "Multi-month mall activations and in-shop demonstrations for global brands."],
    ["Retail VM — Premium Brands", "Show-windows & VM for Burberry, Louis Vuitton, LG, Samsung across 90+ cities."],
    ["Manpower at Scale", "Recruit, train, deploy & manage large field teams with tracking and reporting."],
    ["Exhibitions, MICE & Events", "1,000–24,000 sqm exhibitions; events for LG, Samsung, HP, ICC World Cup."],
  ];
  const cw = (W - 2 * M - 3 * 0.3) / 4, cy = 2.5, ch = 3.4;
  pillars.forEach((it, i) => {
    const cx = M + i * (cw + 0.3);
    s.addShape(p.ShapeType.roundRect, { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: PLUM }, line: { type: "none" } });
    s.addShape(p.ShapeType.ellipse, { x: cx + 0.3, y: cy + 0.35, w: 0.55, h: 0.55, fill: { color: GOLD }, line: { type: "none" } });
    s.addText(String(i + 1), { x: cx + 0.3, y: cy + 0.35, w: 0.55, h: 0.55, fontFace: HF, fontSize: 20, bold: true, color: INK, align: "center", valign: "middle", margin: 0 });
    s.addText(it[0], { x: cx + 0.28, y: cy + 1.1, w: cw - 0.56, h: 0.9, fontFace: HF, fontSize: 16, bold: true, color: "FFFFFF", margin: 0, valign: "top" });
    s.addText(it[1], { x: cx + 0.28, y: cy + 2.0, w: cw - 0.56, h: 1.25, fontFace: BF, fontSize: 12, color: "CBC3D8", margin: 0, valign: "top" });
  });
  pageNum(s, n);
}

// =========================================================
// SLIDE 4 — Proven track record (light) — big stats + client chips
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Credentials", "A proven track record");

  const stats = [
    ["90+", "Cities covered for retail VM & activations"],
    ["3,000", "Man-days on a single multi-city retail rollout"],
    ["24,000", "Sqm of exhibition floor managed (max)"],
    ["6+ yrs", "As LG's BTL / retail / digital partner"],
  ];
  const cw = (W - 2 * M - 3 * 0.3) / 4, cy = 1.7, ch = 1.9;
  stats.forEach((it, i) => {
    const cx = M + i * (cw + 0.3);
    card(s, cx, cy, cw, ch);
    s.addText(it[0], { x: cx + 0.2, y: cy + 0.25, w: cw - 0.4, h: 0.7, fontFace: HF, fontSize: 34, bold: true, color: GOLD, align: "left", margin: 0 });
    s.addText(it[1], { x: cx + 0.2, y: cy + 1.0, w: cw - 0.4, h: 0.8, fontFace: BF, fontSize: 12, color: TEXT, margin: 0, valign: "top" });
  });

  s.addText("Trusted by leading brands", { x: M, y: 3.95, w: 11, h: 0.35, fontFace: BF, fontSize: 13, bold: true, color: MUTED, charSpacing: 1, margin: 0 });
  const clients = ["LG", "Samsung", "Hewlett-Packard", "Bajaj", "Castrol", "Pepsi", "ITC", "Burberry", "Louis Vuitton", "Panasonic", "Pearson", "ICC World Cup"];
  const perRow = 6, gap = 0.2, chh = 0.6;
  const chw = (W - 2 * M - (perRow - 1) * gap) / perRow;  // fit exactly within margins
  clients.forEach((c, i) => {
    const cx = M + (i % perRow) * (chw + gap);
    const cy2 = 4.45 + Math.floor(i / perRow) * (chh + gap);
    s.addShape(p.ShapeType.roundRect, { x: cx, y: cy2, w: chw, h: chh, rectRadius: 0.06, fill: { color: CARD }, line: { color: LINE, width: 1 } });
    s.addText(c, { x: cx + 0.05, y: cy2, w: chw - 0.1, h: chh, fontFace: HF, fontSize: 12, bold: true, color: INK, align: "center", valign: "middle", margin: 0 });
  });
  s.addText("Illustrative selection from ProMarcom credentials, 2022.", { x: M, y: 6.5, w: 10, h: 0.3, fontFace: BF, fontSize: 9, italic: true, color: MUTED, margin: 0 });
  pageNum(s, n);
}

// =========================================================
// SLIDE 5 — Directly relevant experience (light) — 3 case cards
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Relevant Experience", "We have run exactly this before");
  const cases = [
    ["HP — Mall Promotions", "Mumbai & Bengaluru", "3-month mall promotion program: concept, set-up & fabrication, manpower, props, retail merchandising, logistics and reporting."],
    ["Burberry & Louis Vuitton", "Premium Retail VM", "Executed show-windows, in-shop props and merchandise for luxury brands — the premium standard Doft demands."],
    ["LG Cookie Pep Carnival", "70+ cities · 3,000 man-days", "Shop-to-shop retail activation series across India — proof of multi-city manpower at scale."],
  ];
  const cw = (W - 2 * M - 2 * 0.35) / 3, cy = 1.75, ch = 4.4;
  cases.forEach((it, i) => {
    const cx = M + i * (cw + 0.35);
    card(s, cx, cy, cw, ch);
    s.addShape(p.ShapeType.roundRect, { x: cx, y: cy, w: cw, h: 1.1, rectRadius: 0.08, fill: { color: INK }, line: { type: "none" } });
    // mask bottom corners of header block
    s.addShape(p.ShapeType.rect, { x: cx, y: cy + 0.55, w: cw, h: 0.55, fill: { color: INK }, line: { type: "none" } });
    s.addText(it[0], { x: cx + 0.25, y: cy + 0.18, w: cw - 0.5, h: 0.5, fontFace: HF, fontSize: 16, bold: true, color: "FFFFFF", margin: 0, valign: "middle" });
    s.addText(it[1], { x: cx + 0.25, y: cy + 0.68, w: cw - 0.5, h: 0.35, fontFace: BF, fontSize: 11.5, italic: true, color: GOLDL, margin: 0 });
    s.addText(it[2], { x: cx + 0.25, y: cy + 1.35, w: cw - 0.5, h: 2.8, fontFace: BF, fontSize: 13, color: TEXT, margin: 0, valign: "top", lineSpacingMultiple: 1.1 });
  });
  pageNum(s, n);
}

// =========================================================
// SLIDE 6 — Operating model (light) — 7 scope pillars flow
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Our Approach", "One accountable partner, end to end");
  const steps = [
    ["Kiosk Build", "On-site fabrication & install to Doft design"],
    ["Mall & Legal", "Liaison, licences, permits, approvals"],
    ["Logistics", "Ghaziabad pickup, replenishment, returns"],
    ["Recruit & Staff", "Hire, BGV, payroll, statutory compliance"],
    ["Training", "100% attendance + trained bench"],
    ["Store Ops", "Open–close, sales, POS, VM, cash"],
    ["Reporting", "Daily sales, footfall, stock, attendance"],
  ];
  // 4 top, 3 bottom
  const cw = 2.85, chh = 1.6;
  const topXs = [M, M + 3.05, M + 6.1, M + 9.15];
  const botXs = [M + 1.5, M + 4.55, M + 7.6];
  steps.slice(0, 4).forEach((it, i) => {
    const cx = topXs[i], cy = 1.9;
    card(s, cx, cy, cw, chh);
    s.addText(String(i + 1), { x: cx + 0.18, y: cy + 0.15, w: 0.5, h: 0.4, fontFace: HF, fontSize: 16, bold: true, color: GOLD, margin: 0 });
    s.addText(it[0], { x: cx + 0.18, y: cy + 0.5, w: cw - 0.36, h: 0.4, fontFace: HF, fontSize: 15, bold: true, color: INK, margin: 0 });
    s.addText(it[1], { x: cx + 0.18, y: cy + 0.9, w: cw - 0.36, h: 0.6, fontFace: BF, fontSize: 11, color: TEXT, margin: 0, valign: "top" });
  });
  steps.slice(4).forEach((it, i) => {
    const cx = botXs[i], cy = 3.85;
    card(s, cx, cy, cw, chh, { fill: INK });
    s.addText(String(i + 5), { x: cx + 0.18, y: cy + 0.15, w: 0.5, h: 0.4, fontFace: HF, fontSize: 16, bold: true, color: GOLDL, margin: 0 });
    s.addText(it[0], { x: cx + 0.18, y: cy + 0.5, w: cw - 0.36, h: 0.4, fontFace: HF, fontSize: 15, bold: true, color: "FFFFFF", margin: 0 });
    s.addText(it[1], { x: cx + 0.18, y: cy + 0.9, w: cw - 0.36, h: 0.6, fontFace: BF, fontSize: 11, color: "CBC3D8", margin: 0, valign: "top" });
  });
  s.addText("A single Team Leader on ProMarcom's payroll owns daily operations at every kiosk — your one point of contact.",
    { x: M, y: 5.75, w: W - 2 * M, h: 0.5, fontFace: BF, fontSize: 13, italic: true, color: PLUM, align: "center", margin: 0 });
  pageNum(s, n);
}

// =========================================================
// SLIDE 7 — Staffing model (light)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Staffing", "12 people per kiosk — exactly to brief");
  const roles = [
    ["6", "Sales Executives", "Female, 22–25, fluent English, retail experience"],
    ["2", "Sales Support", "Merchandising, stock, queue management"],
    ["1", "Helper", "Housekeeping & material handling"],
    ["1", "Cashier", "Experienced on POS / EDC machines"],
    ["1", "Driver", "Stock transport & replenishment runs"],
    ["1", "Team Leader", "Permanent ProMarcom employee — ops owner"],
  ];
  const cw = (W - 2 * M - 2 * 0.35) / 3, ch = 1.75, gy = 0.35;
  roles.forEach((it, i) => {
    const cx = M + (i % 3) * (cw + 0.35);
    const cy = 1.75 + Math.floor(i / 3) * (ch + gy);
    card(s, cx, cy, cw, ch);
    s.addShape(p.ShapeType.ellipse, { x: cx + 0.22, y: cy + 0.28, w: 0.85, h: 0.85, fill: { color: i === 5 ? INK : CREAM }, line: { color: GOLD, width: 1.5 } });
    s.addText(it[0], { x: cx + 0.22, y: cy + 0.28, w: 0.85, h: 0.85, fontFace: HF, fontSize: 26, bold: true, color: i === 5 ? GOLDL : GOLD, align: "center", valign: "middle", margin: 0 });
    s.addText(it[1], { x: cx + 1.25, y: cy + 0.3, w: cw - 1.45, h: 0.5, fontFace: HF, fontSize: 15.5, bold: true, color: INK, margin: 0, valign: "top" });
    s.addText(it[2], { x: cx + 1.25, y: cy + 0.78, w: cw - 1.45, h: 0.8, fontFace: BF, fontSize: 11, color: TEXT, margin: 0, valign: "top" });
  });
  // total callout
  s.addShape(p.ShapeType.roundRect, { x: M, y: 5.9, w: W - 2 * M, h: 0.7, rectRadius: 0.08, fill: { color: INK }, line: { type: "none" } });
  s.addText([
    { text: "12 per kiosk", options: { bold: true, color: GOLDL } },
    { text: "   ×   pop-ups   =   your deployed field force.   Illustrative 9-kiosk rollout = ", options: { color: "FFFFFF" } },
    { text: "108 trained staff", options: { bold: true, color: GOLDL } },
  ], { x: M + 0.3, y: 5.9, w: W - 2 * M - 0.6, h: 0.7, fontFace: BF, fontSize: 15, valign: "middle", margin: 0 });
  pageNum(s, n);
}

// =========================================================
// SLIDE 8 — Recruitment, training & guarantee (light)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "People", "Recruit → Train → Guarantee");
  const cols = [
    ["Recruit & Verify", ["City-level sourcing & referrals", "Prioritise proven prior-season staff", "Background verification before deploy", "Onboard to payroll, full statutory compliance"]],
    ["Train to Doft Standard", ["Coordinate 100% attendance at Doft's 1-day training", "Scheduled 10–21 days before go-live", "Completion tracked per candidate", "Replacement staff trained too — always equally skilled"]],
    ["Zero-Gap Guarantee", ["~15% trained bench held per city", "Immediate same-day replacement", "Any attrition covered at no extra cost", "Trading never stops for a vacancy"]],
  ];
  const cw = (W - 2 * M - 2 * 0.35) / 3, cy = 1.75, ch = 3.7;
  cols.forEach((c, i) => {
    const cx = M + i * (cw + 0.35);
    card(s, cx, cy, cw, ch);
    s.addShape(p.ShapeType.ellipse, { x: cx + 0.25, y: cy + 0.28, w: 0.5, h: 0.5, fill: { color: GOLD }, line: { type: "none" } });
    s.addText(String(i + 1), { x: cx + 0.25, y: cy + 0.28, w: 0.5, h: 0.5, fontFace: HF, fontSize: 18, bold: true, color: INK, align: "center", valign: "middle", margin: 0 });
    s.addText(c[0], { x: cx + 0.9, y: cy + 0.3, w: cw - 1.1, h: 0.5, fontFace: HF, fontSize: 15.5, bold: true, color: INK, margin: 0, valign: "middle" });
    s.addText(c[1].map((t, j) => ({ text: t, options: { bullet: { code: "2022", indent: 12 }, color: TEXT, breakLine: true, paraSpaceAfter: 6 } })),
      { x: cx + 0.3, y: cy + 1.05, w: cw - 0.6, h: 2.5, fontFace: BF, fontSize: 11.5, margin: 0, valign: "top" });
  });
  s.addShape(p.ShapeType.roundRect, { x: M, y: 5.75, w: W - 2 * M, h: 0.8, rectRadius: 0.08, fill: { color: ROSE }, line: { type: "none" } });
  s.addText("Contractual commitment:  any attrition after training or during operations is replaced immediately with equally-trained staff — at no additional cost to Doft.",
    { x: M + 0.3, y: 5.75, w: W - 2 * M - 0.6, h: 0.8, fontFace: BF, fontSize: 13.5, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
  pageNum(s, n);
}

// =========================================================
// SLIDE 9 — Kiosk, mall coordination & compliance (light)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Setup", "Kiosk, mall coordination & compliance");
  const rows = [
    ["Kiosk fabrication & install", "On-site fabrication to Doft-approved design; transport, install, maintain, dismantle & return fixtures — with a 3-day buffer before go-live."],
    ["Mall coordination", "Liaison with mall management; electricity, access passes, loading/unloading and operational approvals."],
    ["Legal & licensing", "All permissions, licences and documentation — started at T-7 weeks to de-risk go-live."],
    ["Compliance sign-off", "Shops & Establishment, GST/e-invoicing, PF/ESIC, insurance, fire & electrical, staff BGV — checklist signed before opening."],
  ];
  const cy0 = 1.8, rh = 1.1, gap = 0.12;
  rows.forEach((it, i) => {
    const cy = cy0 + i * (rh + gap);
    card(s, M, cy, W - 2 * M, rh, { shadow: false });
    s.addShape(p.ShapeType.ellipse, { x: M + 0.3, y: cy + 0.3, w: 0.5, h: 0.5, fill: { color: INK }, line: { type: "none" } });
    s.addText(String(i + 1), { x: M + 0.3, y: cy + 0.3, w: 0.5, h: 0.5, fontFace: HF, fontSize: 18, bold: true, color: GOLDL, align: "center", valign: "middle", margin: 0 });
    s.addText(it[0], { x: M + 1.05, y: cy + 0.12, w: 3.2, h: rh - 0.24, fontFace: HF, fontSize: 15, bold: true, color: INK, margin: 0, valign: "middle" });
    s.addText(it[1], { x: M + 4.35, y: cy + 0.12, w: W - 2 * M - 4.65, h: rh - 0.24, fontFace: BF, fontSize: 12.5, color: TEXT, margin: 0, valign: "middle" });
  });
  pageNum(s, n);
}

// =========================================================
// SLIDE 10 — Logistics & replenishment (light) — flow
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Supply Chain", "Logistics & stock replenishment");
  const flow = [
    ["Ghaziabad Warehouse", "Collect stock from Doft's warehouse; insured in transit"],
    ["Stockroom (~90 sq ft)", "Local buffer beside each kiosk for fast replenishment"],
    ["Kiosk Shelf", "Daily fill to plan; reorder triggered by min levels"],
    ["Reconcile & Return", "Daily counts; unsold inventory returned with full reconciliation"],
  ];
  const gapx = 0.5, cy = 2.2, ch = 2.2;
  const cw = (W - 2 * M - 3 * gapx) / 4;  // 4 cards fit exactly within margins
  flow.forEach((it, i) => {
    const cx = M + i * (cw + gapx);
    card(s, cx, cy, cw, ch);
    s.addShape(p.ShapeType.ellipse, { x: cx + cw / 2 - 0.3, y: cy + 0.3, w: 0.6, h: 0.6, fill: { color: GOLD }, line: { type: "none" } });
    s.addText(String(i + 1), { x: cx + cw / 2 - 0.3, y: cy + 0.3, w: 0.6, h: 0.6, fontFace: HF, fontSize: 20, bold: true, color: INK, align: "center", valign: "middle", margin: 0 });
    s.addText(it[0], { x: cx + 0.15, y: cy + 1.05, w: cw - 0.3, h: 0.55, fontFace: HF, fontSize: 14, bold: true, color: INK, align: "center", margin: 0, valign: "top" });
    s.addText(it[1], { x: cx + 0.2, y: cy + 1.55, w: cw - 0.4, h: 0.6, fontFace: BF, fontSize: 10.5, color: TEXT, align: "center", margin: 0, valign: "top" });
    if (i < 3) s.addText("→", { x: cx + cw + 0.02, y: cy + 0.75, w: gapx - 0.04, h: 0.6, fontFace: BF, fontSize: 26, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
  });
  s.addText("Timely replenishment protects peak-day sales — no stock-outs when footfall is highest.",
    { x: M, y: 5.0, w: W - 2 * M, h: 0.5, fontFace: BF, fontSize: 13, italic: true, color: PLUM, align: "center", margin: 0 });
  pageNum(s, n);
}

// =========================================================
// SLIDE 11 — Store operations & daily reporting (light)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Operations", "Daily operations & reporting");
  s.addText("Consistent open-to-close execution, with a standard daily report to Doft per kiosk — consolidated by city.",
    { x: M, y: 1.5, w: W - 2 * M, h: 0.4, fontFace: BF, fontSize: 13.5, color: MUTED, margin: 0 });
  const reports = ["Sales", "Footfall", "Conversion", "Inventory", "Replenishment", "Attendance", "Customer Feedback", "Ops Issues"];
  const cw = (W - 2 * M - 3 * 0.3) / 4, ch = 1.15, gy = 0.3;
  reports.forEach((r, i) => {
    const cx = M + (i % 4) * (cw + 0.3);
    const cy = 2.2 + Math.floor(i / 4) * (ch + gy);
    card(s, cx, cy, cw, ch);
    s.addShape(p.ShapeType.ellipse, { x: cx + 0.22, y: cy + ch / 2 - 0.11, w: 0.22, h: 0.22, fill: { color: GOLD }, line: { type: "none" } });
    s.addText(r, { x: cx + 0.55, y: cy, w: cw - 0.7, h: ch, fontFace: HF, fontSize: 14, bold: true, color: INK, valign: "middle", margin: 0 });
  });
  s.addShape(p.ShapeType.roundRect, { x: M, y: 5.35, w: W - 2 * M, h: 1.05, rectRadius: 0.08, fill: { color: INK }, line: { type: "none" } });
  s.addText("Governance cadence", { x: M + 0.3, y: 5.5, w: 4, h: 0.35, fontFace: BF, fontSize: 11, bold: true, color: GOLD, charSpacing: 1, margin: 0 });
  s.addText([
    { text: "Daily", options: { bold: true, color: GOLDL } }, { text: " written report   ·   ", options: { color: "FFFFFF" } },
    { text: "Weekly", options: { bold: true, color: GOLDL } }, { text: " city review call   ·   ", options: { color: "FFFFFF" } },
    { text: "End-of-season", options: { bold: true, color: GOLDL } }, { text: " reconciliation & review", options: { color: "FFFFFF" } },
  ], { x: M + 0.3, y: 5.85, w: W - 2 * M - 0.6, h: 0.45, fontFace: BF, fontSize: 15, margin: 0, valign: "middle" });
  pageNum(s, n);
}

// =========================================================
// SLIDE 12 — Project timeline (light)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Plan", "Project timeline");
  const line_y = 3.4;
  const lw = 1.7;                 // label box width
  const startX = M + lw / 2;      // first dot leaves room for a centred label
  const endX = W - M - lw / 2;    // last dot ditto
  s.addShape(p.ShapeType.line, { x: startX, y: line_y, w: endX - startX, h: 0, line: { color: GOLD, width: 2 } });
  const ph = [
    ["T-8w", "Award & kick-off", 1],
    ["T-7w", "Malls & licences", 0],
    ["T-6w", "Recruit & BGV", 1],
    ["T-3w", "Kiosk fit-out", 0],
    ["T-2w", "Doft training", 1],
    ["T-1w", "Stock & first fill", 0],
    ["T", "Go-live — ops", 1],
    ["T+6w", "Dismantle & review", 0],
  ];
  ph.forEach((it, i) => {
    const cx = startX + (endX - startX) * (i / (ph.length - 1));
    const up = it[2] === 1;
    const boxY = up ? line_y - 1.5 : line_y + 0.5;
    const bx = cx - lw / 2;       // centred exactly on the dot
    s.addText(it[0], { x: bx, y: boxY, w: lw, h: 0.3, fontFace: HF, fontSize: 14, bold: true, color: GOLD, align: "center", margin: 0 });
    s.addText(it[1], { x: bx, y: boxY + 0.32, w: lw, h: 0.6, fontFace: BF, fontSize: 11.5, color: TEXT, align: "center", margin: 0, valign: up ? "bottom" : "top" });
    // connector then dot (dot drawn last, sits on top)
    s.addShape(p.ShapeType.line, { x: cx, y: up ? boxY + 0.92 : line_y, w: 0, h: up ? line_y - (boxY + 0.92) : boxY - line_y, line: { color: LINE, width: 1 } });
    goldDot(s, cx - 0.11, line_y - 0.11, 0.11, INK);
  });
  s.addText("Timeline shown relative to go-live (T). Operations run 3–5 weeks per the brief. Full per-region Gantt provided in the operations workbook.",
    { x: M, y: 6.2, w: W - 2 * M, h: 0.4, fontFace: BF, fontSize: 11, italic: true, color: MUTED, align: "center", margin: 0 });
  pageNum(s, n);
}

// =========================================================
// SLIDE 13 — Illustrative rollout & scale (dark)
// =========================================================
{
  const s = p.addSlide(); bg(s, INK); const n = nextn();
  s.addText("ROLLOUT", { x: M, y: 0.55, w: 10, h: 0.3, fontFace: BF, fontSize: 12, bold: true, color: GOLD, charSpacing: 2, margin: 0 });
  s.addText("An illustrative first-season footprint", { x: M, y: 0.85, w: 12, h: 0.7, fontFace: HF, fontSize: 32, bold: true, color: "FFFFFF", margin: 0 });
  s.addText("A starting scenario for a premium brand — fully scalable. Final cities & kiosk counts are yours to set.",
    { x: M, y: 1.6, w: 12, h: 0.4, fontFace: BF, fontSize: 14, color: "CBC3D8", margin: 0 });

  const cities = [["Delhi-NCR", "3 kiosks"], ["Mumbai", "3 kiosks"], ["Bengaluru", "3 kiosks"]];
  const cw = (W - 2 * M - 2 * 0.4) / 3, cy = 2.5, ch = 1.9;
  cities.forEach((c, i) => {
    const cx = M + i * (cw + 0.4);
    s.addShape(p.ShapeType.roundRect, { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: PLUM }, line: { type: "none" } });
    s.addText(c[0], { x: cx + 0.3, y: cy + 0.35, w: cw - 0.6, h: 0.6, fontFace: HF, fontSize: 22, bold: true, color: "FFFFFF", margin: 0 });
    s.addText(c[1], { x: cx + 0.3, y: cy + 1.05, w: cw - 0.6, h: 0.5, fontFace: BF, fontSize: 15, color: GOLDL, margin: 0 });
  });

  const stats = [["9", "Total kiosks"], ["108", "Trained staff deployed"], ["3–5 wks", "Operating window"], ["2028", "Committed through"]];
  const sw = (W - 2 * M - 3 * 0.4) / 4, sy = 4.75, sh = 1.5;
  stats.forEach((c, i) => {
    const cx = M + i * (sw + 0.4);
    s.addShape(p.ShapeType.line, { x: cx, y: sy, w: 0, h: sh, line: { color: GOLD, width: 2 } });
    s.addText(c[0], { x: cx + 0.2, y: sy, w: sw - 0.2, h: 0.85, fontFace: HF, fontSize: 40, bold: true, color: GOLD, margin: 0 });
    s.addText(c[1], { x: cx + 0.2, y: sy + 0.95, w: sw - 0.2, h: 0.5, fontFace: BF, fontSize: 12.5, color: "CBC3D8", margin: 0, valign: "top" });
  });
  s.addText("Scenario only — the brief specifies 2–4 pop-ups per region across multiple cities. Change two inputs in the workbook to re-scope instantly.",
    { x: M, y: 6.55, w: W - 2 * M, h: 0.4, fontFace: BF, fontSize: 10.5, italic: true, color: MUTED, margin: 0 });
  pageNum(s, n);
}

// =========================================================
// SLIDE 14 — Commercial model (light) — cost composition chart
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Commercials", "A transparent, built-up cost model");
  s.addText("Priced bottom-up per kiosk, then rolled up. Every line is an editable input in the workbook.",
    { x: M, y: 1.5, w: W - 2 * M, h: 0.4, fontFace: BF, fontSize: 13.5, color: MUTED, margin: 0 });

  // doughnut of per-kiosk cost heads (illustrative, INR '000)
  const data = [{
    name: "Per-kiosk cost heads (₹'000)",
    labels: ["Manpower", "Mall licence*", "Kiosk fabrication", "Logistics & stockroom", "Welfare & incentives", "Other setup & compliance"],
    values: [393, 250, 225, 100, 55, 102],
  }];
  s.addChart(p.ChartType.doughnut, data, {
    x: M, y: 2.05, w: 5.6, h: 4.2, holeSize: 55,
    chartColors: [GOLD, ROSE, INK, PLUM, "9C8FB0", "C9BFD6"],
    showLegend: true, legendPos: "b", legendColor: TEXT, legendFontFace: BF, legendFontSize: 10,
    showTitle: false, dataLabelColor: "FFFFFF", showValue: false,
  });

  // right side: build-up steps
  const bx = 6.7, bw = W - M - bx;
  const rows = [
    ["Direct cost / kiosk", "₹ 11.3 L", TEXT],
    ["+ Management margin (15%)", "₹ 1.7 L", TEXT],
    ["Contract value / kiosk (pre-GST)", "₹ 12.9 L", INK],
    ["× 9 kiosks (illustrative)", "₹ 1.16 Cr", INK],
    ["+ GST (18%)", "₹ 0.21 Cr", TEXT],
    ["Total programme (incl. GST)", "₹ 1.37 Cr", GOLD],
  ];
  const rh = 0.62;
  rows.forEach((r, i) => {
    const cy = 2.1 + i * (rh + 0.06);
    const strong = i === 5;
    s.addShape(p.ShapeType.roundRect, { x: bx, y: cy, w: bw, h: rh, rectRadius: 0.05, fill: { color: strong ? INK : CARD }, line: { color: LINE, width: 1 } });
    s.addText(r[0], { x: bx + 0.2, y: cy, w: bw - 2.0, h: rh, fontFace: BF, fontSize: 12.5, bold: i >= 2, color: strong ? "FFFFFF" : TEXT, valign: "middle", margin: 0 });
    s.addText(r[1], { x: bx + bw - 1.9, y: cy, w: 1.7, h: rh, fontFace: HF, fontSize: 14, bold: true, color: strong ? GOLDL : r[2], align: "right", valign: "middle", margin: 0 });
  });
  s.addText("* Mall licence / space fee is the biggest swing item and is often reimbursed by the brand. Figures illustrative at placeholder rates — to be confirmed against quotes.",
    { x: M, y: 6.55, w: W - 2 * M, h: 0.5, fontFace: BF, fontSize: 9.5, italic: true, color: MUTED, margin: 0 });
  pageNum(s, n);
}

// =========================================================
// SLIDE 15 — Governance & risk (light)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Assurance", "How we protect the season");
  const risks = [
    ["Staff attrition after training", "15% trained bench; same-day no-cost replacement"],
    ["Mall permission delays", "Licensing kicked off at T-7w; parallel mall shortlist"],
    ["Stock-out on peak days", "Reorder levels + daily replenishment from stockroom"],
    ["POS / EDC downtime", "Backup EDC + connectivity failover; trained cashier"],
    ["Kiosk fabrication delay", "Vendor SLA + 3-day buffer before go-live"],
  ];
  // header row
  const tx = M, tw = W - 2 * M, rh = 0.82, ty = 1.85;
  s.addShape(p.ShapeType.rect, { x: tx, y: ty, w: 4.6, h: 0.5, fill: { color: INK }, line: { type: "none" } });
  s.addShape(p.ShapeType.rect, { x: tx + 4.6, y: ty, w: tw - 4.6, h: 0.5, fill: { color: PLUM }, line: { type: "none" } });
  s.addText("Risk", { x: tx + 0.25, y: ty, w: 4.35, h: 0.5, fontFace: BF, fontSize: 12, bold: true, color: GOLDL, valign: "middle", margin: 0 });
  s.addText("Mitigation", { x: tx + 4.85, y: ty, w: tw - 4.85, h: 0.5, fontFace: BF, fontSize: 12, bold: true, color: GOLDL, valign: "middle", margin: 0 });
  risks.forEach((r, i) => {
    const cy = ty + 0.5 + i * rh;
    const fill = i % 2 ? "FFFFFF" : "F0E9DE";
    s.addShape(p.ShapeType.rect, { x: tx, y: cy, w: tw, h: rh, fill: { color: fill }, line: { color: LINE, width: 0.5 } });
    s.addText(r[0], { x: tx + 0.25, y: cy, w: 4.35, h: rh, fontFace: HF, fontSize: 13, bold: true, color: INK, valign: "middle", margin: 0 });
    s.addText(r[1], { x: tx + 4.85, y: cy, w: tw - 5.1, h: rh, fontFace: BF, fontSize: 12.5, color: TEXT, valign: "middle", margin: 0 });
  });
  pageNum(s, n);
}

// =========================================================
// SLIDE 16 — The operating toolkit (light)
// =========================================================
{
  const s = p.addSlide(); bg(s, CREAM); const n = nextn();
  contentTitle(s, "Toolkit", "The operations workbook");
  s.addText("This deck ships with a live Excel workbook — the operating system for the engagement. Edit the assumptions; everything recalculates.",
    { x: M, y: 1.5, w: W - 2 * M, h: 0.4, fontFace: BF, fontSize: 13.5, color: MUTED, margin: 0 });
  const tabs = [
    "Assumptions", "Project Timeline", "Staffing Plan", "Manpower Cost", "Budget Summary", "Recruitment Tracker",
    "Attendance", "Daily Sales", "Inventory & Replenish", "Footfall & Conversion", "Customer Feedback", "Compliance Checklist", "Risk Register",
  ];
  const cols = 4, cw = (W - 2 * M - 3 * 0.3) / cols, ch = 0.95, gy = 0.25;
  tabs.forEach((t, i) => {
    const cx = M + (i % cols) * (cw + 0.3);
    const cy = 2.2 + Math.floor(i / cols) * (ch + gy);
    card(s, cx, cy, cw, ch, { shadow: false });
    s.addText(String(i + 1).padStart(2, "0"), { x: cx + 0.2, y: cy, w: 0.7, h: ch, fontFace: HF, fontSize: 18, bold: true, color: GOLD, valign: "middle", margin: 0 });
    s.addText(t, { x: cx + 0.85, y: cy, w: cw - 1.0, h: ch, fontFace: BF, fontSize: 12, bold: true, color: INK, valign: "middle", margin: 0 });
  });
  pageNum(s, n);
}

// =========================================================
// SLIDE 17 — Closing + contact (dark)
// =========================================================
{
  const s = p.addSlide(); bg(s, INK);
  s.addShape(p.ShapeType.ellipse, { x: -1.6, y: 4.2, w: 4.5, h: 4.5, fill: { color: PLUM }, line: { type: "none" } });
  goldDot(s, 1.0, 0.95, 0.09); goldDot(s, 1.28, 0.95, 0.09); goldDot(s, 1.56, 0.95, 0.09);
  s.addText("Let's make Doft's Diwali unmissable.", { x: 1.0, y: 1.5, w: 11.3, h: 1.7, fontFace: HF, fontSize: 42, bold: true, color: "FFFFFF", margin: 0 });
  s.addText("A premium retail partner with proven mall, VM and multi-city manpower experience — committed to Doft for Diwali 2026, 2027 and 2028.",
    { x: 1.0, y: 3.15, w: 10.5, h: 0.8, fontFace: BF, fontSize: 15, color: "CBC3D8", margin: 0 });

  s.addShape(p.ShapeType.line, { x: 1.0, y: 4.35, w: 11.3, h: 0, line: { color: GOLD, width: 1.5 } });
  s.addText("PROMARCOM INC.  ·  Integrated Marketing Innovations", { x: 1.0, y: 4.55, w: 11, h: 0.35, fontFace: HF, fontSize: 14, bold: true, color: GOLDL, margin: 0 });

  const contacts = [
    ["Prashant", "+91 99538 88889", "prashant@eventsactive.com", "B-125 LFG, CR Park, New Delhi 110019"],
    ["Web", "www.eventsactive.com", "USA  ·  Padma  +1 (408) 679-7148", "3721 Jasmine Circle, San Jose, CA 95135"],
  ];
  contacts.forEach((c, i) => {
    const cx = 1.0 + i * 6.0;
    s.addText(c[0], { x: cx, y: 5.05, w: 5.6, h: 0.35, fontFace: BF, fontSize: 12, bold: true, color: GOLD, margin: 0 });
    s.addText(c[1], { x: cx, y: 5.4, w: 5.6, h: 0.32, fontFace: BF, fontSize: 14, color: "FFFFFF", margin: 0 });
    s.addText(c[2], { x: cx, y: 5.72, w: 5.6, h: 0.32, fontFace: BF, fontSize: 12, color: "CBC3D8", margin: 0 });
    s.addText(c[3], { x: cx, y: 6.02, w: 5.6, h: 0.5, fontFace: BF, fontSize: 11, color: MUTED, margin: 0, valign: "top" });
  });
  s.addText("Prepared as a planning response to the Doft Candles Request for Contractor. Figures illustrative at placeholder rates.",
    { x: 1.0, y: 6.9, w: 11, h: 0.3, fontFace: BF, fontSize: 9, italic: true, color: "6E6480", margin: 0 });
}

p.writeFile({ fileName: "/home/user/Projects/doft_diwali_popup/Doft_Diwali_PopUp_ProMarcom_Pitch.pptx" })
  .then((f) => console.log("Saved deck:", f))
  .catch((e) => { console.error(e); process.exit(1); });
