/**
 * =====================================================
 * ACCOUNTS MODULE
 * =====================================================
 */


/**
 * Convert email to application user
 */
function getAccountOwnerFromEmail(email) {

  email =
    String(email)
      .trim()
      .toLowerCase();


  const users = {

    "ashiquemurad@gmail.com": "Ash",

    "rifaa5164@gmail.com": "Rifa"

  };


  if (!users[email]) {

    throw new Error(
      "Access denied"
    );

  }


  return users[email];

}



/**
 * Get accounts
 */
function getAccounts(e) {

  try {


    const email =
      e.parameter.email;


    const owner =
      getAccountOwnerFromEmail(
        email
      );


    const accounts =
      getRows(
        CONFIG.SHEETS.ACCOUNTS
      );


    const result =
      accounts.filter(function (item) {


        if (
          String(item.status)
            .trim()
            .toLowerCase()
          !==
          "active"
        ) {
          return false;
        }



        return (

          String(item.owner)
            .trim()
            .toLowerCase()

          ===

          String(owner)
            .trim()
            .toLowerCase()

          ||

          String(item.owner)
            .trim()
            .toLowerCase()

          ===

          "shared"

        );


      });



    return successResponse(
      result
    );


  }

  catch (error) {


    Logger.log(
      error.stack
    );


    return errorResponse(
      error.message
    );


  }


}





/**
 * Create account
 */
function createAccount(e) {

  try {

    const data =
      JSON.parse(
        e.postData.contents
      );


    if (!data.email) {

      throw new Error(
        "Email required"
      );

    }


    const owner =
      getAccountOwnerFromEmail(
        data.email
      );


    if (!data.name) {

      throw new Error(
        "Account name required"
      );

    }


    if (!data.type) {

      throw new Error(
        "Account type required"
      );

    }


    if (
      data.balance === undefined ||
      isNaN(
        Number(data.balance)
      )
    ) {

      throw new Error(
        "Invalid balance"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.ACCOUNTS
      );



    const existing =
      getRows(
        CONFIG.SHEETS.ACCOUNTS
      );



    const duplicate =
      existing.some(function (item) {


        return (

          String(item.name)
            .trim()
            .toLowerCase()

          ===

          String(data.name)
            .trim()
            .toLowerCase()


          &&


          String(item.owner)
            .trim()
            .toLowerCase()

          ===

          String(owner)
            .trim()
            .toLowerCase()

        );


      });



    if (duplicate) {

      throw new Error(
        "Account already exists"
      );

    }



    const id =
      generateId(
        "ACC"
      );



    const timestamp = now();


    sheet.appendRow([

      id,

      data.name,

      owner,

      data.type,

      Number(data.balance),

      data.currency ||
      CONFIG.DEFAULT_CURRENCY,

      "Active",

      timestamp,

      timestamp

    ]);

    return successResponse({

      message:
        "Account created successfully",

      account_id:
        id

    });


  }


  catch (error) {


    Logger.log(
      error.stack
    );


    return errorResponse(
      error.message
    );


  }

}




/**
 * Update account
 */
function updateAccount(e) {


  try {


    const data =
      JSON.parse(
        e.postData.contents
      );



    if (!data.id) {

      throw new Error(
        "Account ID required"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.ACCOUNTS
      );



    const rows =
      sheet
        .getDataRange()
        .getValues();



    for (
      var i = 1;
      i < rows.length;
      i++
    ) {



      if (
        String(rows[i][0])
        ===
        String(data.id)
      ) {



        const row =
          i + 1;



        if (data.name !== undefined) {

          sheet
            .getRange(row, 2)
            .setValue(
              data.name
            );

        }



        if (owner !== undefined) {

          sheet
            .getRange(row, 3)
            .setValue(
              owner
            );

        }



        if (data.type !== undefined) {

          sheet
            .getRange(row, 4)
            .setValue(
              data.type
            );

        }



        if (data.balance !== undefined) {


          if (
            isNaN(
              Number(data.balance)
            )
          ) {

            throw new Error(
              "Invalid balance"
            );

          }


          sheet
            .getRange(row, 5)
            .setValue(
              Number(data.balance)
            );


        }



        if (data.currency !== undefined) {

          sheet
            .getRange(row, 6)
            .setValue(
              data.currency
            );

        }



        return successResponse({

          message:
            "Account updated successfully"

        });



      }


    }



    throw new Error(
      "Account not found"
    );



  }


  catch (error) {


    Logger.log(
      error.stack
    );


    return errorResponse(
      error.message
    );


  }


}





/**
 * Delete account
 */
function toggleAccountStatus(e) {
  Logger.log('toggleAccountStatus called');

  // Parse JSON payload (POST) – fallback to query parameters
  let id, email;
  try {
    const payload = JSON.parse(e.postData.contents);
    id = payload.id;
    email = payload.email;
  } catch (_) {
    id = e.parameter.id;
    email = e.parameter.email;
  }

  if (!id) throw new Error('Account ID required');
  if (!email) throw new Error('Email required');

  const owner = getAccountOwnerFromEmail(email);
  const sheet = getSheet(CONFIG.SHEETS.ACCOUNTS);
  const rows = sheet.getDataRange().getValues();

  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) {
      const accountOwner = String(rows[i][2]).trim();
      if (accountOwner !== owner && accountOwner !== 'Shared') {
        throw new Error('You cannot toggle this account');
      }
      // column 7 = status
      const curStatus = String(rows[i][6]).trim().toLowerCase();
      const newStatus = curStatus === 'active' ? 'Inactive' : 'Active';
      sheet.getRange(i + 1, 7).setValue(newStatus);
      createAuditLog('User', `Account ${newStatus}`, id);
      return successResponse({ message: `Account marked ${newStatus}`, status: newStatus });
    }
  }

  throw new Error('Account not found');
}

