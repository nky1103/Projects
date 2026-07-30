const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  Header, Footer, PageNumber, LevelFormat, ImageRun
} = require("docx");

const NAVY = "4A343A";   // Doft deep mauve
const GOLD = "9C7A2E";   // readable gold on white
const TERRA = "9E5A45";
const ROSE = "C39A98";
const INK = "2E2A28";
const GREY = "6B625C";
const LGREY = "F3EEE6";
const LINE = "D9CFC0";
const FONT = "Calibri";
const HFONT = "Cambria";

const CW = 9020; // A4 content width in DXA

function run(text, o = {}) { return new TextRun({ text, font: FONT, size: 21, color: INK, ...o }); }
function h1(text) {
  return new Paragraph({
    spacing: { before: 300, after: 120 },
    border: { bottom: { color: ROSE, size: 8, space: 4, style: BorderStyle.SINGLE } },
    children: [new TextRun({ text, font: HFONT, size: 27, bold: true, color: NAVY })],
  });
}
function h2(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, font: HFONT, size: 23, bold: true, color: TERRA })],
  });
}
function p(text, o = {}) {
  return new Paragraph({
    spacing: { after: o.after ?? 120 }, alignment: o.align,
    children: Array.isArray(text) ? text : [new TextRun({ text, font: FONT, size: 21, color: INK })],
  });
}
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bul", level },
    spacing: { after: 60 },
    children: Array.isArray(text) ? text : [new TextRun({ text, font: FONT, size: 21, color: INK })],
  });
}
function cell(children, { w, shade, valign = "center" } = {}) {
  return new TableCell({
    width: w ? { size: w, type: WidthType.DXA } : undefined,
    shading: shade ? { type: ShadingType.CLEAR, color: "auto", fill: shade } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 },
    verticalAlign: valign,
    children: Array.isArray(children) ? children : [children],
  });
}
function hcell(text, w) {
  return cell(new Paragraph({ children: [new TextRun({ text, font: FONT, size: 19, bold: true, color: "FFFFFF" })] }), { w, shade: NAVY });
}
function tcell(text, w, shade, bold = false) {
  const paras = (Array.isArray(text) ? text : [text]).map(t =>
    new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: t, font: FONT, size: 19, bold, color: INK })] }));
  return cell(paras, { w, shade });
}
function blcell(items, w, shade) {
  return cell(items.map(t => new Paragraph({
    numbering: { reference: "bul", level: 0 }, spacing: { after: 30 },
    children: [new TextRun({ text: t, font: FONT, size: 18, color: INK })],
  })), { w, shade });
}
function table(rows, widths) {
  return new Table({
    columnWidths: widths, width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: LINE }, bottom: { style: BorderStyle.SINGLE, size: 2, color: LINE },
      left: { style: BorderStyle.SINGLE, size: 2, color: LINE }, right: { style: BorderStyle.SINGLE, size: 2, color: LINE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: LINE }, insideVertical: { style: BorderStyle.SINGLE, size: 2, color: LINE },
    },
    rows,
  });
}
function zebra(i) { return i % 2 ? "FFFFFF" : LGREY; }

const kids = [];

// ---------- Title block ----------
kids.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "DOFT CANDLES", font: HFONT, size: 40, bold: true, color: NAVY, characterSpacing: 40 })] }));
kids.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "Diwali Pop-Up Retail Operations", font: HFONT, size: 26, color: TERRA })] }));
kids.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Understanding & Key Deliverables", font: FONT, size: 24, bold: true, color: INK })] }));
kids.push(new Paragraph({
  spacing: { after: 40 },
  children: [
    run("Prepared by ProMarcom Inc. for Doft Candles", { color: GREY }),
    run("      |      Diwali Seasons 2026 · 2027 · 2028", { color: GREY }),
  ],
}));
kids.push(new Paragraph({ spacing: { after: 200 }, border: { bottom: { color: GOLD, size: 12, space: 6, style: BorderStyle.SINGLE } }, children: [run("Date: 30 July 2026      ·      Status: For Doft review", { color: GREY, italics: true, size: 18 })] }));

// ---------- 1. Purpose ----------
kids.push(h1("1.  Document Purpose"));
kids.push(p([
  run("This document sets out ProMarcom's understanding of Doft Candles' requirement for the Diwali pop-up retail programme, and the key deliverables ProMarcom will own as the appointed operations partner. It reflects the parameters agreed with the Doft team — a compact "),
  run("8 ft × 8 ft premium kiosk", { bold: true }),
  run(", a "),
  run("six-week operating window", { bold: true }),
  run(", and a roll-out across "),
  run("metro and sub-metro cities", { bold: true }),
  run(" — and includes ProMarcom's recommended city footprint. Detailed commercials are covered under a separate proposal."),
]));

