function createAuditLog(
  user,
  action,
  details
) {


  const sheet =
    getSheet(
      CONFIG.SHEETS.AUDIT_LOGS
    );



  sheet.appendRow([

    now(),

    user,

    action,

    details

  ]);


}