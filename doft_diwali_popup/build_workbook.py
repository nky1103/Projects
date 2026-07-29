#!/usr/bin/env python3
"""Build the Doft Candles Diwali Pop-Up operations & costing workbook."""
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side, NamedStyle
from openpyxl.utils import get_column_letter
from openpyxl.comments import Comment

wb = openpyxl.Workbook()

# ---------- palette / helpers ----------
NAVY   = "1F3864"   # headers
BLUE   = "2E5496"   # section band
LBLUE  = "D9E1F2"   # subheader fill
GREY   = "F2F2F2"   # zebra / input area
GOLD   = "FFF2CC"   # highlight / input cells
GREEN  = "E2EFDA"
BORDER_CLR = "BFBFBF"

thin = Side(style="thin", color=BORDER_CLR)
box = Border(left=thin, right=thin, top=thin, bottom=thin)

def style_header(cell, fill=NAVY, color="FFFFFF", size=11, bold=True, align="center"):
    cell.font = Font(name="Arial", size=size, bold=bold, color=color)
    cell.fill = PatternFill("solid", fgColor=fill)
    cell.alignment = Alignment(horizontal=align, vertical="center", wrap_text=True)
    cell.border = box

def cell_val(ws, ref, value, bold=False, size=10, align="left", fill=None,
             color="000000", wrap=False, border=True, number_format=None, italic=False):
    c = ws[ref]
    c.value = value
    c.font = Font(name="Arial", size=size, bold=bold, color=color, italic=italic)
    c.alignment = Alignment(horizontal=align, vertical="center", wrap_text=wrap)
    if fill:
        c.fill = PatternFill("solid", fgColor=fill)
    if border:
        c.border = box
    if number_format:
        c.number_format = number_format
    return c

INR = u'₹#,##0'
INR2 = u'₹#,##0.00'
PCT = '0.0%'

def title_block(ws, title, subtitle, span=8):
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=span)
    t = ws.cell(row=1, column=1, value=title)
    t.font = Font(name="Arial", size=16, bold=True, color="FFFFFF")
    t.fill = PatternFill("solid", fgColor=NAVY)
    t.alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws.row_dimensions[1].height = 30
    ws.merge_cells(start_row=2, start_column=1, end_row=2, end_column=span)
    s = ws.cell(row=2, column=1, value=subtitle)
    s.font = Font(name="Arial", size=10, italic=True, color="FFFFFF")
    s.fill = PatternFill("solid", fgColor=BLUE)
    s.alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws.row_dimensions[2].height = 20

# =========================================================
# 1. README & ASSUMPTIONS
# =========================================================
ws = wb.active
ws.title = "1. README & Assumptions"
title_block(ws, "Doft Candles — Diwali Pop-Up Retail Operations", "Contractor Operations & Costing Workbook  |  Seasons 2026 / 2027 / 2028", span=6)
ws.sheet_view.showGridLines = False

r = 4
cell_val(ws, f"A{r}", "PURPOSE", bold=True, size=12, color=NAVY, border=False)
r += 1
cell_val(ws, f"A{r}", ("This workbook is the operational and commercial toolkit for managing Doft Candles' seasonal Diwali "
                        "pop-up kiosks. It contains the staffing model, cost/budget build-up, project timeline, and all "
                        "daily-reporting, compliance and tracking templates required by the client brief."),
         wrap=True, border=False)
ws.merge_cells(f"A{r}:F{r}")
ws.row_dimensions[r].height = 42

r += 2
cell_val(ws, f"A{r}", "HOW TO USE", bold=True, size=12, color=NAVY, border=False)
r += 1
legend = [
    ("Gold cells", "Inputs you edit — rates, counts, dates, actuals.", GOLD),
    ("White cells", "Formula-driven — do not overwrite; they recalculate automatically.", "FFFFFF"),
    ("Green cells", "Roll-up / summary totals.", GREEN),
]
for name, desc, fill in legend:
    cell_val(ws, f"A{r}", name, bold=True, fill=fill, align="center")
    cell_val(ws, f"B{r}", desc, wrap=True)
    ws.merge_cells(f"B{r}:F{r}")
    ws.row_dimensions[r].height = 20
    r += 1

r += 1
cell_val(ws, f"A{r}", "GLOBAL ASSUMPTIONS  (edit these — they drive every other sheet)", bold=True, size=12, color="FFFFFF", fill=BLUE)
ws.merge_cells(f"A{r}:F{r}")
r += 1
hdr = r
for col, h in zip("ABC", ["Parameter", "Value", "Notes / Source"]):
    style_header(ws[f"{col}{hdr}"], fill=NAVY)
cell_val(ws, f"D{hdr}", "", border=True); cell_val(ws, f"E{hdr}", "", border=True); cell_val(ws, f"F{hdr}", "", border=True)
r += 1