// ---------- 2. Understanding ----------
kids.push(h1("2.  Our Understanding of the Requirement"));
kids.push(p([
  run("Doft Candles operates premium home-fragrance pop-up kiosks in leading malls during the Diwali season. For the 2026 season — with the intent to continue the partnership in 2027 and 2028 — Doft will deploy compact "),
  run("8 ft × 8 ft", { bold: true }),
  run(" kiosks in high-footfall malls across metro and sub-metro cities, operating for "),
  run("six weeks", { bold: true }),
  run(" in the run-up to and through Diwali. ProMarcom will recruit, deploy and manage all on-ground operations end to end, while Doft supplies the saleable stock, kiosk design, POS/EDC machines and uniforms."),
]));
kids.push(h2("Engagement at a glance"));
kids.push(table([
  new TableRow({ children: [hcell("Parameter", 3000), hcell("Details", 6020)] }),
  ...[
    ["Engagement term", "Diwali seasons 2026, 2027 & 2028 (renewed annually)"],
    ["Operating window", "6 weeks of live operations per city, across the Diwali season"],
    ["Kiosk footprint", "8 ft × 8 ft (≈ 64 sq ft) — compact premium kiosk to Doft-approved design"],
    ["Back-store / storage", "≈ 40 sq ft secure replenishment storage (or mall-provided), per kiosk cluster"],
    ["City footprint", "Metro + sub-metro cities (see Section 3 — Recommended City Footprint)"],
    ["Pop-ups per city", "1–3 kiosks, subject to mall availability, footfall and Doft approval"],
    ["Staffing", "Right-sized compact-kiosk team on a two-shift roster (see Section 5)"],
    ["Training", "Doft-led 1-day product & sales training, 10–21 days pre-launch, 100% attendance"],
    ["Supplied by Doft", "Saleable stock · kiosk design/kit · pop-up furniture · POS/EDC · uniforms (returnable)"],
    ["Owned by ProMarcom", "Kiosk fabrication & install · manpower · logistics · licences · daily operations · reporting"],
  ].map((r, i) => new TableRow({ children: [tcell(r[0], 3000, zebra(i), true), tcell(r[1], 6020, zebra(i))] })),
], [3000, 6020]));

// ---------- 3. City footprint ----------
kids.push(h1("3.  Recommended City Footprint"));
kids.push(p([
  run("We recommend anchoring the launch in India's "),
  run("metro cities", { bold: true }),
  run(" — where premium mall footfall and gifting spend peak during Diwali — and extending into high-potential "),
  run("sub-metro cities", { bold: true }),
  run(" that have matured into strong premium-retail markets. A phased approach lets Doft establish the format in the metros first, then scale into sub-metros within the same season or in 2027–28."),
]));
kids.push(h2("Phase 1 — Metro cities (priority launch)"));
kids.push(table([
  new TableRow({ children: [hcell("City", 1700), hcell("Indicative premium malls", 4620), hcell("Why", 2700)] }),
  ...[
    ["Delhi-NCR", "Select Citywalk, DLF Promenade/Emporio, Ambience", "Largest premium & gifting market"],
    ["Mumbai", "Phoenix Palladium, Jio World Drive, Inorbit", "High disposable income; luxury footfall"],
    ["Bengaluru", "Phoenix Mall of Asia, Orion, UB City", "Young affluent, strong home-décor demand"],
    ["Hyderabad", "Sarath City Capital, Inorbit", "Fast-growing premium retail"],
    ["Chennai", "Phoenix Marketcity, Express Avenue", "Established gifting culture"],
    ["Kolkata", "Quest, South City", "Diwali/festive gifting stronghold"],
    ["Pune", "Phoenix Marketcity, Amanora", "Affluent, high mall engagement"],
  ].map((r, i) => new TableRow({ children: [tcell(r[0], 1700, zebra(i), true), tcell(r[1], 4620, zebra(i)), tcell(r[2], 2700, zebra(i))] })),
], [1700, 4620, 2700]));
kids.push(h2("Phase 2 — Sub-metro cities (high-potential expansion)"));
kids.push(table([
  new TableRow({ children: [hcell("City", 1700), hcell("Indicative premium malls", 4620), hcell("Why", 2700)] }),
  ...[
    ["Ahmedabad", "Ahmedabad One, AlphaOne", "Large affluent, gifting-led market"],
    ["Jaipur", "World Trade Park", "Premium & wedding/festive spend"],
    ["Chandigarh", "Elante", "High per-capita premium retail"],
    ["Lucknow", "Phoenix Palassio", "Emerging luxury mall footfall"],
    ["Kochi", "Lulu Mall", "Very high footfall, premium mix"],
    ["Indore", "Phoenix Citadel, C21", "Growing premium consumption"],
    ["Surat", "VR Surat", "High-income, gifting-oriented"],
  ].map((r, i) => new TableRow({ children: [tcell(r[0], 1700, zebra(i), true), tcell(r[1], 4620, zebra(i)), tcell(r[2], 2700, zebra(i))] })),
], [1700, 4620, 2700]));
kids.push(p([run("Mall names are indicative; final selection will be confirmed against live availability, footfall data, category fit and licence economics. We recommend confirming the metro list first to lock premium mall slots early, as Diwali inventory books out quickly.", { italics: true, color: GREY, size: 19 })]));

