const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  PageBreak, Header, Footer, PageNumber, LevelFormat, TabStopType, TabStopPosition
} = require("docx");

const NAVY = "1F3864";
const BLUE = "2E5496";
const LBLUE = "D9E1F2";
const GREY = "F2F2F2";
const GOLD = "FFF2CC";

const FONT = "Arial";

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 140 },
    children: [new TextRun({ text, bold: true, font: FONT, size: 30, color: NAVY })],
    border: { bottom: { color: BLUE, space: 4, style: BorderStyle.SINGLE, size: 8 } },
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 90 },
    children: [new TextRun({ text, bold: true, font: FONT, size: 24, color: BLUE })],
  });
}
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120 },
    alignment: opts.align,
    children: Array.isArray(text) ? text : [new TextRun({ text, font: FONT, size: 21, color: "222222", ...opts })],
  });
}
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 60 },
    children: Array.isArray(text) ? text : [new TextRun({ text, font: FONT, size: 21, color: "222222" })],
  });
}
function num(text, ref = "steps") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 60 },
    children: Array.isArray(text) ? text : [new TextRun({ text, font: FONT, size: 21, color: "222222" })],
  });
}
function run(text, o = {}) { return new TextRun({ text, font: FONT, size: 21, color: "222222", ...o }); }

function cell(text, { header = false, width, shade, bold, align } = {}) {
  return new TableCell({
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    shading: shade ? { type: ShadingType.CLEAR, color: "auto", fill: shade } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({
        text, font: FONT, size: header ? 19 : 19,
        bold: header || bold, color: header ? "FFFFFF" : "222222",
      })],
    })],
  });
}

function table(headers, rows, colWidths) {
  const total = colWidths.reduce((a, b) => a + b, 0);
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => cell(h, { header: true, width: colWidths[i], shade: NAVY })),
  });
  const bodyRows = rows.map((r, ri) =>
    new TableRow({
      children: r.map((c, i) => cell(String(c), {
        width: colWidths[i],
        shade: ri % 2 ? GREY : "FFFFFF",
        align: i === 0 ? AlignmentType.LEFT : AlignmentType.LEFT,
      })),
    })
  );
  return new Table({
    columnWidths: colWidths,
    width: { size: total, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
    },
    rows: [headerRow, ...bodyRows],
  });
}

const children = [];

// ---------- COVER ----------
children.push(new Paragraph({ spacing: { before: 1800 } }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 120 },
  children: [new TextRun({ text: "DOFT CANDLES", bold: true, font: FONT, size: 56, color: NAVY })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 },
  children: [new TextRun({ text: "Diwali Pop-Up Retail Operations", font: FONT, size: 36, color: BLUE })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 120 },
  children: [new TextRun({ text: "Contractor Execution Plan & Commercial Proposal", bold: true, font: FONT, size: 26, color: "222222" })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 600 },
  children: [new TextRun({ text: "Diwali Seasons 2026  •  2027  •  2028", font: FONT, size: 22, color: "666666" })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Prepared in response to Doft Candles — Request for Contractor", italics: true, font: FONT, size: 20, color: "888888" })],
}));
children.push(new Paragraph({ children: [new PageBreak()] }));

// ---------- 1. Executive Summary ----------
children.push(h1("1. Executive Summary"));
children.push(p("Doft Candles (www.doftcandles.com), a premium home-fragrance brand, runs seasonal Diwali pop-up kiosks in leading malls across major Indian cities. This document sets out a complete plan to recruit, deploy, and manage those pop-up retail operations end-to-end as a long-term partner for the Diwali seasons of 2026, 2027 and 2028."));
children.push(p("The plan covers the full contractor scope defined in the brief: kiosk fabrication and installation, mall coordination and legal compliance, logistics and stock replenishment from Doft's Ghaziabad warehouse, recruitment and staffing, training coordination, daily store operations, and daily reporting. It is paired with an operational Excel workbook that contains the staffing model, cost/budget build-up, project timeline, and every daily-reporting, tracking and compliance template the engagement requires."));
children.push(p([
  run("Modelled scope (editable in the workbook): ", { bold: true }),
  run("3 cities × 3 pop-ups = 9 kiosks, 12 personnel per kiosk (108 deployed staff), 3–5 weeks of operations per season, plus a one-day Doft training program with 100% attendance and an immediate no-cost replacement guarantee for any attrition."),
]));