assumptions = [
    ("Number of cities / regions",            3,       "Brief: multi-city. Model default — edit as awarded."),
    ("Pop-ups per region",                    3,       "Brief: 2–4 per region. Mid-point used."),
    ("Total pop-ups (calc)",                  "=B{ass_start}*B{ass_start1}", "Cities × pop-ups per region."),
    ("Operational duration (weeks)",          4,       "Brief: 3–5 weeks before Diwali."),
    ("Setup / fabrication (days)",            5,       "Kiosk install + fit-out before go-live."),
    ("Training window (days before go-live)", 14,      "Brief: training 10–21 days prior."),
    ("Staff per pop-up",                      12,      "Fixed by brief (see Staffing Plan tab)."),
    ("Operating days per week",               7,       "Mall hours, all days."),
    ("Store hours per day",                   11,      "Typical mall trading hours."),
    ("Statutory load on wages (PF+ESI+etc.)", 0.13,    "~13% employer statutory contribution."),
    ("Contractor management margin",          0.15,    "Applied on total direct cost."),
    ("GST on contractor invoice",             0.18,    "Output GST, 18%."),
    ("Currency",                              "INR (₹)", "All figures in Indian Rupees."),
]
ass_start = r  # row of first assumption (Number of cities)
for i, (p, v, note) in enumerate(assumptions):
    rr = r + i
    if isinstance(v, str) and v.startswith("="):
        v = v.replace("{ass_start1}", str(ass_start + 1)).replace("{ass_start}", str(ass_start))
    cell_val(ws, f"A{rr}", p, wrap=True)
    is_calc = isinstance(v, str) and v.startswith("=")
    fmt = None
    if p.startswith("Statutory") or p.startswith("Contractor management") or p.startswith("GST"):
        fmt = PCT
    cell_val(ws, f"B{rr}", v, bold=True, align="center",
             fill=(GREEN if is_calc else GOLD), number_format=fmt,
             color=("000000"))
    cell_val(ws, f"C{rr}", note, wrap=True, size=9, italic=True)
    ws.merge_cells(f"C{rr}:F{rr}")
    ws.row_dimensions[rr].height = 18

# named references for reuse
ASS = {name.split("  ")[0]: f"'1. README & Assumptions'!$B${ass_start+i}" for i, (name, _, _) in enumerate(assumptions)}

r = r + len(assumptions) + 1
cell_val(ws, f"A{r}", "DISCLAIMER", bold=True, color=NAVY, border=False)
r += 1
cell_val(ws, f"A{r}", ("All pay rates and cost figures are realistic planning placeholders, not quotations. Confirm against "
                        "actual vendor quotes, mall licence fees, and statutory rates before commercial submission."),
         wrap=True, italic=True, size=9, border=False)
ws.merge_cells(f"A{r}:F{r}")
ws.row_dimensions[r].height = 30

ws.column_dimensions["A"].width = 34
ws.column_dimensions["B"].width = 16
ws.column_dimensions["C"].width = 30
for c in "DEF":
    ws.column_dimensions[c].width = 14

# capture key assumption rows for cross-sheet refs
ROW_POPUPS_TOTAL = ass_start + 2      # total pop-ups
ROW_STAFF_PP     = ass_start + 6      # staff per pop-up
ROW_STAT_LOAD    = ass_start + 9
ROW_MGMT_MARGIN  = ass_start + 10
ROW_GST          = ass_start + 11
ROW_OP_WEEKS     = ass_start + 3
SHEET_ASS = "'1. README & Assumptions'"

# =========================================================
# 2. PROJECT TIMELINE
# =========================================================
ws = wb.create_sheet("2. Project Timeline")
ws.sheet_view.showGridLines = False
title_block(ws, "Project Timeline & Milestones", "Per-region rollout — T = kiosk go-live (Diwali season). Weeks shown relative to go-live.", span=11)

r = 4
headers = ["#", "Phase / Activity", "Owner", "Start (T-)", "End (T-)", "T-6w", "T-5w", "T-4w", "T-3w", "T-2w", "T-1w"]
for i, h in enumerate(headers):
    style_header(ws.cell(row=r, column=i+1, value=h))
weekcols = list(range(6, 12))  # columns F..K

timeline = [
    ("Contract award & kick-off", "Doft + Contractor", "T-8w", "T-7w", []),
    ("Mall shortlisting & licence applications", "Contractor", "T-7w", "T-4w", [0,1,2]),
    ("Kiosk fabrication & fit-out (Doft-approved design)", "Contractor", "T-3w", "T-1w", [3,4,5]),
    ("Recruitment & background verification", "Contractor", "T-6w", "T-2w", [0,1,2,3]),
    ("Doft product & sales training (1 day, 100% attendance)", "Doft", "T-2w", "T-2w", [4]),
    ("Statutory registration & staff onboarding/payroll setup", "Contractor", "T-4w", "T-1w", [2,3,4,5]),
    ("Stock pickup from Ghaziabad warehouse & first fill", "Contractor", "T-1w", "T-1w", [5]),
    ("Store go-live & daily operations (3–5 weeks)", "Contractor", "T", "T+5w", [5]),
    ("Daily reporting (sales/footfall/inventory/attendance)", "Contractor", "T", "T+5w", [5]),
    ("Replenishment cycles", "Contractor", "T", "T+5w", [5]),
    ("Dismantling, fixture return & unsold-stock return", "Contractor", "T+5w", "T+6w", []),
    ("Final reconciliation & season review", "Both", "T+6w", "T+6w", []),
]
r += 1
for i, (act, owner, s, e, bars) in enumerate(timeline):
    rr = r + i
    zebra = GREY if i % 2 else "FFFFFF"
    cell_val(ws, f"A{rr}", i+1, align="center", fill=zebra)
    cell_val(ws, f"B{rr}", act, wrap=True, fill=zebra)
    cell_val(ws, f"C{rr}", owner, align="center", fill=zebra, size=9)
    cell_val(ws, f"D{rr}", s, align="center", fill=zebra, size=9)
    cell_val(ws, f"E{rr}", e, align="center", fill=zebra, size=9)
    for wc in range(6):
        col = get_column_letter(6 + wc)
        fillc = BLUE if wc in bars else zebra
        c = cell_val(ws, f"{col}{rr}", "", fill=fillc)
    ws.row_dimensions[rr].height = 26

