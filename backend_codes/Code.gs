function doGet(e){

  try {

    validateRequest(e);

    return routeRequest(e);

  }
  catch(error){

    return errorResponse(
      error.message
    );

  }

}



function doPost(e){

  try {

    validateRequest(e);

    return routeRequest(e);

  }
  catch(error){

    return errorResponse(
      error.message
    );

  }

}

function doOptions(e){

  return ContentService
    .createTextOutput("")
    .setMimeType(
      ContentService.MimeType.TEXT
    )
    .setHeader(
      "Access-Control-Allow-Origin",
      "*"
    )
    .setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS"
    )
    .setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type"
    );

}