children.push(h2("1.1 Why we are the right partner"));
[
  "Proven capability in mall activations, exhibition management, wedding and event staffing, retail manpower and premium-brand promotions.",
  "Demonstrated ability to run multiple pop-ups simultaneously across cities while holding a consistent service standard.",
  "A permanent Team Leader / Manager on our own payroll at every kiosk, accountable for daily operations.",
  "A trained bench and a same-day replacement process, so attrition never interrupts trading.",
  "Structured daily reporting on sales, footfall, inventory, replenishment, attendance, customer feedback and operational issues.",
].forEach((t) => children.push(bullet(t)));

// ---------- 2. Understanding the Brief ----------
children.push(h1("2. Understanding the Brief"));
children.push(p("The table below restates the engagement parameters exactly as specified, so both sides share one reference point."));
children.push(table(
  ["Parameter", "Requirement"],
  [
    ["Engagement term", "Long-term partnership — Diwali 2026, 2027 and 2028"],
    ["Operating duration", "3–5 weeks before Diwali, each season"],
    ["Kiosk size", "≈ 300 sq. ft."],
    ["Replenishment stockroom", "≈ 90 sq. ft."],
    ["Pop-ups per region", "2–4"],
    ["Staff per pop-up", "12 (6 Sales Executives, 2 Sales Support, 1 Helper, 1 Cashier, 1 Driver, 1 Team Leader/Manager)"],
    ["Training", "One-day Doft product & sales training, 10–21 days before go-live, 100% attendance"],
    ["Supplied by Doft", "Saleable stock, pop-up furniture, POS/EDC machine, returnable uniform shirts"],
    ["Warehouse", "Doft's Ghaziabad warehouse (stock pickup & returns)"],
  ],
  [2600, 6400]
));

// ---------- 3. Staffing Model ----------
children.push(h1("3. Staffing Model"));
children.push(p("Every kiosk is staffed exactly to the brief. The Team Leader/Manager is a permanent employee of our company and owns daily operations; all other roles are recruited, background-verified, deployed and payrolled by us."));
children.push(table(
  ["Role", "Per Pop-up", "Profile & Key Requirement"],
  [
    ["Sales Executive", "6", "Female, 22–25 yrs, fluent conversational English, retail sales experience"],
    ["Sales Support Staff", "2", "Merchandising, stock handling, queue and crowd management"],
    ["Helper", "1", "Housekeeping and material handling"],
    ["Cashier", "1", "Experienced on POS/EDC machines; cash reconciliation"],
    ["Driver", "1", "Valid licence; stock transport and replenishment runs"],
    ["Team Leader / Manager", "1", "Permanent employee; daily operations owner and single point of contact"],
    ["Total", "12", "Per pop-up"],
  ],
  [2600, 1400, 5000]
));
children.push(h2("3.1 Recruitment & deployment"));
[
  "Source through our existing retail/event talent pool, referrals and targeted city hiring; prioritise prior-season performers.",
  "Background verification (BGV) and document checks completed before deployment.",
  "Onboard onto our payroll with full statutory compliance (PF, ESIC, minimum wage, insurance).",
  "Maintain a trained bench of ~15% per city to absorb attrition without any additional cost to Doft.",
].forEach((t) => children.push(bullet(t)));

// ---------- 4. Training ----------
children.push(h1("4. Training Coordination"));
[
  "Coordinate 100% attendance at Doft's one-day product and sales training, scheduled 10–21 days before store operations begin.",
  "Track training completion per candidate in the Recruitment Tracker (workbook).",
  "Keep trained staff available throughout the event; arrange replacement training for any bench or replacement personnel so replacements are always equally trained.",
  "Any attrition after training or during operations is replaced immediately with equally-trained personnel at no additional cost — a contractual commitment.",
].forEach((t) => children.push(bullet(t)));

// ---------- 5. Scope of Work ----------
children.push(h1("5. Scope of Work — Delivery Approach"));

children.push(h2("5.1 Kiosk construction & installation"));
[
  "On-site fabrication and installation of the kiosk to the Doft-approved design (Doft provides the kiosk design/kit).",
  "Transportation, installation, ongoing maintenance, dismantling and return of all kiosk fixtures.",
  "Vendor SLAs with a 3-day buffer before go-live to absorb fabrication delays.",
].forEach((t) => children.push(bullet(t)));

children.push(h2("5.2 Mall coordination & legal documentation"));
[
  "Liaison with mall management from shortlisting through daily operations.",
  "All legal documentation, permissions, licences and compliance requirements.",
  "Coordination for electricity, access passes, loading/unloading and operational approvals.",
].forEach((t) => children.push(bullet(t)));

