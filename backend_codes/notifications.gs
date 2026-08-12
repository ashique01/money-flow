// backend_codes/notifications.gs
// ------------------------------------------------------------
// Notifications module – stores and serves user notifications.
// ------------------------------------------------------------
// Expected Google Sheet (NOTIFICATIONS_SHEET_ID) columns (header row):
//   id, userId, type, priority, title, body, createdAt, readAt
// ------------------------------------------------------------
// Endpoints (router):
//   GET  -> path=notifications   (query: userId, unreadOnly)
//   POST -> path=notifications/read (JSON body { notificationId })
// ------------------------------------------------------------
// Header signatures:
//   function getNotifications(e)
//   function markNotificationRead(e)
// ------------------------------------------------------------

function getNotifications(e) {
  const { getSheet, rowsToObjects } = importLib('googleSheets.gs');
  const sheetId = PropertiesService.getScriptProperties().getProperty('NOTIFICATIONS_SHEET_ID');
  if (!sheetId) return unauthorized('Missing NOTIFICATIONS_SHEET_ID property');

  const sheet = getSheet(sheetId);
  const rows = rowsToObjects(sheet, [
    'id', 'userId', 'type', 'priority', 'title', 'body', 'createdAt', 'readAt'
  ]);

  const userId = e.parameter.userId;
  const unreadOnly = e.parameter.unreadOnly === 'true';
  let list = rows.filter(r => r.userId === userId);
  if (unreadOnly) list = list.filter(r => !r.readAt);

  return ContentService.createTextOutput(JSON.stringify(list))
    .setMimeType(ContentService.MimeType.JSON);
}

function markNotificationRead(e) {
  const payload = JSON.parse(e.postData.contents);
  const notificationId = payload.notificationId;

  const { getSheet } = importLib('googleSheets.gs');
  const sheetId = PropertiesService.getScriptProperties().getProperty('NOTIFICATIONS_SHEET_ID');
  if (!sheetId) return unauthorized('Missing NOTIFICATIONS_SHEET_ID property');

  const sheet = getSheet(sheetId);
  const data = sheet.getDataRange().getValues();
  const header = data[0];
  const idCol = header.indexOf('id');
  const readCol = header.indexOf('readAt');

  const rowIdx = data.findIndex(r => r[idCol] === notificationId);
  if (rowIdx < 0) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'Notification not found' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setResponseCode(404);
  }

  sheet.getRange(rowIdx + 1, readCol + 1).setValue(new Date().toISOString());
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function unauthorized(message) {
  return ContentService.createTextOutput(JSON.stringify({ error: message }))
    .setMimeType(ContentService.MimeType.JSON)
    .setResponseCode(401);
}
