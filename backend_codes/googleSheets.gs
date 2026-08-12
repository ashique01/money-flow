// backend_codes/googleSheets.gs
// ------------------------------------------------------------
// Shared Google Sheets helper for MoneyFlow Apps Script backend.
// ------------------------------------------------------------
// Exposes two utilities:
//   getSheet(sheetId) – returns the active sheet object for a given ID.
//   rowsToObjects(sheet, keys) – converts rows in a sheet to an array of
//       typed objects based on a header row.
// ------------------------------------------------------------

/**
 * Returns the sheet object for a given Google Sheet ID.
 * @param {string} sheetId The ID of the Google Sheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet} The active sheet.
 */
// Renamed to avoid conflict with helpers.getSheet (which expects a sheet name)
function getSheetById(sheetId) {
  const ss = SpreadsheetApp.openById(sheetId);
  return ss.getActiveSheet();
}

/**
 * Convert a sheet's rows into an array of objects.
 * @template T
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The sheet to read.
 * @param {Array<keyof T>} keys Ordered list of property names that map to columns.
 * @return {Array<T>} Array of objects representing the rows.
 */
function rowsToObjects(sheet, keys) {
  const data = sheet.getDataRange().getValues();
  const [header, ...rows] = data;
  const map = {};
  header.forEach((h, i) => (map[h] = i));
  return rows.map(row => {
    const obj = {};
    keys.forEach(k => {
      obj[k] = row[map[k]];
    });
    return obj;
  });
}
