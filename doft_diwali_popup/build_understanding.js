const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  Header, Footer, PageNumber, LevelFormat, ImageRun
} = require("docx");

const NAVY = "4A343A";
const GOLD = "9C7A2E";
const TERRA = "9E5A45";
const ROSE = "C39A98";
const INK = "2E2A28";
const GREY = "6B625C";
const LGREY = "F3EEE6";
const LINE = "D9CFC0";
const FONT = "Calibri";
const HFONT = "Cambria";

function run(text, o = {}) { return new TextRun({ text, font: FONT, size: 21, color: INK, ...o }); }
function h1(text) {
  return new Paragraph({
    spacing: { before: 300, after: 120 },
    border: { bottom: { color: ROSE, size: 8, space: 4, style: BorderStyle.SINGLE } },
    children: [new TextRun({ text, font: HFONT, size: 27, bold: true, color: NAVY })],
  });
}
function h2(text) {
  return new Paragraph({ spacing: { before: 200, after: 80 }, children: [new TextRun({ text, font: HFONT, size: 23, bold: true, color: TERRA })] });
}
function p(text, o = {}) {
  return new Paragraph({ spacing: { after: o.after ?? 120 }, alignment: o.align,
    children: Array.isArray(text) ? text : [new TextRun({ text, font: FONT, size: 21, color: INK })] });
}
function bullet(text, level = 0) {
  return new Paragraph({ numbering: { reference: "bul", level }, spacing: { after: 60 },
    children: Array.isArray(text) ? text : [new TextRun({ text, font: FONT, size: 21, color: INK })] });
}
function cell(children, { w, shade, valign = "center" } = {}) {
  return new TableCell({ width: w ? { size: w, type: WidthType.DXA } : undefined,
    shading: shade ? { type: ShadingType.CLEAR, color: "auto", fill: shade } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 }, verticalAlign: valign,
    children: Array.isArray(children) ? children : [children] });
}
function hcell(text, w) { return cell(new Paragraph({ children: [new TextRun({ text, font: FONT, size: 19, bold: true, color: "FFFFFF" })] }), { w, shade: NAVY }); }
function tcell(text, w, shade, bold = false) {
  const paras = (Array.isArray(text) ? text : [text]).map(t =>
    new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: t, font: FONT, size: 19, bold, color: INK })] }));
  return cell(paras, { w, shade });
}
function blcell(items, w, shade) {
  return cell(items.map(t => new Paragraph({ numbering: { reference: "bul", level: 0 }, spacing: { after: 30 },
    children: [new TextRun({ text: t, font: FONT, size: 18, color: INK })] })), { w, shade });
}
function table(rows, widths) {
  return new Table({ columnWidths: widths, width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: LINE }, bottom: { style: BorderStyle.SINGLE, size: 2, color: LINE },
      left: { style: BorderStyle.SINGLE, size: 2, color: LINE }, right: { style: BorderStyle.SINGLE, size: 2, color: LINE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: LINE }, insideVertical: { style: BorderStyle.SINGLE, size: 2, color: LINE },
    }, rows });
}
function zebra(i) { return i % 2 ? "FFFFFF" : LGREY; }

const kids = [];

// ---------- Title block ----------
kids.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "DOFT CANDLES", font: HFONT, size: 40, bold: true, color: NAVY, characterSpacing: 40 })] }));
kids.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "Diwali Pop-Up Retail Operations", font: HFONT, size: 26, color: TERRA })] }));
kids.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Understanding & Key Deliverables", font: FONT, size: 24, bold: true, color: INK })] }));
kids.push(new Paragraph({ spacing: { after: 40 }, children: [run("Prepared by ProMarcom Inc. for Doft Candles", { color: GREY }), run("      |      Diwali Seasons 2026, 2027 and 2028", { color: GREY })] }));
kids.push(new Paragraph({ spacing: { after: 200 }, border: { bottom: { color: GOLD, size: 12, space: 6, style: BorderStyle.SINGLE } }, children: [run("Date: 30 July 2026      |      For your review", { color: GREY, italics: true, size: 18 })] }));

// ---------- 1. Purpose ----------
kids.push(h1("1.  Purpose of this Note"));
kids.push(p("This note sets out how we understand the Diwali pop-up requirement and what we will deliver as your operations partner. It is based on the parameters we agreed with your team: a compact 8x8 ft kiosk, a six-week run, and a presence across the metros and sub-metros. It also carries our suggested city list. Commercials are covered in a separate proposal."));

