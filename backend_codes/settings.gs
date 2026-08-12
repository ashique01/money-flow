// backend_codes/settings.gs
// ------------------------------------------------------------
// Settings module – CRUD for user preferences.
// ------------------------------------------------------------
// Expected Google Sheet (SETTINGS_SHEET_ID) columns (header row):
//   userId, currency, locale, timezone, theme, defaultAccountId,
//   defaultCategoryId, emailNotif, pushNotif
// ------------------------------------------------------------
// Endpoints (handled by router):
//   GET  -> path=settings  (query param: userId)
//   POST -> path=settings  (JSON body with full settings object)
// ------------------------------------------------------------
// Header signatures:
//   function getUserSettings(e)
//   function updateUserSettings(e)
// ------------------------------------------------------------

function getUserSettings(e) {
  const { getSheet, rowsToObjects } = importLib('googleSheets.gs');
  const sheetId = PropertiesService.getScriptProperties().getProperty('SETTINGS_SHEET_ID');
  if (!sheetId) return unauthorized('Missing SETTINGS_SHEET_ID property');

  const sheet = getSheet(sheetId);
  const rows = rowsToObjects(sheet, [
    'userId', 'currency', 'locale', 'timezone', 'theme',
    'defaultAccountId', 'defaultCategoryId', 'emailNotif', 'pushNotif'
  ]);

  const userId = e.parameter.userId;
  const setting = rows.find(r => r.userId === userId);
  if (!setting) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'User not found' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setResponseCode(404);
  }

  const payload = {
    userId: setting.userId,
    currency: setting.currency,
    locale: setting.locale,
    timezone: setting.timezone,
    theme: setting.theme,
    defaultAccountId: setting.defaultAccountId || null,
    defaultCategoryId: setting.defaultCategoryId || null,
    notificationPrefs: {
      email: setting.emailNotif === 'TRUE',
      push: setting.pushNotif === 'TRUE',
    },
  };

  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function updateUserSettings(e) {
  const { getSheet } = importLib('googleSheets.gs');
  const sheetId = PropertiesService.getScriptProperties().getProperty('SETTINGS_SHEET_ID');
  if (!sheetId) return unauthorized('Missing SETTINGS_SHEET_ID property');

  const payload = JSON.parse(e.postData.contents);
  const sheet = getSheet(sheetId);
  const data = sheet.getDataRange().getValues();
  const header = data[0];
  const rowIndex = data.findIndex(r => r[header.indexOf('userId')] === payload.userId);
  if (rowIndex < 0) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'User not found' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setResponseCode(404);
  }

  // Mapping of payload fields to column names.
  const fieldMap = {
    currency: payload.currency,
    locale: payload.locale,
    timezone: payload.timezone,
    theme: payload.theme,
    defaultAccountId: payload.defaultAccountId || '',
    defaultCategoryId: payload.defaultCategoryId || '',
    emailNotif: payload.notificationPrefs?.email ? 'TRUE' : 'FALSE',
    pushNotif: payload.notificationPrefs?.push ? 'TRUE' : 'FALSE',
  };

  Object.entries(fieldMap).forEach(([key, value]) => {
    const col = header.indexOf(key);
    if (col >= 0) {
      sheet.getRange(rowIndex + 1, col + 1).setValue(value);
    }
  });

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function unauthorized(message) {
  return ContentService.createTextOutput(JSON.stringify({ error: message }))
    .setMimeType(ContentService.MimeType.JSON)
    .setResponseCode(401);
}