ws.column_dimensions["A"].width = 4
ws.column_dimensions["B"].width = 46
ws.column_dimensions["C"].width = 17
ws.column_dimensions["D"].width = 9
ws.column_dimensions["E"].width = 9
for wc in range(6):
    ws.column_dimensions[get_column_letter(6+wc)].width = 7

# =========================================================
# 3. STAFFING PLAN (per pop-up)
# =========================================================
ws = wb.create_sheet("3. Staffing Plan")
ws.sheet_view.showGridLines = False
title_block(ws, "Staffing Plan — Per Pop-Up", "Fixed composition per the brief: 12 personnel per kiosk.", span=6)

r = 4
for col, h in zip("ABCDEF", ["Role", "Headcount", "Gender / Profile", "Key Requirement", "Reports To", "Employment"]):
    style_header(ws.cell(row=r, column="ABCDEF".index(col)+1, value=h))

roles = [
    ("Sales Executive", 6, "Female, 22–25 yrs", "Fluent conversational English + retail sales experience", "Team Leader", "Contractor payroll"),
    ("Sales Support Staff", 2, "Any", "Merchandising, stock handling, queue mgmt", "Team Leader", "Contractor payroll"),
    ("Helper", 1, "Any", "Housekeeping, material handling", "Team Leader", "Contractor payroll"),
    ("Cashier", 1, "Any", "Experienced with POS/EDC machines", "Team Leader", "Contractor payroll"),
    ("Driver", 1, "Any", "Valid licence; stock transport & runs", "Team Leader", "Contractor payroll"),
    ("Team Leader / Manager", 1, "Any", "Daily operations owner", "Contractor Ops Head", "Permanent employee of contractor"),
]
r += 1
for i, (role, hc, g, req, rep, emp) in enumerate(roles):
    rr = r + i
    zebra = GREY if i % 2 else "FFFFFF"
    cell_val(ws, f"A{rr}", role, bold=True, fill=zebra)
    cell_val(ws, f"B{rr}", hc, align="center", fill=zebra)
    cell_val(ws, f"C{rr}", g, fill=zebra, size=9, wrap=True)
    cell_val(ws, f"D{rr}", req, fill=zebra, size=9, wrap=True)
    cell_val(ws, f"E{rr}", rep, fill=zebra, size=9, align="center")
    cell_val(ws, f"F{rr}", emp, fill=zebra, size=9, wrap=True)
    ws.row_dimensions[rr].height = 30
total_row = r + len(roles)
cell_val(ws, f"A{total_row}", "TOTAL PER POP-UP", bold=True, fill=GREEN)
cell_val(ws, f"B{total_row}", f"=SUM(B{r}:B{total_row-1})", bold=True, align="center", fill=GREEN)
for col in "CDEF":
    cell_val(ws, f"{col}{total_row}", "", fill=GREEN)

note_row = total_row + 2
cell_val(ws, f"A{note_row}", ("Attrition rule (brief): any attrition after training or during operations must be replaced immediately with "
                              "equally-trained personnel at no additional cost. Maintain a trained bench — see Recruitment Tracker."),
         wrap=True, italic=True, size=9, border=False)
ws.merge_cells(f"A{note_row}:F{note_row}")
ws.row_dimensions[note_row].height = 32

ws.column_dimensions["A"].width = 22
ws.column_dimensions["B"].width = 11
ws.column_dimensions["C"].width = 16
ws.column_dimensions["D"].width = 34
ws.column_dimensions["E"].width = 16
ws.column_dimensions["F"].width = 22

# =========================================================
# 4. MANPOWER COST (per pop-up + rollup)
# =========================================================
ws = wb.create_sheet("4. Manpower Cost")
ws.sheet_view.showGridLines = False
title_block(ws, "Manpower Cost Build-Up", "Per pop-up monthly cost × duration, then rolled up to all pop-ups.", span=8)

r = 4
cols = ["Role", "Headcount", "Monthly CTC (₹)", "Statutory Load", "Loaded Monthly (₹)", "Months", "Cost / Pop-up (₹)"]
for i, h in enumerate(cols):
    style_header(ws.cell(row=r, column=i+1, value=h))

