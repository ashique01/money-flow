/**
 * =====================================================
 * GOALS MODULE
 * =====================================================
 */

function getGoals(e) {

  try {


    const email =
      e.parameter.email;


    const owner =
      getAccountOwnerFromEmail(
        email
      );



    const goals =
      getRows(
        CONFIG.SHEETS.GOALS
      );



    const result =
      goals.filter(function (item) {


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
 * Create goal
 */
function createGoal(e) {

  try {


    const data =
      JSON.parse(
        e.postData.contents
      );



    if (!data.goal) {

      throw new Error(
        "Goal name required"
      );

    }



    if (!data.owner) {

      throw new Error(
        "Owner required"
      );

    }



    const allowedOwners = [

      "Ash",

      "Rifa",

      "Shared"

    ];



    if (
      !allowedOwners.includes(
        data.owner
      )
    ) {

      throw new Error(
        "Invalid owner"
      );

    }



    if (
      data.target === undefined ||
      isNaN(
        Number(data.target)
      ) ||
      Number(data.target) <= 0
    ) {

      throw new Error(
        "Valid target amount required"
      );

    }



    const current =
      data.current === undefined
        ? 0
        :
        Number(data.current);



    if (
      isNaN(current)
      ||
      current < 0
    ) {

      throw new Error(
        "Invalid current amount"
      );

    }



    if (!data.deadline) {

      throw new Error(
        "Deadline required"
      );

    }



    if (
      isNaN(
        new Date(data.deadline)
          .getTime()
      )
    ) {

      throw new Error(
        "Invalid deadline"
      );

    }



    const allowedStatus = [

      "Active",

      "Completed",

      "Cancelled"

    ];



    const status =
      data.status || "Active";



    if (
      !allowedStatus.includes(
        status
      )
    ) {

      throw new Error(
        "Invalid status"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.GOALS
      );



    const existing =
      getRows(
        CONFIG.SHEETS.GOALS
      );



    const duplicate =
      existing.some(function (item) {


        return (

          String(item.goal)
            .trim()
            .toLowerCase()

          ===

          String(data.goal)
            .trim()
            .toLowerCase()


          &&


          String(item.owner)
            .trim()
            .toLowerCase()

          ===

          String(data.owner)
            .trim()
            .toLowerCase()


        );


      });



    if (duplicate) {

      throw new Error(
        "Goal already exists"
      );

    }



    const id =
      generateId(
        "GOAL"
      );



    const timestamp =
      now();



    sheet.appendRow([


      id,              // goal_id


      data.goal,       // goal


      data.owner,      // owner


      Number(data.target), // target


      current,         // current


      data.deadline,   // deadline


      status,          // status


      timestamp,       // created_at


      timestamp        // updated_at


    ]);




    return successResponse({

      message:
        "Goal created successfully",


      goal_id:
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
 * Update goal
 */
function updateGoal(e) {

  try {


    const data =
      JSON.parse(
        e.postData.contents
      );



    if (!data.goal_id) {

      throw new Error(
        "Goal ID required"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.GOALS
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
        String(rows[i][0]).trim()
        ===
        String(data.goal_id).trim()
      ) {



        const row =
          i + 1;



        if (data.goal !== undefined) {

          sheet
            .getRange(row, 2)
            .setValue(
              data.goal
            );

        }



        if (data.owner !== undefined) {


          const allowedOwners = [

            "Ash",
            "Rifa",
            "Shared"

          ];


          if (
            !allowedOwners.includes(
              data.owner
            )
          ) {

            throw new Error(
              "Invalid owner"
            );

          }


          sheet
            .getRange(row, 3)
            .setValue(
              data.owner
            );

        }



        if (data.target !== undefined) {


          if (
            isNaN(
              Number(data.target)
            )
            ||
            Number(data.target) <= 0
          ) {

            throw new Error(
              "Invalid target amount"
            );

          }


          sheet
            .getRange(row, 4)
            .setValue(
              Number(data.target)
            );

        }



        if (data.current !== undefined) {


          if (
            isNaN(
              Number(data.current)
            )
            ||
            Number(data.current) < 0
          ) {

            throw new Error(
              "Invalid current amount"
            );

          }


          sheet
            .getRange(row, 5)
            .setValue(
              Number(data.current)
            );

        }



        if (data.deadline !== undefined) {


          if (
            isNaN(
              new Date(data.deadline)
                .getTime()
            )
          ) {

            throw new Error(
              "Invalid deadline"
            );

          }


          sheet
            .getRange(row, 6)
            .setValue(
              data.deadline
            );

        }



        if (data.status !== undefined) {


          const allowedStatus = [

            "Active",
            "Completed",
            "Cancelled"

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
            .getRange(row, 7)
            .setValue(
              data.status
            );


        }



        sheet
          .getRange(row, 9)
          .setValue(
            now()
          );



        return successResponse({

          message:
            "Goal updated successfully"

        });



      }


    }



    throw new Error(
      "Goal not found"
    );



  }


  catch(error) {


    Logger.log(
      error.stack
    );


    return errorResponse(
      error.message
    );


  }


}



/**
 * Delete goal
 */
function deleteGoal(e) {

  try {


    const id =
      e.parameter.id;



    if (!id) {

      throw new Error(
        "Goal ID required"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.GOALS
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
        String(rows[i][0]).trim()
        ===
        String(id).trim()
      ) {



        sheet.deleteRow(
          i + 1
        );



        return successResponse({

          message:
            "Goal deleted successfully"

        });



      }


    }



    throw new Error(
      "Goal not found"
    );



  }


  catch(error) {


    Logger.log(
      error.stack
    );


    return errorResponse(
      error.message
    );


  }


}



/**
 * Update goal progress
 */
function updateGoalProgress(
  owner,
  amount
) {


  amount =
    Number(amount);



  if (
    isNaN(amount)
  ) {

    throw new Error(
      "Invalid goal amount"
    );

  }



  const sheet =
    getSheet(
      CONFIG.SHEETS.GOALS
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


    const goalOwner =
      String(rows[i][2])
        .trim()
        .toLowerCase();



    if (

      goalOwner ===
      String(owner)
        .trim()
        .toLowerCase()

      ||

      goalOwner ===
      "shared"

    ) {



      var current =
        Number(rows[i][4] || 0);



      var target =
        Number(rows[i][3] || 0);



      current += amount;



      if (
        current >= target
      ) {

        sheet
          .getRange(
            i + 1,
            7
          )
          .setValue(
            "Completed"
          );

      }



      sheet
        .getRange(
          i + 1,
          5
        )
        .setValue(
          current
        );



      sheet
        .getRange(
          i + 1,
          9
        )
        .setValue(
          now()
        );


    }


  }


}