children.push(h2("5.3 Logistics & stock replenishment"));
[
  "Collection and transportation of stock from Doft's Ghaziabad warehouse.",
  "Timely replenishment throughout the event using the ~90 sq. ft. stockroom and reorder-level triggers.",
  "Safe handling, inventory control and return of unsold inventory with full reconciliation.",
].forEach((t) => children.push(bullet(t)));

children.push(h2("5.4 Store operations"));
[
  "Daily opening and closing of the kiosk.",
  "Sales operations, customer service, and POS/EDC cash handling.",
  "Daily sales reporting and inventory reconciliation.",
  "Store cleanliness, visual merchandising, uniform upkeep (washed, ironed, maintained), and compliance with mall policies and Doft brand standards.",
].forEach((t) => children.push(bullet(t)));

children.push(h2("5.5 Uniforms & Doft-supplied items"));
children.push(p("Doft supplies saleable stock, pop-up furniture, the POS/EDC machine and returnable uniform shirts. We log receipt of every supplied item, keep uniforms washed, ironed and well-maintained throughout, and return uniforms and fixtures in good condition at close."));

// ---------- 6. Reporting ----------
children.push(h1("6. Reporting & Governance"));
children.push(p("We provide a standard daily report per pop-up, consolidated by city and for the whole engagement. The workbook contains ready templates for each stream."));
children.push(table(
  ["Report", "Frequency", "Template (workbook tab)"],
  [
    ["Sales (units, gross, net, bills, avg bill)", "Daily", "8. Daily Sales Report"],
    ["Footfall & conversion", "Daily", "10. Footfall & Conversion"],
    ["Inventory & stock replenishment", "Daily", "9. Inventory & Replenish"],
    ["Staff attendance", "Daily", "7. Attendance Tracker"],
    ["Customer feedback", "Daily / rolling", "11. Customer Feedback"],
    ["Operational issues", "As they occur", "13. Risk Register + daily note"],
  ],
  [3400, 2000, 3600]
));
children.push(p([run("Governance cadence: ", { bold: true }), run("daily written report to Doft; a weekly review call per city; and an end-of-season reconciliation and review covering sales, stock returns, staffing and learnings for the next season.")]));

// ---------- 7. Timeline ----------
children.push(h1("7. Project Timeline"));
children.push(p("Timeline is expressed relative to go-live (T). Detailed, per-region Gantt is in the workbook (tab 2)."));
children.push(table(
  ["Phase", "Window", "Owner"],
  [
    ["Contract award & kick-off", "T-8w to T-7w", "Doft + Contractor"],
    ["Mall shortlisting & licence applications", "T-7w to T-4w", "Contractor"],
    ["Recruitment & background verification", "T-6w to T-2w", "Contractor"],
    ["Kiosk fabrication & fit-out", "T-3w to T-1w", "Contractor"],
    ["Doft product & sales training (1 day)", "T-2w", "Doft"],
    ["Stock pickup (Ghaziabad) & first fill", "T-1w", "Contractor"],
    ["Store go-live & daily operations", "T to T+5w", "Contractor"],
    ["Dismantle, fixture & unsold-stock return", "T+5w to T+6w", "Contractor"],
    ["Final reconciliation & season review", "T+6w", "Both"],
  ],
  [4200, 2600, 2200]
));

// ---------- 8. Commercials ----------
children.push(h1("8. Commercial Model"));
children.push(p("The workbook builds the full commercial from the ground up: a per-pop-up manpower cost (loaded for statutory contributions), plus operating cost heads, a contractor management margin, and GST. All rates are editable planning placeholders to be confirmed against actual quotes and statutory rates."));
children.push(table(
  ["Cost head", "Basis"],
  [
    ["Manpower (loaded, full duration)", "Per-pop-up × total pop-ups (from Manpower Cost tab)"],
    ["Kiosk fabrication, fit-out & signage", "Per pop-up"],
    ["Kiosk transport, install & dismantle", "Per pop-up"],
    ["Mall licence / space fee (if borne)", "Per pop-up — confirm per mall; often reimbursed by Doft"],
    ["Utilities, access passes, stockroom", "Per pop-up"],
    ["Logistics (Ghaziabad pickup & replenishment)", "Per pop-up"],
    ["Uniform upkeep, staff welfare & incentives", "Per pop-up"],
    ["Statutory, compliance & training logistics", "Per pop-up"],
    ["Contingency / attrition buffer", "Per pop-up"],
    ["Management margin + GST", "Applied on direct-cost subtotal"],
  ],
  [4600, 4400]
));
children.push(p([run("Note: ", { bold: true }), run("Whether the mall licence/space fee is borne by the contractor or reimbursed by Doft is the single largest swing item and should be confirmed before pricing. It is isolated as its own line so it can be toggled without disturbing the rest of the model.")]));