# months = op weeks / 4.33 (approx) -> use weeks/4.33
rate_rows = [
    ("Sales Executive", 6, 22000),
    ("Sales Support Staff", 2, 16000),
    ("Helper", 1, 14000),
    ("Cashier", 1, 20000),
    ("Driver", 1, 18000),
    ("Team Leader / Manager", 1, 35000),
]
data_start = r + 1
stat_ref = f"{SHEET_ASS}!$B${ROW_STAT_LOAD}"
weeks_ref = f"{SHEET_ASS}!$B${ROW_OP_WEEKS}"
for i, (role, hc, ctc) in enumerate(rate_rows):
    rr = data_start + i
    zebra = GREY if i % 2 else "FFFFFF"
    cell_val(ws, f"A{rr}", role, fill=zebra)
    cell_val(ws, f"B{rr}", hc, align="center", fill=zebra)
    cell_val(ws, f"C{rr}", ctc, align="right", fill=GOLD, number_format=INR)  # editable input
    cell_val(ws, f"D{rr}", f"={stat_ref}", align="center", fill=zebra, number_format=PCT)
    cell_val(ws, f"E{rr}", f"=C{rr}*(1+D{rr})", align="right", fill=zebra, number_format=INR)
    # months of engagement incl ~2 weeks setup+training buffer per head handled separately; here operational months
    cell_val(ws, f"F{rr}", f"=({weeks_ref}+2)/4.33", align="center", fill=zebra, number_format='0.00')
    cell_val(ws, f"G{rr}", f"=B{rr}*E{rr}*F{rr}", align="right", fill=zebra, number_format=INR)
    ws.row_dimensions[rr].height = 18
data_end = data_start + len(rate_rows) - 1

tot = data_end + 1
cell_val(ws, f"A{tot}", "TOTAL PER POP-UP", bold=True, fill=GREEN)
cell_val(ws, f"B{tot}", f"=SUM(B{data_start}:B{data_end})", bold=True, align="center", fill=GREEN)
for col in "CDEF":
    cell_val(ws, f"{col}{tot}", "", fill=GREEN)
cell_val(ws, f"G{tot}", f"=SUM(G{data_start}:G{data_end})", bold=True, align="right", fill=GREEN, number_format=INR)

# rollup
rr = tot + 2
cell_val(ws, f"A{rr}", "Number of pop-ups", bold=True)
cell_val(ws, f"C{rr}", f"={SHEET_ASS}!$B${ROW_POPUPS_TOTAL}", bold=True, align="right")
rr += 1
cell_val(ws, f"A{rr}", "TOTAL MANPOWER COST (all pop-ups)", bold=True, fill=GREEN, size=11)
ws.merge_cells(f"A{rr}:F{rr}")
cell_val(ws, f"G{rr}", f"=G{tot}*C{rr-1}", bold=True, align="right", fill=GREEN, number_format=INR, size=11)
MANPOWER_ALL = f"'4. Manpower Cost'!$G${rr}"
MANPOWER_PP = f"'4. Manpower Cost'!$G${tot}"

ws.column_dimensions["A"].width = 24
for c in "BCDEFG":
    ws.column_dimensions[c].width = 15

nr = rr + 2
cell_val(ws, f"A{nr}", "Note: 'Months' includes ~2 extra weeks covering setup, training and buffer. Edit CTC (gold) to your actual pay bands.",
         italic=True, size=9, border=False, wrap=True)
ws.merge_cells(f"A{nr}:G{nr}")
ws.row_dimensions[nr].height = 28

# =========================================================
# 5. BUDGET SUMMARY
# =========================================================
ws = wb.create_sheet("5. Budget Summary")
ws.sheet_view.showGridLines = False
title_block(ws, "Budget Summary — Full Engagement", "All cost heads. Per-pop-up inputs (gold) roll up by total pop-up count.", span=6)

r = 4
for i, h in enumerate(["Cost Head", "Basis", "Per Pop-up (₹)", "Pop-ups", "Total (₹)", "Notes"]):
    style_header(ws.cell(row=r, column=i+1, value=h))

popups_ref = f"{SHEET_ASS}!$B${ROW_POPUPS_TOTAL}"
r += 1
budget = [
    # (head, basis, per_popup_value_or_formula, notes, is_input)
    ("Manpower (loaded, full duration)", "From Manpower Cost tab", f"={MANPOWER_PP}", "6 SE + 2 SS + Helper + Cashier + Driver + TL", False),
    ("Kiosk fabrication, fit-out & signage", "Per pop-up", 180000, "On-site fabrication of Doft-approved design", True),
    ("Kiosk transport, install & dismantle", "Per pop-up", 45000, "To/from mall, both ways", True),
    ("Mall licence / space fee (if borne)", "Per pop-up", 250000, "Confirm per mall — often reimbursed by Doft", True),
    ("Electricity / utilities & access passes", "Per pop-up", 25000, "Mall charges for the period", True),
    ("Stockroom (~90 sq ft) rent", "Per pop-up", 40000, "Replenishment store", True),
    ("Logistics — Ghaziabad pickup & replenishment", "Per pop-up", 60000, "Vehicle, fuel, driver runs", True),
    ("Uniform upkeep (wash/iron/maintain)", "Per pop-up", 12000, "Uniforms supplied by Doft; upkeep by contractor", True),
    ("Staff welfare (meals/transport/incentives)", "Per pop-up", 55000, "Attendance & sales incentives", True),
    ("Statutory & compliance filing", "Per pop-up", 20000, "Licences, registrations, insurance", True),
    ("Training logistics support", "Per pop-up", 15000, "Venue coordination, travel for training day", True),
    ("Contingency / attrition replacement buffer", "Per pop-up", 30000, "Bench & immediate replacement", True),
]
b_start = r
for i, (head, basis, val, notes, is_in) in enumerate(budget):
    rr = r + i
    zebra = GREY if i % 2 else "FFFFFF"
    cell_val(ws, f"A{rr}", head, fill=zebra, wrap=True, size=9)
    cell_val(ws, f"B{rr}", basis, fill=zebra, size=9)
    cell_val(ws, f"C{rr}", val, align="right", fill=(GOLD if is_in else zebra), number_format=INR)
    cell_val(ws, f"D{rr}", f"={popups_ref}", align="center", fill=zebra)
    cell_val(ws, f"E{rr}", f"=C{rr}*D{rr}", align="right", fill=zebra, number_format=INR)
    cell_val(ws, f"F{rr}", notes, fill=zebra, size=8, wrap=True, italic=True)
    ws.row_dimensions[rr].height = 24