function deleteAccount(e) {
  Logger.log('deleteAccount called');

  try {


    let id;
    let email;
    try {
      const payload = JSON.parse(e.postData.contents);
      id = payload.id || payload.account_id || payload.accountId;
      email = payload.email;
    } catch (err) {
      // Fallback to query parameters if body missing or malformed
      id = e.parameter.id;
      email = e.parameter.email;
    }



    if (!id) {
      // User tried to delete without an ID – show a clear UI message.
      throw new Error(
        "Please select an account to delete"
      );
    }



    const owner =
      getAccountOwnerFromEmail(
        email
      );



    const sheet =
      getSheet(
        CONFIG.SHEETS.ACCOUNTS
      );



    const rows =
      sheet
        .getDataRange()
        .getValues();



    for (
      var i = 1;
      i < rows.length;
      i++
    ) {


      if (
        String(rows[i][0])
        ===
        String(id)
      ) {



        const accountOwner =
          String(rows[i][2])
            .trim();



        if (
          accountOwner !== owner
          &&
          accountOwner !== "Shared"
        ) {

          throw new Error(
            "You cannot delete this account"
          );

        }



        const row =
          i + 1;



        sheet
          .getRange(row, 7)
          .setValue(
            "Inactive"
          );


        return successResponse({

          message:
            "Account deleted successfully"

        });


      }


    }



    throw new Error(
      "Account not found"
    );



  }


  catch (error) {


    Logger.log(
      error.stack
    );


    return errorResponse(
      error.message
    );


  }


}



/**
 * Update account balance after a transaction
 */
function updateAccountBalance(
  accountName,
  transactionType,
  amount
) {


  if (!accountName) {

    throw new Error(
      "Account is required for balance update"
    );

  }



  const sheet =
    getSheet(
      CONFIG.SHEETS.ACCOUNTS
    );



  const rows =
    sheet
      .getDataRange()
      .getValues();



  amount =
    Number(amount);



  if (isNaN(amount)) {

    throw new Error(
      "Invalid transaction amount"
    );

  }



  for (
    var i = 1;
    i < rows.length;
    i++
  ) {



    if (

      String(rows[i][1])
        .trim()
        .toLowerCase()

      ===

      String(accountName)
        .trim()
        .toLowerCase()

    ) {



      var balance =
        Number(rows[i][4] || 0);



      switch (transactionType) {


        case "Income":

          balance += amount;

          break;



        case "Expense":

          balance -= amount;

          break;



        case "Refund":

          balance += amount;

          break;



        default:

          return;

      }



      sheet
        .getRange(
          i + 1,
          5
        )
        .setValue(
          balance
        );



      sheet
        .getRange(
          i + 1,
          9
        )
        .setValue(
          now()
        );



      return;


    }


  }



  throw new Error(
    "Account not found: " +
    accountName
  );

}