// ---------- 4. Key deliverables ----------
kids.push(h1("4.  Key Deliverables (ProMarcom Scope)"));
kids.push(p("ProMarcom will own the following workstreams end to end. Each is delivered to Doft's brand standards and mall compliance requirements."));
kids.push(table([
  new TableRow({ children: [hcell("Workstream", 2500), hcell("Key deliverables & outputs", 6520)] }),
  new TableRow({ children: [tcell("1. Kiosk fabrication & installation", 2500, "FFFFFF", true), blcell([
    "On-site fabrication & installation of the 8×8 kiosk to Doft-approved design",
    "Transport, setup, maintenance, dismantling & return of fixtures",
    "3-day buffer before go-live to absorb any fabrication delay",
  ], 6520, "FFFFFF")] }),
  new TableRow({ children: [tcell("2. Mall coordination & legal", 2500, LGREY, true), blcell([
    "Liaison with mall management across the engagement",
    "All permissions, licences, documentation & compliance",
    "Electricity, access passes, loading/unloading & operational approvals",
  ], 6520, LGREY)] }),
  new TableRow({ children: [tcell("3. Logistics & stock replenishment", 2500, "FFFFFF", true), blcell([
    "Collection & transport of stock from Doft's Ghaziabad warehouse",
    "Timely replenishment via local secure storage; reorder-level triggers",
    "Safe handling, inventory control & return of unsold stock with reconciliation",
  ], 6520, "FFFFFF")] }),
  new TableRow({ children: [tcell("4. Recruitment & staffing", 2500, LGREY, true), blcell([
    "Sourcing, background verification, deployment & attendance management",
    "Payroll and full statutory compliance for all deployed staff",
    "Immediate, no-cost replacement of any absent or resigned staff",
  ], 6520, LGREY)] }),
  new TableRow({ children: [tcell("5. Training support", 2500, "FFFFFF", true), blcell([
    "Coordinate 100% attendance at Doft's 1-day product & sales training",
    "Keep trained staff available throughout; arrange replacement training",
  ], 6520, "FFFFFF")] }),
  new TableRow({ children: [tcell("6. Store operations", 2500, LGREY, true), blcell([
    "Daily opening & closing; sales & customer service",
    "Cash handling & POS/EDC management; visual merchandising & cleanliness",
    "Inventory reconciliation and compliance with mall & Doft brand standards",
  ], 6520, LGREY)] }),
  new TableRow({ children: [tcell("7. Reporting", 2500, "FFFFFF", true), blcell([
    "Daily reports: sales, footfall, inventory, replenishment, attendance",
    "Customer feedback and operational-issue logs",
    "Weekly city reviews and an end-of-season reconciliation",
  ], 6520, "FFFFFF")] }),
], [2500, 6520]));

// ---------- 5. Staffing ----------
kids.push(h1("5.  Recommended Staffing (compact 8×8 kiosk)"));
kids.push(p([
  run("The original brief specified 12 staff for a ~300 sq ft kiosk. As an 8 ft × 8 ft kiosk (≈ 64 sq ft) accommodates only 2–3 people on the floor at a time, we recommend a "),
  run("right-sized team on a two-shift roster", { bold: true }),
  run(" to cover full mall trading hours across the six weeks, with a trained bench for zero-gap cover. Final numbers are easily scaled per kiosk and city."),
]));
kids.push(table([
  new TableRow({ children: [hcell("Role", 3000), hcell("Per kiosk", 1500), hcell("Notes", 4520)] }),
  ...[
    ["Sales Executives", "4", "2 per shift × 2 shifts; female, 22–25, fluent English, retail experience"],
    ["Cashier", "1", "POS/EDC handling; can flex as a sales executive at peak"],
    ["Team Leader / Manager", "1", "Permanent ProMarcom employee; owns daily operations"],
    ["Helper / Support", "1", "Housekeeping, stock handling & replenishment runs"],
    ["Driver (shared)", "1 per city", "Shared across a city's kiosks for stock movement"],
  ].map((r, i) => new TableRow({ children: [tcell(r[0], 3000, zebra(i), true), tcell(r[1], 1500, zebra(i)), tcell(r[2], 4520, zebra(i))] })),
  new TableRow({ children: [tcell("Core team per kiosk", 3000, "EADFCE", true), tcell("6–7", 1500, "EADFCE", true), tcell("Plus a ~15% trained bench per city for immediate replacements", 4520, "EADFCE")] }),
], [3000, 1500, 4520]));

