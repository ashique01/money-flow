function validateTransaction(data) {


  const requiredFields = [

    "date",
    "person",
    "type",
    "category",
    "amount"

  ];


  for (
    let i = 0;
    i < requiredFields.length;
    i++
  ) {

    const field =
      requiredFields[i];


    if (!data[field]) {

      throw new Error(
        field + " is required"
      );

    }


  }



  if (
    isNaN(
      Number(data.amount)
    )
  ) {

    throw new Error(
      "Amount must be a number"
    );

  }



  return true;


}