// ---------- 9. Quality & Risk ----------
children.push(h1("9. Quality, Compliance & Risk"));
children.push(h2("9.1 Service-quality commitments"));
[
  "100% training attendance and equally-trained replacements at all times.",
  "Same-day replacement of any absent or resigned staff at no additional cost.",
  "Daily reporting discipline and weekly city reviews.",
  "Brand-standard visual merchandising, grooming and uniform upkeep.",
].forEach((t) => children.push(bullet(t)));
children.push(h2("9.2 Compliance"));
children.push(p("A per-pop-up compliance checklist (workbook tab 12) is signed off before go-live: mall licence, Shops & Establishment, GST/e-invoicing, staff BGV, PF/ESIC, insurance, fire & electrical clearance, access permits, POS/EDC testing, uniform logging and stock insurance-in-transit."));
children.push(h2("9.3 Key risks & mitigation"));
children.push(table(
  ["Risk", "Mitigation"],
  [
    ["Staff attrition after training", "15% trained bench; immediate no-cost replacement"],
    ["Mall permission delay", "Start licensing at T-7w; parallel mall shortlist"],
    ["Stock-out on peak days", "Reorder levels + daily replenishment from stockroom"],
    ["POS/EDC downtime", "Backup EDC + connectivity failover; trained cashier"],
    ["Fabrication delay", "Vendor SLA + 3-day buffer before go-live"],
  ],
  [3800, 5200]
));

// ---------- 10. The Workbook ----------
children.push(h1("10. The Accompanying Workbook"));
children.push(p("The Excel workbook (Doft_Diwali_PopUp_Operations_Workbook.xlsx) is the operating system for this engagement. Edit the gold cells on the README & Assumptions tab (city count, pop-ups per region, pay rates, margin) and every downstream sheet recalculates."));
children.push(table(
  ["#", "Tab", "Purpose"],
  [
    ["1", "README & Assumptions", "Global levers that drive the model"],
    ["2", "Project Timeline", "Per-region Gantt of milestones"],
    ["3", "Staffing Plan", "Fixed 12-person kiosk composition"],
    ["4", "Manpower Cost", "Loaded pay build-up, per pop-up and rolled up"],
    ["5", "Budget Summary", "All cost heads → contract value incl. GST"],
    ["6", "Recruitment Tracker", "Candidate pipeline: BGV, training, deployment"],
    ["7", "Attendance Tracker", "Daily P/A/L/R with % attendance"],
    ["8", "Daily Sales Report", "Units, sales, bills, avg bill, season total"],
    ["9", "Inventory & Replenish", "SKU reconciliation with reorder flags"],
    ["10", "Footfall & Conversion", "Footfall vs bills, conversion %"],
    ["11", "Customer Feedback", "Verbatim feedback & resolution log"],
    ["12", "Compliance Checklist", "Per-pop-up legal & compliance sign-off"],
    ["13", "Risk Register", "Likelihood × impact scoring & owners"],
  ],
  [700, 3300, 5000]
));

children.push(new Paragraph({ spacing: { before: 300 }, children: [run("Prepared as a planning response to the Doft Candles Request for Contractor. All figures are editable placeholders for confirmation.", { italics: true, color: "888888", size: 18 })] }));

const doc = new Document({
  creator: "Contractor",
  title: "Doft Candles Diwali Pop-Up — Execution Plan",
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 460, hanging: 260 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 900, hanging: 260 } } } },
        ],
      },
      {
        reference: "steps",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 460, hanging: 260 } } } },
        ],
      },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1100, bottom: 1100, left: 1200, right: 1200 } } },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Doft Candles — Diwali Pop-Up Operations", font: FONT, size: 16, color: "999999" })],
          border: { bottom: { color: "DDDDDD", space: 2, style: BorderStyle.SINGLE, size: 4 } },
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Contractor Execution Plan  |  Page ", font: FONT, size: 16, color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: "999999" }),
          ],
        })],
      }),
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("/home/user/Projects/doft_diwali_popup/Doft_Diwali_PopUp_Execution_Plan.docx", buf);
  console.log("Saved plan docx");
});