// ---------- 2. Understanding ----------
kids.push(h1("2.  How We Understand the Requirement"));
kids.push(p("Doft runs premium home-fragrance kiosks in leading malls through the Diwali season. For 2026, and with the plan to carry on in 2027 and 2028, you will run compact 8x8 ft kiosks in busy malls across the metros and sub-metros, trading for six weeks around Diwali. We handle everything on the ground, from hiring and deployment to the day-to-day running. You supply the stock, the kiosk design, the POS/EDC machines and the uniforms."));
kids.push(h2("Quick summary"));
kids.push(table([
  new TableRow({ children: [hcell("Item", 3000), hcell("Details", 6020)] }),
  ...[
    ["Term", "Diwali seasons 2026, 2027 and 2028, renewed each year"],
    ["Operating window", "Six weeks of live trading per city, across the Diwali season"],
    ["Kiosk size", "8x8 ft (about 64 sq ft), built to your approved design"],
    ["Backup storage", "About 40 sq ft of secure storage for replenishment, or mall-provided"],
    ["Cities", "Metros and sub-metros (our suggestions are in Section 3)"],
    ["Kiosks per city", "1 to 3, based on mall availability, footfall and your sign-off"],
    ["Team", "A compact kiosk team on two shifts (see Section 5)"],
    ["Training", "One-day product and sales training by Doft, 10 to 21 days before launch, full attendance"],
    ["You supply", "Stock, kiosk design and kit, furniture, POS/EDC, uniforms (returnable)"],
    ["We handle", "Kiosk build and install, manpower, logistics, licences, daily operations and reporting"],
  ].map((r, i) => new TableRow({ children: [tcell(r[0], 3000, zebra(i), true), tcell(r[1], 6020, zebra(i))] })),
], [3000, 6020]));

// ---------- 3. City footprint ----------
kids.push(h1("3.  Suggested City Footprint"));
kids.push(p("We suggest starting in the metros, where premium mall footfall and festive spending are highest, and then adding the stronger sub-metros. Running it in two phases lets you settle the format in the metros first and widen the reach afterwards, either later in the same season or in the following years."));
kids.push(h2("Phase 1: Metro cities (launch first)"));
kids.push(table([
  new TableRow({ children: [hcell("City", 1700), hcell("Indicative premium malls", 4620), hcell("Why", 2700)] }),
  ...[
    ["Delhi-NCR", "Select Citywalk, DLF Promenade/Emporio, Ambience", "Largest premium and gifting market"],
    ["Mumbai", "Phoenix Palladium, Jio World Drive, Inorbit", "High spend, strong luxury footfall"],
    ["Bengaluru", "Phoenix Mall of Asia, Orion, UB City", "Young, affluent, big on home décor"],
    ["Hyderabad", "Sarath City Capital, Inorbit", "Fast-growing premium retail"],
    ["Chennai", "Phoenix Marketcity, Express Avenue", "Steady gifting culture"],
    ["Kolkata", "Quest, South City", "Strong festive gifting market"],
    ["Pune", "Phoenix Marketcity, Amanora", "Affluent, high mall engagement"],
  ].map((r, i) => new TableRow({ children: [tcell(r[0], 1700, zebra(i), true), tcell(r[1], 4620, zebra(i)), tcell(r[2], 2700, zebra(i))] })),
], [1700, 4620, 2700]));
kids.push(h2("Phase 2: Sub-metro cities (next wave)"));
kids.push(table([
  new TableRow({ children: [hcell("City", 1700), hcell("Indicative premium malls", 4620), hcell("Why", 2700)] }),
  ...[
    ["Ahmedabad", "Ahmedabad One, AlphaOne", "Large, affluent, gifting-led"],
    ["Jaipur", "World Trade Park", "Premium and wedding season spend"],
    ["Chandigarh", "Elante", "High per-head premium retail"],
    ["Lucknow", "Phoenix Palassio", "Rising luxury mall footfall"],
    ["Kochi", "Lulu Mall", "Very high footfall, premium mix"],
    ["Indore", "Phoenix Citadel, C21", "Growing premium spend"],
    ["Surat", "VR Surat", "High income, gifting-oriented"],
  ].map((r, i) => new TableRow({ children: [tcell(r[0], 1700, zebra(i), true), tcell(r[1], 4620, zebra(i)), tcell(r[2], 2700, zebra(i))] })),
], [1700, 4620, 2700]));
kids.push(p([run("These mall names are only indicative. We will confirm the final list against live availability, footfall, category fit and licence cost. Our advice is to lock the metros first, since premium Diwali slots fill up early.", { italics: true, color: GREY, size: 19 })]));

