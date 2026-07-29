# Doft Candles — Diwali Pop-Up Retail Operations

Contractor response to the Doft Candles *Request for Contractor* (Diwali pop-up
retail operations, seasons 2026 / 2027 / 2028).

## Deliverables
- **Doft_DiwaliPopUp_Execution_Plan.docx** — detailed execution plan & commercial proposal.
- **Doft_DiwaliPopUp_Operations_Workbook.xlsx** — 13-tab operational + costing workbook
  (assumptions, timeline, staffing, manpower cost, budget, and daily reporting / compliance templates).

## Rebuild
```bash
python3 build_workbook.py          # regenerates the xlsx
npm install docx && node build_plan.js   # regenerates the docx
```

## Notes
- All rates/costs are editable planning placeholders (INR), not quotations.
- Workbook formulas are live and recalculate on open in Excel / Google Sheets.
- Model default: 3 cities x 3 pop-ups = 9 kiosks, 12 staff each. Edit the gold cells
  on the *README & Assumptions* tab to change the scenario.
