function validateRequest(e) {


  const key =
    e.parameter.key;


  if (!key) {

    throw new Error(
      "Missing API key"
    );

  }


  if (
    key !== CONFIG.API_KEY
  ) {

    throw new Error(
      "Invalid API key"
    );

  }


  return true;

}