// ---------- 4. Key deliverables ----------
kids.push(h1("4.  What We Will Deliver"));
kids.push(p("We will run the workstreams below, each to your brand standards and the mall's compliance rules."));
kids.push(table([
  new TableRow({ children: [hcell("Workstream", 2500), hcell("What we deliver", 6520)] }),
  new TableRow({ children: [tcell("1. Kiosk build & install", 2500, "FFFFFF", true), blcell([
    "Build and install the 8x8 kiosk to your approved design",
    "Transport, setup, upkeep, dismantling and return of fixtures",
    "A 3-day buffer before go-live to cover any build delay",
  ], 6520, "FFFFFF")] }),
  new TableRow({ children: [tcell("2. Mall coordination & legal", 2500, LGREY, true), blcell([
    "Liaison with mall management through the season",
    "All permissions, licences, documents and compliance",
    "Electricity, access passes, loading/unloading and operational approvals",
  ], 6520, LGREY)] }),
  new TableRow({ children: [tcell("3. Logistics & replenishment", 2500, "FFFFFF", true), blcell([
    "Pick up and move stock from your Ghaziabad warehouse",
    "Refill on time from local storage, with reorder levels set per SKU",
    "Safe handling, stock control, and return of unsold stock with reconciliation",
  ], 6520, "FFFFFF")] }),
  new TableRow({ children: [tcell("4. Recruitment & staffing", 2500, LGREY, true), blcell([
    "Sourcing, background checks, deployment and attendance",
    "Payroll and full statutory compliance for all staff",
    "Same-day replacement of any absent or resigned staff, at no extra cost",
  ], 6520, LGREY)] }),
  new TableRow({ children: [tcell("5. Training support", 2500, "FFFFFF", true), blcell([
    "Get full attendance at your one-day product and sales training",
    "Keep trained staff on through the season, and train any replacements",
  ], 6520, "FFFFFF")] }),
  new TableRow({ children: [tcell("6. Store operations", 2500, LGREY, true), blcell([
    "Daily open and close, sales and customer service",
    "Cash handling and POS/EDC, plus visual merchandising and cleanliness",
    "Stock reconciliation, and compliance with mall and Doft standards",
  ], 6520, LGREY)] }),
  new TableRow({ children: [tcell("7. Reporting", 2500, "FFFFFF", true), blcell([
    "Daily numbers on sales, footfall, stock, replenishment and attendance",
    "Customer feedback and a log of any operational issues",
    "Weekly city reviews and a full reconciliation at the end of the season",
  ], 6520, "FFFFFF")] }),
], [2500, 6520]));

// ---------- 5. Staffing ----------
kids.push(h1("5.  Suggested Team for a Compact Kiosk"));
kids.push(p("The original brief mentioned 12 people for a 300 sq ft kiosk. An 8x8 ft kiosk (about 64 sq ft) only holds two or three people on the floor at a time, so we suggest a smaller team on two shifts to cover full mall hours through the six weeks. We will also keep a small trained bench so a gap never stops sales. These numbers scale easily by kiosk and city."));
kids.push(table([
  new TableRow({ children: [hcell("Role", 3000), hcell("Per kiosk", 1500), hcell("Notes", 4520)] }),
  ...[
    ["Sales Executives", "4", "2 per shift, 2 shifts. Female, 22-25, fluent English, retail experience"],
    ["Cashier", "1", "Handles POS/EDC, can help on sales at peak hours"],
    ["Team Leader / Manager", "1", "A permanent ProMarcom employee who runs the kiosk"],
    ["Helper / Support", "1", "Housekeeping, stock handling and refill runs"],
    ["Driver (shared)", "1 per city", "Shared across a city's kiosks for stock movement"],
  ].map((r, i) => new TableRow({ children: [tcell(r[0], 3000, zebra(i), true), tcell(r[1], 1500, zebra(i)), tcell(r[2], 4520, zebra(i))] })),
  new TableRow({ children: [tcell("Core team per kiosk", 3000, "EADFCE", true), tcell("6 to 7", 1500, "EADFCE", true), tcell("Plus a trained bench of about 15% per city for quick cover", 4520, "EADFCE")] }),
], [3000, 1500, 4520]));