b_end = r + len(budget) - 1

# NOTE: manpower per-popup already all pop-ups? No: MANPOWER_PP is per pop-up. Good; D multiplies.
sub = b_end + 1
cell_val(ws, f"A{sub}", "DIRECT COST SUBTOTAL", bold=True, fill=LBLUE)
ws.merge_cells(f"A{sub}:D{sub}")
cell_val(ws, f"E{sub}", f"=SUM(E{b_start}:E{b_end})", bold=True, align="right", fill=LBLUE, number_format=INR)
cell_val(ws, f"F{sub}", "", fill=LBLUE)

mg = sub + 1
cell_val(ws, f"A{mg}", "Contractor management margin", bold=True)
ws.merge_cells(f"A{mg}:C{mg}")
cell_val(ws, f"D{mg}", f"={SHEET_ASS}!$B${ROW_MGMT_MARGIN}", align="center", number_format=PCT)
cell_val(ws, f"E{mg}", f"=E{sub}*D{mg}", align="right", number_format=INR)
cell_val(ws, f"F{mg}", "", border=True)

pre = mg + 1
cell_val(ws, f"A{pre}", "CONTRACT VALUE (pre-GST)", bold=True, fill=GREEN)
ws.merge_cells(f"A{pre}:D{pre}")
cell_val(ws, f"E{pre}", f"=E{sub}+E{mg}", bold=True, align="right", fill=GREEN, number_format=INR)
cell_val(ws, f"F{pre}", "", fill=GREEN)

gst = pre + 1
cell_val(ws, f"A{gst}", "GST", bold=True)
ws.merge_cells(f"A{gst}:C{gst}")
cell_val(ws, f"D{gst}", f"={SHEET_ASS}!$B${ROW_GST}", align="center", number_format=PCT)
cell_val(ws, f"E{gst}", f"=E{pre}*D{gst}", align="right", number_format=INR)
cell_val(ws, f"F{gst}", "", border=True)

grand = gst + 1
cell_val(ws, f"A{grand}", "TOTAL CONTRACT VALUE (incl. GST)", bold=True, fill=NAVY, color="FFFFFF", size=12)
ws.merge_cells(f"A{grand}:D{grand}")
cell_val(ws, f"E{grand}", f"=E{pre}+E{gst}", bold=True, align="right", fill=NAVY, color="FFFFFF", number_format=INR, size=12)
cell_val(ws, f"F{grand}", "", fill=NAVY)
ws.row_dimensions[grand].height = 22

ws.column_dimensions["A"].width = 30
ws.column_dimensions["B"].width = 20
ws.column_dimensions["C"].width = 15
ws.column_dimensions["D"].width = 9
ws.column_dimensions["E"].width = 17
ws.column_dimensions["F"].width = 26

# =========================================================
# Reusable tracker builder
# =========================================================
def build_tracker(name, title, subtitle, headers, widths, example, freeze="A5", n_blank=24):
    ws = wb.create_sheet(name)
    ws.sheet_view.showGridLines = False
    title_block(ws, title, subtitle, span=len(headers))
    r = 4
    for i, h in enumerate(headers):
        style_header(ws.cell(row=r, column=i+1, value=h))
    # example row
    er = r + 1
    for i, v in enumerate(example):
        cell_val(ws, f"{get_column_letter(i+1)}{er}", v, fill=GOLD, size=9,
                 align="center" if i else "left", wrap=True)
    ws.cell(row=er, column=1).comment = Comment("Example row — delete or overwrite. Fill one row per record.", "Doft Ops")
    # blank rows
    for br in range(n_blank):
        rr = er + 1 + br
        zebra = GREY if br % 2 else "FFFFFF"
        for i in range(len(headers)):
            cell_val(ws, f"{get_column_letter(i+1)}{rr}", "", fill=zebra, size=9)
        ws.row_dimensions[rr].height = 16
    for i, w in enumerate(widths):
        ws.column_dimensions[get_column_letter(i+1)].width = w
    ws.freeze_panes = freeze
    return ws, er

# =========================================================
# 6. RECRUITMENT TRACKER
# =========================================================
ws, er = build_tracker(
    "6. Recruitment Tracker",
    "Recruitment & Deployment Tracker",
    "One row per candidate. Track from sourcing through background verification, training and deployment.",
    ["Candidate", "Role", "City", "Pop-up ID", "Phone", "Sourced On", "BGV Status", "Training Done", "Deployment Status", "Bench (Y/N)", "Remarks"],
    [16, 16, 12, 10, 13, 12, 14, 13, 16, 10, 22],
    ["Priya Sharma", "Sales Executive", "Delhi", "DEL-01", "98xxxxxx01", "2026-09-20", "Verified", "Yes", "Deployed", "N", "Star performer prior season"],
)

