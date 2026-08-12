// backend_codes/reports.gs
// ------------------------------------------------------------
// Reports module – provides filtered transaction reports.
// ------------------------------------------------------------
// Expected Google Sheet (REPORTS_SHEET_ID) columns (header row):
//   id, date, description, amount, accountId, categoryId
// ------------------------------------------------------------
// Public endpoint (GET) mapped via router to path=reports
// ------------------------------------------------------------
// Header (function signature):
//   function getReport(e)
//   // e: Apps Script event object with query parameters for filtering.
//   // Returns JSON matching src/features/reports/types.ts
// ------------------------------------------------------------

function getReport(e) {
  const { getSheet, rowsToObjects } = importLib('googleSheets.gs');
  const sheetId = PropertiesService.getScriptProperties().getProperty('REPORTS_SHEET_ID');
  if (!sheetId) return unauthorized('Missing REPORTS_SHEET_ID property');

  const sheet = getSheet(sheetId);
  const rows = rowsToObjects(sheet, ['id', 'date', 'description', 'amount', 'accountId', 'categoryId']);

  // Parse query params.
  const params = e.parameter;
  const period = params.period || 'MONTHLY'; // not used directly – kept for compatibility
  const startDate = params.startDate;
  const endDate = params.endDate;
  const accountIds = params.accountIds ? params.accountIds.split(',') : null;
  const categoryIds = params.categoryIds ? params.categoryIds.split(',') : null;

  const filtered = rows.filter(r => {
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    if (accountIds && !accountIds.includes(r.accountId)) return false;
    if (categoryIds && !categoryIds.includes(r.categoryId)) return false;
    return true;
  });

  const totals = filtered.reduce((acc, r) => {
    if (r.amount >= 0) acc.income += r.amount;
    else acc.expense += Math.abs(r.amount);
    return acc;
  }, { income: 0, expense: 0 });
  totals.net = totals.income - totals.expense;

  const payload = {
    period,
    rows: filtered,
    totals,
  };

  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function unauthorized(message) {
  return ContentService.createTextOutput(JSON.stringify({ error: message }))
    .setMimeType(ContentService.MimeType.JSON)
    .setResponseCode(401);
}
