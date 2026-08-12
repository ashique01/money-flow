/**
 * =====================================================
 * RECURRING TRANSACTIONS MODULE
 * =====================================================
 */


/**
 * Get recurring transaction templates
 */
function getRecurring() {

  const data =
    getRows(
      CONFIG.SHEETS.RECURRING
    );


  return successResponse(data);

}







function createRecurring(e) {

  try {


    const data =
      JSON.parse(
        e.postData.contents
      );



    if (!data.name) {

      throw new Error(
        "Name is required"
      );

    }



    if (!data.person) {

      throw new Error(
        "Person is required"
      );

    }



    if (
      data.amount === undefined ||
      data.amount === null ||
      isNaN(Number(data.amount)) ||
      Number(data.amount) <= 0
    ) {

      throw new Error(
        "Valid amount is required"
      );

    }



    const allowedFrequency = [

      "Daily",
      "Weekly",
      "Monthly",
      "Yearly"

    ];



    if (
      !allowedFrequency.includes(
        data.frequency
      )
    ) {

      throw new Error(
        "Invalid frequency"
      );

    }



    const allowedStatus = [

      "Active",
      "Paused",
      "Completed"

    ];



    const status =
      data.status || "Active";



    if (
      !allowedStatus.includes(status)
    ) {

      throw new Error(
        "Invalid status"
      );

    }



    const nextRun =
      data.next_run
      ||
      data.start_date;



    if (!nextRun) {

      throw new Error(
        "Start date or next run is required"
      );

    }



    if (
      isNaN(
        new Date(nextRun).getTime()
      )
    ) {

      throw new Error(
        "Invalid next run date"
      );

    }



    const interval =
      Number(data.interval)
      ||
      1;



    if (interval <= 0) {

      throw new Error(
        "Interval must be greater than zero"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.RECURRING
      );



    const existing =
      getRows(
        CONFIG.SHEETS.RECURRING
      );



    const duplicate =
      existing.some(function (item) {

        return (

          String(item.name).trim().toLowerCase()
          ===
          String(data.name).trim().toLowerCase()

          &&

          String(item.person).trim().toLowerCase()
          ===
          String(data.person).trim().toLowerCase()

          &&
          Number(item.amount)
          ===
          Number(data.amount)

        );

      });



    if (duplicate) {

      throw new Error(
        "Similar recurring transaction already exists"
      );

    }



    const id =
      generateId(
        "REC"
      );



    const timestamp =
      now();



    sheet.appendRow([


      id,                         // recurring_id

      data.name,                  // name

      data.person,                // person

      data.type || "Expense",     // type

      data.category || "",        // category

      data.account || "",         // account

      data.payment_method || "",  // payment_method

      Number(data.amount),        // amount

      data.currency ||
      CONFIG.DEFAULT_CURRENCY,    // currency


      data.frequency,              // frequency

      interval,                    // interval


      data.start_date || nextRun, // start_date

      nextRun,                     // next_run


      data.end_date || "",         // end_date


      status,                      // status


      data.note || "",             // note


      timestamp,                   // created_at

      timestamp,                   // updated_at


      ""                           // last_run


    ]);



    return successResponse({

      message:
        "Recurring created successfully",


      recurring_id:
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


function updateRecurring(e) {


  try {


    const data =
      JSON.parse(
        e.postData.contents
      );



    if (!data.recurring_id) {

      throw new Error(
        "Recurring ID required"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.RECURRING
      );



    const rows =
      sheet
        .getDataRange()
        .getValues();



    for (
      let i = 1;
      i < rows.length;
      i++
    ) {



      if (
        rows[i][0]
        ===
        data.recurring_id
      ) {



        const row =
          i + 1;



        if (data.name !== undefined) {

          sheet
            .getRange(row, 2)
            .setValue(data.name);

        }



        if (data.person !== undefined) {

          sheet
            .getRange(row, 3)
            .setValue(data.person);

        }



        if (data.type !== undefined) {

          sheet
            .getRange(row, 4)
            .setValue(data.type);

        }



        if (data.category !== undefined) {

          sheet
            .getRange(row, 5)
            .setValue(data.category);

        }



        if (data.account !== undefined) {

          sheet
            .getRange(row, 6)
            .setValue(data.account);

        }



        if (data.payment_method !== undefined) {

          sheet
            .getRange(row, 7)
            .setValue(
              data.payment_method
            );

        }



        if (data.amount !== undefined) {


          if (
            isNaN(Number(data.amount))
            ||
            Number(data.amount) <= 0
          ) {

            throw new Error(
              "Invalid amount"
            );

          }


          sheet
            .getRange(row, 8)
            .setValue(
              Number(data.amount)
            );


        }

        if (data.currency !== undefined) {

          sheet
            .getRange(row, 9)
            .setValue(
              data.currency
            );

        }




        if (data.frequency !== undefined) {


          const allowedFrequency = [

            "Daily",
            "Weekly",
            "Monthly",
            "Yearly"

          ];


          if (
            !allowedFrequency.includes(
              data.frequency
            )
          ) {

            throw new Error(
              "Invalid frequency"
            );

          }


          sheet
            .getRange(row, 10)
            .setValue(
              data.frequency
            );


        }




        if (data.interval !== undefined) {


          sheet
            .getRange(row, 11)
            .setValue(
              Number(data.interval) || 1
            );


        }

        if (data.start_date !== undefined) {

          sheet
            .getRange(row, 12)
            .setValue(
              data.start_date
            );

        }

        if (data.end_date !== undefined) {

          sheet
            .getRange(row, 14)
            .setValue(
              data.end_date
            );

        }




        if (data.next_run !== undefined) {


          sheet
            .getRange(row, 13)
            .setValue(
              data.next_run
            );


        }





        if (data.status !== undefined) {


          const allowedStatus = [

            "Active",
            "Paused",
            "Completed"

          ];


          if (
            !allowedStatus.includes(
              data.status
            )
          ) {

            throw new Error(
              "Invalid status"
            );

          }


          sheet
            .getRange(row, 15)
            .setValue(
              data.status
            );


        }




        if (data.note !== undefined) {

          sheet
            .getRange(row, 16)
            .setValue(
              data.note
            );

        }

        if (
          Number(data.interval) <= 0
        ) {
          throw new Error(
            "Interval must be positive"
          );
        }




        sheet
          .getRange(row, 18)
          .setValue(
            now()
          );




        return successResponse({

          message:
            "Recurring updated successfully"

        });



      }


    }



    throw new Error(
      "Recurring not found"
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


function deleteRecurring(e) {


  try {


    const id =
      e.parameter.id;



    if (!id) {

      throw new Error(
        "Recurring ID required"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.RECURRING
      );



    const rows =
      sheet
        .getDataRange()
        .getValues();



    for (
      let i = 1;
      i < rows.length;
      i++
    ) {


      if (
        rows[i][0]
        ===
        id
      ) {


        sheet.deleteRow(
          i + 1
        );


        return successResponse({

          message:
            "Recurring deleted"

        });


      }


    }



    throw new Error(
      "Recurring not found"
    );



  }
  catch (error) {


    return errorResponse(
      error.message
    );


  }


}


/**
 * Process recurring transactions
 * Called by scheduler.gs
 */
function processRecurringTransactions() {


  const lock =
    LockService.getScriptLock();



  let createdCount = 0;



  try {


    lock.waitLock(30000);



    const recurring =
      getRows(
        CONFIG.SHEETS.RECURRING
      );



    const today =
      new Date();



    today.setHours(
      0,
      0,
      0,
      0
    );




    recurring.forEach(function (item) {



      try {



        if (!isValidRecurring(item)) {


          Logger.log(
            "Invalid recurring skipped: "
            +
            item.recurring_id
          );


          return;


        }




        if (
          item.status !== "Active"
        ) {


          Logger.log(
            "Inactive recurring skipped: "
            +
            item.recurring_id
          );


          return;


        }

        if (item.end_date) {

          const end =
            new Date(item.end_date);

          end.setHours(
            0, 0, 0, 0
          );


          if (today > end) {

            Logger.log(
              "Recurring expired: "
              +
              item.recurring_id
            );


            return;

          }

        }





        const nextRun =
          new Date(
            item.next_run
          );




        if (
          isNaN(
            nextRun.getTime()
          )
        ) {


          Logger.log(
            "Invalid next_run skipped: "
            +
            item.recurring_id
          );


          return;


        }




        nextRun.setHours(
          0,
          0,
          0,
          0
        );





        /*
         * Not due yet
         */
        if (
          nextRun.getTime()
          >
          today.getTime()
        ) {


          return;


        }





        Logger.log(
          "Processing recurring: "
          +
          item.recurring_id
          +
          " - "
          +
          item.name
        );





        /*
         * Prevent duplicate transaction
         */
        if (
          recurringAlreadyCreated(item)
        ) {



          Logger.log(
            "Already created: "
            +
            item.recurring_id
          );



          return;


        }




        try {

          createRecurringTransaction(item);

          updateRecurringNextRun(item);

          createdCount++;

        }
        catch (error) {

          Logger.log(
            "Recurring creation failed: "
            +
            item.recurring_id
            +
            " | "
            +
            error.stack
          );

        }



        Logger.log(
          "Recurring created successfully: "
          +
          item.recurring_id
        );



      }
      catch (innerError) {



        Logger.log(
          "Recurring item failed: "
          +
          item.recurring_id
          +
          " | "
          +
          innerError.stack
        );



      }



    });





    Logger.log(
      "Recurring transactions created: "
      +
      createdCount
    );



    return createdCount;



  }


  catch (error) {



    Logger.log(
      "Recurring process error: "
      +
      error.stack
    );



    throw error;



  }


  finally {


    /*
     * Always release lock
     */
    if (
      lock.hasLock()
    ) {

      lock.releaseLock();

    }


  }


}

/**
 * Create transaction from recurring template
 */
function createRecurringTransaction(item) {



  const sheet =
    getSheet(
      CONFIG.SHEETS.TRANSACTIONS
    );



  const id =
    generateId(
      "TXN"
    );



  const transactionDate =
    Utilities.formatDate(
      new Date(item.next_run),
      CONFIG.TIMEZONE,
      "yyyy-MM-dd"
    );



  sheet.appendRow([

    id,                       // transaction_id

    transactionDate,          // date

    item.person,              // person

    item.type,                // type

    item.category,            // category

    item.account || "",       // account

    item.payment_method || "",// payment_method

    Number(item.amount),      // amount

    item.currency || CONFIG.DEFAULT_CURRENCY, // currency

    item.note || "",          // note

    "Recurring",              // tags

    item.recurring_id,        // recurring_id ✅

    now(),                    // created_at

    now()                     // updated_at

  ]);


  updateRecurringLastRun(
    item.recurring_id
  );

  createAuditLog(
    "System",
    "Recurring Transaction Created",
    id
  );


}




/**
 * Update next execution date
 */
function updateRecurringNextRun(item) {

  const sheet =
    getSheet(
      CONFIG.SHEETS.RECURRING
    );


  const data =
    sheet
      .getDataRange()
      .getValues();


  for (
    let i = 1;
    i < data.length;
    i++
  ) {


    if (
      String(data[i][0]).trim()
      ===
      String(item.recurring_id).trim()
    ) {


      let nextDate =
        calculateNextRun(
          new Date(item.next_run),
          item.frequency,
          item.interval
        );


      const today =
        new Date(
          Utilities.formatDate(
            new Date(),
            CONFIG.TIMEZONE,
            "yyyy-MM-dd"
          )
        );


      let safety = 0;


      while (
        nextDate <= today
      ) {


        nextDate =
          calculateNextRun(
            nextDate,
            item.frequency,
            item.interval
          );


        safety++;


        if (
          safety > 100
        ) {

          throw new Error(
            "Recurring date calculation failed"
          );

        }

      }



      sheet
        .getRange(
          i + 1,
          13
        )
        .setValue(
          nextDate
        );



      sheet
        .getRange(
          i + 1,
          18
        )
        .setValue(
          now()
        );


      break;


    }


  }


}

/**
 * Calculate next recurring date
 */
function calculateNextRun(
  date,
  frequency,
  interval
) {


  const next =
    new Date(date);


  interval =
    Number(interval)
    ||
    1;



  switch (frequency) {


    case "Daily":

      next.setDate(
        next.getDate()
        +
        interval
      );

      break;



    case "Weekly":

      next.setDate(
        next.getDate()
        +
        (
          7 *
          interval
        )
      );

      break;



    case "Monthly": {


      const day =
        next.getDate();


      next.setDate(1);


      next.setMonth(
        next.getMonth()
        +
        interval
      );


      const lastDay =
        new Date(
          next.getFullYear(),
          next.getMonth() + 1,
          0
        )
          .getDate();



      next.setDate(
        Math.min(
          day,
          lastDay
        )
      );


      break;

    }



    case "Yearly":

      next.setFullYear(
        next.getFullYear()
        +
        interval
      );

      break;


  }


  return next;

}



/**
 * Prevent duplicate recurring transaction
 */
function recurringAlreadyCreated(item) {


  if (
    !item ||
    !item.recurring_id ||
    !item.next_run
  ) {

    return false;

  }



  const dueDateObj =
    new Date(
      item.next_run
    );



  if (
    isNaN(
      dueDateObj.getTime()
    )
  ) {

    return false;

  }



  const dueDate =
    Utilities.formatDate(
      dueDateObj,
      CONFIG.TIMEZONE,
      "yyyy-MM-dd"
    );



  const transactions =
    getRows(
      CONFIG.SHEETS.TRANSACTIONS
    );



  return transactions.some(function(tx){


    if (
      !tx.recurring_id ||
      !tx.date
    ){

      return false;

    }



    if (
      String(tx.recurring_id).trim()
      !==
      String(item.recurring_id).trim()
    ){

      return false;

    }



    const txDateObj =
      new Date(
        tx.date
      );



    if(
      isNaN(
        txDateObj.getTime()
      )
    ){

      return false;

    }



    const txDate =
      Utilities.formatDate(
        txDateObj,
        CONFIG.TIMEZONE,
        "yyyy-MM-dd"
      );



    return (
      txDate === dueDate
    );


  });


}
/**
 * Validate recurring object
 */
function isValidRecurring(item) {


  if (!item.recurring_id) {
    return false;
  }


  if (
    Number(item.amount) <= 0 ||
    isNaN(Number(item.amount))
  ) {
    return false;
  }


  if (!item.next_run) {
    return false;
  }


  if (!item.frequency) {
    return false;
  }


  if (!item.status) {
    return false;
  }


  return true;

}

function updateRecurringLastRun(id) {

  const sheet =
    getSheet(
      CONFIG.SHEETS.RECURRING
    );


  const rows =
    sheet
      .getDataRange()
      .getValues();



  for (
    let i = 1;
    i < rows.length;
    i++
  ) {


    if (
      String(rows[i][0]).trim()
      ===
      String(id).trim()
    ) {


      sheet
        .getRange(
          i + 1,
          19
        )
        .setValue(
          now()
        );


      break;

    }


  }


}