# =========================================================
# 7. ATTENDANCE TRACKER
# =========================================================
ws = wb.create_sheet("7. Attendance Tracker")
ws.sheet_view.showGridLines = False
title_block(ws, "Daily Staff Attendance Tracker", "Mark P (Present) / A (Absent) / L (Leave) / R (Replaced). One row per staff member.", span=13)
r = 4
att_headers = ["Staff Name", "Role", "Pop-up ID"] + [f"D{d}" for d in range(1, 8)] + ["Present", "% Attendance"]
for i, h in enumerate(att_headers):
    style_header(ws.cell(row=r, column=i+1, value=h))
er = r + 1
example = ["Priya Sharma", "Sales Exec", "DEL-01", "P","P","P","A","P","P","P"]
for i, v in enumerate(example):
    cell_val(ws, f"{get_column_letter(i+1)}{er}", v, fill=GOLD, align="center" if i>2 else "left", size=9)
# present count = COUNTIF over D1..D7 (cols D..J = 4..10)
cell_val(ws, f"K{er}", f'=COUNTIF(D{er}:J{er},"P")', align="center", size=9, number_format='0')
cell_val(ws, f"L{er}", f'=IF(COUNTA(D{er}:J{er})=0,"",K{er}/COUNTA(D{er}:J{er}))', align="center", size=9, number_format=PCT)
for br in range(24):
    rr = er + 1 + br
    zebra = GREY if br % 2 else "FFFFFF"
    for i in range(3):
        cell_val(ws, f"{get_column_letter(i+1)}{rr}", "", fill=zebra, size=9)
    for i in range(3, 10):
        cell_val(ws, f"{get_column_letter(i+1)}{rr}", "", fill=zebra, align="center", size=9)
    cell_val(ws, f"K{rr}", f'=COUNTIF(D{rr}:J{rr},"P")', fill=zebra, align="center", size=9, number_format='0')
    cell_val(ws, f"L{rr}", f'=IF(COUNTA(D{rr}:J{rr})=0,"",K{rr}/COUNTA(D{rr}:J{rr}))', fill=zebra, align="center", size=9, number_format=PCT)
    ws.row_dimensions[rr].height = 16
ws.column_dimensions["A"].width = 18
ws.column_dimensions["B"].width = 12
ws.column_dimensions["C"].width = 10
for i in range(4, 11):
    ws.column_dimensions[get_column_letter(i)].width = 5
ws.column_dimensions["K"].width = 9
ws.column_dimensions["L"].width = 12
ws.freeze_panes = "D5"

# =========================================================
# 8. DAILY SALES REPORT
# =========================================================
ws = wb.create_sheet("8. Daily Sales Report")
ws.sheet_view.showGridLines = False
title_block(ws, "Daily Sales Report", "One row per pop-up per day. Feeds the season sales roll-up at the bottom.", span=10)
r = 4
sh = ["Date", "City", "Pop-up ID", "Units Sold", "Gross Sales (₹)", "Discounts (₹)", "Net Sales (₹)", "Bills", "Avg Bill (₹)", "Reported By"]
for i, h in enumerate(sh):
    style_header(ws.cell(row=r, column=i+1, value=h))
er = r + 1
ex = ["2026-10-15", "Delhi", "DEL-01", 42, 168000, 8000, None, 38, None, "R. Verma"]
for i, v in enumerate(ex):
    if i == 6:
        cell_val(ws, f"G{er}", f"=E{er}-F{er}", fill=GOLD, align="right", size=9, number_format=INR)
    elif i == 8:
        cell_val(ws, f"I{er}", f"=IF(H{er}=0,0,G{er}/H{er})", fill=GOLD, align="right", size=9, number_format=INR)
    else:
        cell_val(ws, f"{get_column_letter(i+1)}{er}", v, fill=GOLD, align="center" if 3<=i<=8 else "left", size=9,
                 number_format=(INR if i in (4,5) else None))
first = er
for br in range(24):
    rr = er + 1 + br
    zebra = GREY if br % 2 else "FFFFFF"
    for i in range(10):
        col = get_column_letter(i+1)
        if i == 6:
            cell_val(ws, f"G{rr}", f"=E{rr}-F{rr}", fill=zebra, align="right", size=9, number_format=INR)
        elif i == 8:
            cell_val(ws, f"I{rr}", f"=IF(H{rr}=0,0,G{rr}/H{rr})", fill=zebra, align="right", size=9, number_format=INR)
        else:
            cell_val(ws, f"{col}{rr}", "", fill=zebra, align="center" if 3<=i<=8 else "left", size=9,
                     number_format=(INR if i in (4,5,6) else None))
    ws.row_dimensions[rr].height = 16
