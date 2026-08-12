// backend_codes/analytics.gs
// ------------------------------------------------------------
// Analytics module – provides a summary of financial health.
// ------------------------------------------------------------
// Expected Google Sheet (ANALYTICS_SHEET_ID) columns (header row):
//   date, netWorth, income, expense, category, amount
// ------------------------------------------------------------
// Public endpoint (GET) mapped via router to path=analytics/summary
// ------------------------------------------------------------
// Header (function signature) for Apps Script:
//   function getAnalyticsSummary(e)
//   // e: Google Apps Script event object containing query parameters.
//   // Returns JSON with the shape defined in src/features/analytics/types.ts
// ------------------------------------------------------------

function getAnalyticsSummary(e) {
  // Load helper utilities directly.
  // getSheet and rowsToObjects are defined in googleSheets.gs, but we can use the generic
  // helpers from helpers.gs: getSheet(name) and getRows(sheetName).

  // Sheet ID should be stored as Script property for security.
  const sheetId = PropertiesService.getScriptProperties().getProperty('ANALYTICS_SHEET_ID');
  if (!sheetId) return unauthorized('Missing ANALYTICS_SHEET_ID property');

  // Use getRows to fetch data as objects with headers.
  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getActiveSheet();
  const values = sheet.getDataRange().getValues();
  const [header, ...dataRows] = values;
  const rows = dataRows.map(row => {
    const obj = {};
    header.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });

  // Compute aggregates.
  const netWorth = rows.length ? rows[rows.length - 1] : { netWorth: 0, date: new Date().toISOString() };
  const totalIncome = rows.reduce((s, r) => s + (r.income || 0), 0);
  const totalExpense = rows.reduce((s, r) => s + (r.expense || 0), 0);
  const savingsRate = totalIncome ? (totalIncome - totalExpense) / totalIncome : 0;

  // Expense by category.
  const expenseByCategoryMap = {};
  rows.forEach(r => {
    if (!r.category) return;
    expenseByCategoryMap[r.category] = (expenseByCategoryMap[r.category] || 0) + (r.amount || 0);
  });
  const expenseByCategory = Object.entries(expenseByCategoryMap).map(([cat, amt]) => ({
    categoryId: cat,
    categoryName: cat,
    amount: amt,
  }));

  // Monthly trends.
  const monthlyMap = {};
  rows.forEach(r => {
    const month = r.date.slice(0, 7); // YYYY-MM
    if (!monthlyMap[month]) monthlyMap[month] = { month, income: 0, expense: 0 };
    monthlyMap[month].income += r.income || 0;
    monthlyMap[month].expense += r.expense || 0;
  });
  const monthlyTrends = Object.values(monthlyMap);

  const payload = {
    netWorth: { amount: netWorth.netWorth, date: netWorth.date },
    totalIncome,
    totalExpense,
    savingsRate,
    expenseByCategory,
    monthlyTrends,
  };

  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Simple unauthorized helper */
function unauthorized(message) {
  return ContentService.createTextOutput(JSON.stringify({ error: message }))
    .setMimeType(ContentService.MimeType.JSON)
    .setResponseCode(401);
}
