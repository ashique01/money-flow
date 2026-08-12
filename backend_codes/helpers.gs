function getSpreadsheet() {

  return SpreadsheetApp
    .openById(CONFIG.SPREADSHEET_ID);

}



function getSheet(name) {


  const sheet =
    getSpreadsheet()
      .getSheetByName(name);



  if (!sheet) {

    throw new Error(
      "Sheet not found: " + name
    );

  }


  return sheet;


}



function generateId(prefix) {


  return prefix +
    "-" +
    Utilities.getUuid()
      .substring(0, 8)
      .toUpperCase();


}



function now() {


  return Utilities.formatDate(
    new Date(),
    CONFIG.TIMEZONE,
    "yyyy-MM-dd HH:mm:ss"
  );


}



function getRows(sheetName) {
  // Retrieve only the used range instead of the entire sheet –
  // this prevents reading massive empty areas that cause timeout.
  const sheet = getSheet(sheetName);

  // If the sheet has no data rows, return an empty array early.
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 2) {
    return [];
  }

  // Read only the populated area.
  const values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  const headers = values.shift();
  return values.map(function (row) {
    let obj = {};
    headers.forEach(function (header, index) {
      obj[header] = row[index];
    });
    return obj;
  });
}




}




function debugSheets() {

  const ss = getSpreadsheet();

  const sheets = ss.getSheets();


  sheets.forEach(function (sheet) {

    Logger.log(
      sheet.getName()
    );

  });

}