last = er + 24
totr = last + 1
cell_val(ws, f"A{totr}", "SEASON TOTAL", bold=True, fill=GREEN)
ws.merge_cells(f"A{totr}:C{totr}")
cell_val(ws, f"D{totr}", f"=SUM(D{first}:D{last})", bold=True, align="center", fill=GREEN, number_format='0')
cell_val(ws, f"E{totr}", f"=SUM(E{first}:E{last})", bold=True, align="right", fill=GREEN, number_format=INR)
cell_val(ws, f"F{totr}", f"=SUM(F{first}:F{last})", bold=True, align="right", fill=GREEN, number_format=INR)
cell_val(ws, f"G{totr}", f"=SUM(G{first}:G{last})", bold=True, align="right", fill=GREEN, number_format=INR)
cell_val(ws, f"H{totr}", f"=SUM(H{first}:H{last})", bold=True, align="center", fill=GREEN, number_format='0')
cell_val(ws, f"I{totr}", f"=IF(H{totr}=0,0,G{totr}/H{totr})", bold=True, align="right", fill=GREEN, number_format=INR)
cell_val(ws, f"J{totr}", "", fill=GREEN)
widths = [12, 12, 10, 11, 15, 14, 15, 8, 13, 14]
for i, w in enumerate(widths):
    ws.column_dimensions[get_column_letter(i+1)].width = w
ws.freeze_panes = "A5"

# =========================================================
# 9. INVENTORY & REPLENISHMENT
# =========================================================
ws, er = build_tracker(
    "9. Inventory & Replenish",
    "Inventory & Stock Replenishment",
    "SKU-level daily reconciliation per pop-up. Closing = Opening + Received − Sold − Damaged.",
    ["Date", "Pop-up ID", "SKU / Product", "Opening", "Received", "Sold", "Damaged", "Closing", "Reorder Level", "Reorder?"],
    [12, 10, 22, 9, 9, 8, 9, 9, 12, 10],
    ["2026-10-15", "DEL-01", "Rose Petal 200g", 60, 24, 42, 0, None, 20, None],
)
# overwrite formula cells in example + blanks for Closing (col H=8) and Reorder (J=10)
def inv_formulas(row):
    cell_val(ws, f"H{row}", f"=D{row}+E{row}-F{row}-G{row}", align="center", size=9)
    cell_val(ws, f"J{row}", f'=IF(H{row}<=I{row},"REORDER","OK")', align="center", size=9)
inv_formulas(er)
ws[f"H{er}"].fill = PatternFill("solid", fgColor=GOLD)
ws[f"J{er}"].fill = PatternFill("solid", fgColor=GOLD)
for br in range(24):
    rr = er + 1 + br
    zebra = GREY if br % 2 else "FFFFFF"
    cell_val(ws, f"H{rr}", f"=D{rr}+E{rr}-F{rr}-G{rr}", fill=zebra, align="center", size=9)
    cell_val(ws, f"J{rr}", f'=IF(H{rr}<=I{rr},"REORDER","OK")', fill=zebra, align="center", size=9)

# =========================================================
# 10. FOOTFALL & CONVERSION
# =========================================================
ws = wb.create_sheet("10. Footfall & Conversion")
ws.sheet_view.showGridLines = False
title_block(ws, "Footfall & Conversion", "Daily footfall vs bills. Conversion = Bills / Footfall.", span=8)
r = 4
fh = ["Date", "City", "Pop-up ID", "Footfall", "Walk-ins Engaged", "Bills", "Conversion %", "Reported By"]
for i, h in enumerate(fh):
    style_header(ws.cell(row=r, column=i+1, value=h))
er = r + 1
ex = ["2026-10-15", "Delhi", "DEL-01", 520, 180, 38, None, "R. Verma"]
for i, v in enumerate(ex):
    if i == 6:
        cell_val(ws, f"G{er}", f"=IF(D{er}=0,0,F{er}/D{er})", fill=GOLD, align="center", size=9, number_format=PCT)
    else:
        cell_val(ws, f"{get_column_letter(i+1)}{er}", v, fill=GOLD, align="center" if 3<=i<=6 else "left", size=9)
for br in range(24):
    rr = er + 1 + br
    zebra = GREY if br % 2 else "FFFFFF"
    for i in range(8):
        col = get_column_letter(i+1)
        if i == 6:
            cell_val(ws, f"G{rr}", f"=IF(D{rr}=0,0,F{rr}/D{rr})", fill=zebra, align="center", size=9, number_format=PCT)
        else:
            cell_val(ws, f"{col}{rr}", "", fill=zebra, align="center" if 3<=i<=6 else "left", size=9)
    ws.row_dimensions[rr].height = 16
widths = [12, 12, 10, 10, 15, 8, 13, 14]
for i, w in enumerate(widths):
    ws.column_dimensions[get_column_letter(i+1)].width = w
ws.freeze_panes = "A5"

# =========================================================
# 11. CUSTOMER FEEDBACK LOG
# =========================================================
build_tracker(
    "11. Customer Feedback",
    "Customer Feedback Log",
    "Capture verbatim customer feedback and resolution. Feeds Doft brand & product insights.",
    ["Date", "City", "Pop-up ID", "Customer", "Rating (1-5)", "Category", "Feedback", "Action Taken", "Status"],
    [12, 12, 10, 16, 11, 14, 30, 26, 12],
    ["2026-10-15", "Delhi", "DEL-01", "Walk-in", 5, "Fragrance", "Loved the sandalwood range", "Recommended gift set", "Closed"],
)

