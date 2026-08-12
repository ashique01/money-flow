function jsonResponse(data) {

  return ContentService
    .createTextOutput(
      JSON.stringify(data)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );

}



function successResponse(data) {

  return ContentService
    .createTextOutput(
      JSON.stringify({

        success: true,

        data: data

      })
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );

}



function errorResponse(message) {

  return ContentService
    .createTextOutput(
      JSON.stringify({

        success: false,

        message: message

      })
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );

}


