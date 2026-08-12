function getTransactions() {

  const transactions =
    getRows(
      CONFIG.SHEETS.TRANSACTIONS
    );


  return successResponse({

    count: transactions.length,

    transactions: transactions

  });


}

function getTransactionById(id) {


  const transactions =
    getRows(
      CONFIG.SHEETS.TRANSACTIONS
    );



  const transaction =
    transactions.find(function (item) {


      return item.transaction_id === id;


    });



  if (!transaction) {

    return errorResponse(
      "Transaction not found"
    );

  }



  return successResponse(transaction);


}


function createTransaction(e) {


  const body =
    JSON.parse(
      e.postData.contents
    );



  validateTransaction(body);



  return executeWithLock(function () {


    const sheet =
      getSheet(
        CONFIG.SHEETS.TRANSACTIONS
      );



    const id =
      generateId("TXN");



    sheet.appendRow([

      id,

      body.date,

      body.person,

      body.type,

      body.category,

      body.account || "",

      body.payment_method || "",

      Number(body.amount),

      body.currency ||
      CONFIG.DEFAULT_CURRENCY,

      body.note || "",

      body.tags || "",

      body.recurring_id || "",

      now(),

      now()

    ]);

    updateAccountBalance(
      body.account,
      body.type,
      Number(body.amount)
    );

    if (
      body.type === "Savings Deposit"
    ) {

      updateGoalProgress(
        body.person,
        Number(body.amount)
      );

    }

    createAuditLog(

      body.person,

      "Created Transaction",

      id

    );



    return successResponse({

      message:
        "Transaction created",

      id: id

    });


  });


}





function updateTransaction(id, data) {


  return executeWithLock(function () {


    const sheet =
      getSheet(
        CONFIG.SHEETS.TRANSACTIONS
      );



    const rows =
      sheet.getDataRange()
        .getValues();



    for (
      let i = 1;
      i < rows.length;
      i++
    ) {


      if (rows[i][0] === id) {



        sheet.getRange(i + 1, 2, 1, 12)
          .setValues([[


            data.date,

            data.person,

            data.type,

            data.category,

            data.account,

            data.payment_method,

            data.amount,

            data.currency,

            data.note,

            data.tags,

            rows[i][11],

            now()


          ]]);



        return successResponse({

          message:
            "Updated"

        });


      }

    }



    return errorResponse(
      "Not found"
    );



  });


}






function deleteTransaction(id) {


  return executeWithLock(function () {


    const sheet =
      getSheet(
        CONFIG.SHEETS.TRANSACTIONS
      );



    const data =
      sheet.getDataRange()
        .getValues();



    for (
      let i = 1;
      i < data.length;
      i++
    ) {


      if (data[i][0] === id) {


        sheet.deleteRow(i + 1);



        createAuditLog(

          "System",

          "Deleted Transaction",

          id

        );



        return successResponse({

          message:
            "Deleted successfully"

        });


      }

    }



    return errorResponse(
      "Transaction not found"
    );



  });


}



function deleteTransaction(e) {
  // Accept transaction ID from POST JSON payload.
  let transactionId;
  try {
    const data = JSON.parse(e.postData.contents);
    transactionId = data.transaction_id || data.id;
  } catch (err) {
    Logger.log('Failed to parse JSON in deleteTransaction: ' + err);
  }

  if (!transactionId) {
    return errorResponse('Transaction ID missing');
  }

  return executeWithLock(function () {
    const sheet = getSheet(CONFIG.SHEETS.TRANSACTIONS);
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === transactionId) {
        sheet.deleteRow(i + 1);
        createAuditLog('User', 'Transaction Deleted', transactionId);
        return successResponse({ message: 'Transaction deleted' });
      }
    }
    return errorResponse('Transaction not found');
  });
}

function testAPI() {

  const response = getTransactions();

  Logger.log(
    response.getContent()
  );

}