# =========================================================
# 12. COMPLIANCE & LEGAL CHECKLIST
# =========================================================
ws = wb.create_sheet("12. Compliance Checklist")
ws.sheet_view.showGridLines = False
title_block(ws, "Compliance & Legal Checklist", "Per pop-up. Status: Not Started / In Progress / Done / N/A.", span=6)
r = 4
for i, h in enumerate(["#", "Requirement", "Responsible", "Due (T-)", "Status", "Remarks"]):
    style_header(ws.cell(row=r, column=i+1, value=h))
items = [
    "Mall space licence agreement signed",
    "Shops & Establishment / trade compliance",
    "GST registration & e-invoicing ready",
    "Staff police / background verification (BGV) complete",
    "PF & ESIC registration for deployed staff",
    "Public liability / event insurance in place",
    "Fire & safety and electrical clearance",
    "Access passes & loading/unloading permits",
    "Electricity connection / DG arrangement",
    "POS/EDC machine received & tested",
    "Uniforms received (returnable) & logged",
    "Stock receipt & insurance-in-transit from Ghaziabad",
    "Labour law / minimum-wage compliance",
    "Signed attendance & payroll process",
    "Dismantling & fixture-return sign-off plan",
]
r += 1
for i, it in enumerate(items):
    rr = r + i
    zebra = GREY if i % 2 else "FFFFFF"
    cell_val(ws, f"A{rr}", i+1, align="center", fill=zebra)
    cell_val(ws, f"B{rr}", it, fill=zebra, wrap=True, size=9)
    cell_val(ws, f"C{rr}", "", fill=GOLD, size=9)
    cell_val(ws, f"D{rr}", "", fill=GOLD, align="center", size=9)
    cell_val(ws, f"E{rr}", "", fill=GOLD, align="center", size=9)
    cell_val(ws, f"F{rr}", "", fill=zebra, size=9)
    ws.row_dimensions[rr].height = 18
ws.column_dimensions["A"].width = 4
ws.column_dimensions["B"].width = 42
ws.column_dimensions["C"].width = 16
ws.column_dimensions["D"].width = 9
ws.column_dimensions["E"].width = 14
ws.column_dimensions["F"].width = 24
ws.freeze_panes = "A5"

# =========================================================
# 13. RISK REGISTER
# =========================================================
ws = wb.create_sheet("13. Risk Register")
ws.sheet_view.showGridLines = False
title_block(ws, "Risk Register", "Score = Likelihood × Impact (1-5 each). Mitigate high scores first.", span=7)
r = 4
for i, h in enumerate(["#", "Risk", "Likelihood (1-5)", "Impact (1-5)", "Score", "Mitigation", "Owner"]):
    style_header(ws.cell(row=r, column=i+1, value=h))
risks = [
    ("Staff attrition after training", 4, 4, "Maintain 15% trained bench; immediate no-cost replacement", "Ops Head"),
    ("Mall licence / permission delay", 3, 5, "Start licensing at T-7w; parallel mall shortlist", "Legal"),
    ("Stock-out during peak days", 3, 5, "Reorder levels + daily replenishment from 90 sq ft stockroom", "Logistics"),
    ("POS/EDC downtime", 2, 4, "Backup EDC + trained cashier; mall Wi-Fi + dongle failover", "Cashier/IT"),
    ("Underperformance vs sales target", 3, 4, "Daily reporting, incentives, TL coaching", "Team Leader"),
    ("Kiosk fabrication delay", 2, 5, "Vendor SLA + 3-day buffer before go-live", "Projects"),
    ("Statutory non-compliance", 2, 5, "Compliance checklist sign-off before go-live", "Legal"),
    ("Cash handling / shrinkage", 2, 4, "Dual control, daily reconciliation, CCTV where available", "Cashier/TL"),
    ("Uniform damage / loss", 2, 2, "Issue log, upkeep SOP, deposit control", "Team Leader"),
]
r += 1
for i, (risk, l, imp, mit, owner) in enumerate(risks):
    rr = r + i
    zebra = GREY if i % 2 else "FFFFFF"
    cell_val(ws, f"A{rr}", i+1, align="center", fill=zebra)
    cell_val(ws, f"B{rr}", risk, fill=zebra, wrap=True, size=9)
    cell_val(ws, f"C{rr}", l, align="center", fill=GOLD)
    cell_val(ws, f"D{rr}", imp, align="center", fill=GOLD)
    cell_val(ws, f"E{rr}", f"=C{rr}*D{rr}", align="center", fill=zebra, bold=True)
    cell_val(ws, f"F{rr}", mit, fill=zebra, wrap=True, size=9)
    cell_val(ws, f"G{rr}", owner, fill=zebra, align="center", size=9)
    ws.row_dimensions[rr].height = 28
ws.column_dimensions["A"].width = 4
ws.column_dimensions["B"].width = 28
ws.column_dimensions["C"].width = 13
ws.column_dimensions["D"].width = 11
ws.column_dimensions["E"].width = 8
ws.column_dimensions["F"].width = 40
ws.column_dimensions["G"].width = 13
ws.freeze_panes = "A5"

out = "/home/user/Projects/doft_diwali_popup/Doft_Diwali_PopUp_Operations_Workbook.xlsx"
wb.save(out)
print("Saved:", out)
print("Sheets:", wb.sheetnames)