// ---------- 6. Reporting ----------
kids.push(h1("6.  Reporting & Reviews"));
kids.push(p("You will get a standard daily report per kiosk, pulled together by city. It covers:"));
[
  "Sales: units, gross, discounts, net, bills and average bill value",
  "Footfall and conversion: walk-ins, engaged, bills and conversion rate",
  "Stock and replenishment: opening, received, sold, closing and reorder flags",
  "Attendance: present, absent and attendance rate",
  "Customer feedback and any operational issues",
].forEach(t => kids.push(bullet(t)));
kids.push(p("Beyond the daily report, we will hold a weekly review call per city and a full reconciliation at the end of the season. A live operations workbook covering staffing, budget, timeline and trackers runs alongside the programme."));

// ---------- 7. Commitments ----------
kids.push(h1("7.  Our Commitments"));
[
  "Full attendance at your training, and equally trained staff on the floor at all times.",
  "Same-day replacement of any absent or resigned staff, at no extra cost to you.",
  "Uniforms kept washed, ironed and in good shape, and returned in good condition.",
  "Compliance signed off before every go-live: licences, GST and e-invoicing, PF and ESIC, insurance, fire and electrical, and staff background checks.",
  "The same service quality and brand standards across every city, even when several run at once.",
].forEach(t => kids.push(bullet(t)));

// ---------- 8. What Doft provides / assumptions ----------
kids.push(h1("8.  What You Provide, and a Few Assumptions"));
[
  "You supply the stock, the kiosk design and kit, the furniture (unless we agree otherwise), the POS/EDC machines and the uniforms (returnable).",
  "Stock is picked up from your Ghaziabad warehouse. We take care of insurance in transit and safe handling.",
  "If we pay any mall licence or space fees, we will bill them as a pass-through unless we agree otherwise. We will confirm this mall by mall.",
  "We will finalise the cities, malls, kiosk counts and go-live dates with you before each season.",
].forEach(t => kids.push(bullet(t)));

// ---------- 9. Next steps ----------
kids.push(h1("9.  Next Steps"));
[
  "You confirm the Phase 1 metro cities, so we can lock premium mall slots early.",
  "We shortlist specific malls with availability, footfall and licence cost.",
  "We agree the kiosk count per city, the go-live dates and the training schedule.",
  "We finalise commercials in a separate proposal and sign the agreement.",
].forEach(t => kids.push(new Paragraph({ numbering: { reference: "steps", level: 0 }, spacing: { after: 60 }, children: [run(t)] })));

kids.push(new Paragraph({ spacing: { before: 240 }, children: [run("Prepared by ProMarcom Inc. (EventsActive). City and mall suggestions are indicative and will be confirmed with you.", { italics: true, size: 17, color: GREY })] }));

// ---------- header / footer ----------
let logoPara;
try {
  logoPara = new Paragraph({ alignment: AlignmentType.RIGHT, children: [new ImageRun({ data: fs.readFileSync("assets/final/promarcom_logo.png"), transformation: { width: 150, height: 34 }, type: "png" })] });
} catch (e) {
  logoPara = new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "ProMarcom", font: HFONT, bold: true, size: 20, color: GOLD })] });
}

const doc = new Document({
  creator: "ProMarcom Inc.",
  title: "Doft Candles — Understanding & Key Deliverables",
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 240 } } } }] },
    { reference: "steps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 240 } } } }] },
  ] },
  sections: [{
    properties: { page: { margin: { top: 1080, bottom: 1080, left: 1200, right: 1200 } } },
    headers: { default: new Header({ children: [logoPara] }) },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { color: LINE, size: 4, space: 6, style: BorderStyle.SINGLE } },
      children: [
        new TextRun({ text: "Doft Candles — Understanding & Key Deliverables   ·   ProMarcom Inc.   ·   Page ", font: FONT, size: 15, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: GREY }),
      ],
    })] }) },
    children: kids,
  }],
});

Packer.toBuffer(doc).then(b => { fs.writeFileSync("Doft_Understanding_and_Key_Deliverables.docx", b); console.log("Saved docx"); });