// ---------- 6. Reporting & governance ----------
kids.push(h1("6.  Reporting & Governance"));
kids.push(p("Doft receives a standard daily report per kiosk, consolidated by city:"));
[
  "Sales — units, gross, discounts, net, bills, average bill value",
  "Footfall & conversion — walk-ins, engaged, bills, conversion %",
  "Inventory & replenishment — opening, received, sold, closing, reorder flags",
  "Staff attendance — present/absent and % attendance",
  "Customer feedback and operational issues",
].forEach(t => kids.push(bullet(t)));
kids.push(p([
  run("Cadence: ", { bold: true }),
  run("daily written report; a weekly review call per city; and an end-of-season reconciliation covering sales, stock returns, staffing and learnings for the next season. A live operations workbook (staffing, budget, timeline and all trackers) supports the programme."),
]));

// ---------- 7. Service commitments ----------
kids.push(h1("7.  Service Commitments"));
[
  "100% attendance at Doft's product & sales training, with equally-trained replacements at all times.",
  "Immediate, same-day replacement of any absent or resigned staff — at no additional cost to Doft.",
  "Uniforms kept washed, ironed and well-maintained throughout, and returned in good condition.",
  "Compliance sign-off completed before every go-live (licences, GST/e-invoicing, PF/ESIC, insurance, fire & electrical, staff BGV).",
  "Consistent service quality and brand standards across all cities operating simultaneously.",
].forEach(t => kids.push(bullet(t)));

// ---------- 8. What Doft provides / assumptions ----------
kids.push(h1("8.  Items Supplied by Doft & Assumptions"));
[
  "Doft supplies: saleable stock, the kiosk design/kit, pop-up furniture (unless otherwise agreed), POS/EDC machines, and returnable uniform shirts.",
  "Stock is collected from Doft's Ghaziabad warehouse; insurance-in-transit and safe handling are managed by ProMarcom.",
  "Mall licence / space fees, if borne by ProMarcom, are treated as a pass-through / reimbursable line unless agreed otherwise — to be confirmed per mall.",
  "Final city and mall selection, kiosk count and exact go-live dates are confirmed jointly with Doft ahead of each season.",
].forEach(t => kids.push(bullet(t)));

// ---------- 9. Next steps ----------
kids.push(h1("9.  Next Steps"));
[
  "Doft to confirm the Phase-1 metro city list so premium mall slots can be locked early.",
  "ProMarcom to shortlist specific malls with availability, footfall and licence economics.",
  "Align on kiosk count per city, go-live dates and the training schedule.",
  "Finalise commercials under a separate proposal and issue the engagement agreement.",
].forEach((t, i) => kids.push(new Paragraph({ numbering: { reference: "steps", level: 0 }, spacing: { after: 60 }, children: [run(t)] })));

kids.push(new Paragraph({ spacing: { before: 240 }, children: [run("Prepared by ProMarcom Inc. (EventsActive) as a planning response to the Doft Candles Diwali pop-up requirement. City and mall suggestions are indicative and subject to confirmation.", { italics: true, size: 17, color: GREY })] }));

// ---------- header / footer ----------
let logoPara;
try {
  logoPara = new Paragraph({ alignment: AlignmentType.RIGHT, children: [new ImageRun({ data: fs.readFileSync("assets/final/promarcom_logo_t.png"), transformation: { width: 150, height: 34 }, type: "png" })] });
} catch (e) {
  logoPara = new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "ProMarcom", font: HFONT, bold: true, size: 20, color: GOLD })] });
}

const doc = new Document({
  creator: "ProMarcom Inc.",
  title: "Doft Candles — Understanding & Key Deliverables",
  numbering: {
    config: [
      { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 240 } } } }] },
      { reference: "steps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 240 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { margin: { top: 1080, bottom: 1080, left: 1200, right: 1200 } } },
    headers: { default: new Header({ children: [logoPara] }) },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { color: LINE, size: 4, space: 6, style: BorderStyle.SINGLE } },
          children: [
            new TextRun({ text: "Doft Candles — Understanding & Key Deliverables   ·   ProMarcom Inc.   ·   Page ", font: FONT, size: 15, color: GREY }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: GREY }),
          ],
        })],
      }),
    },
    children: kids,
  }],
});

Packer.toBuffer(doc).then(b => { fs.writeFileSync("Doft_Understanding_and_Key_Deliverables.docx", b); console.log("Saved docx"); });
