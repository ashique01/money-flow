// Added category validation and enrichment
function getCategoryById(id) {
  const categories = getRows(CONFIG.SHEETS.CATEGORIES);
  const cat = categories.find(c => String(c[0]).trim() === String(id).trim()); // assuming first column is category_id
  return cat || null;
}

function getBudgets() {


  const budgets =
    getRows(CONFIG.SHEETS.BUDGETS);


  const transactions =
    getRows(CONFIG.SHEETS.TRANSACTIONS);



  const now =
    new Date();



  const result =
    budgets.map(function (budget) {



      let spent = 0;



      // Enrich budget with category details and calculate spent
    const catObj = getCategoryById(budget.category);
    const catName = catObj ? catObj[1] : budget.category; // fallback to stored value
    const catIcon = catObj ? catObj[4] : "";
    const catColor = catObj ? catObj[5] : "";

    transactions.forEach(function (tx) {



        const txDate =
          new Date(tx.date);



        if (

          String(tx.type)
            .trim()
            .toLowerCase()
          ===
          "expense"


          &&


          String(tx.category)
            .trim()
            .toLowerCase()

          ===

          String(catName)
            .trim()
            .toLowerCase()


          &&


          String(tx.person)
            .trim()
            .toLowerCase()

          ===

          String(budget.person)
            .trim()
            .toLowerCase()

        ) {


          if (
            budget.period === "Monthly"
          ) {


            if (
              txDate.getMonth() === now.getMonth() &&
              txDate.getFullYear() === now.getFullYear()
            ) {

              spent += Number(tx.amount) || 0;

            }


          }



          else if (
            budget.period === "Yearly"
          ) {


            if (
              txDate.getFullYear() === now.getFullYear()
            ) {

              spent += Number(tx.amount) || 0;

            }


          }



        }



      });





      const amount =
        Number(budget.amount) || 0;



      const remaining =
        amount - spent;



      const percentage =
        amount > 0
          ?
          Number(
            (
              (spent / amount)
              *
              100
            )
              .toFixed(2)
          )
          :
          0;





      return {


        budget_id:
          budget.budget_id,


        person:
          budget.person,


        category:
          budget.category,


        amount:
          amount,


        period:
          budget.period,


        spent:
          spent,


        remaining:
          remaining,


        percentage:
          percentage,


        category_id: budget.category,
        category_name: catName,
        category_icon: catIcon,
        category_color: catColor,
        created_at:
          budget.created_at,


        updated_at:
          budget.updated_at


      };



    });




  return successResponse(
    result
  );


}

function createBudget(e) {

  try {


    const data =
      JSON.parse(e.postData.contents);



    if (!data.person) {

      throw new Error(
        "Person is required"
      );

    }


    if (!data.category) {

      throw new Error(
        "Category is required"
      );

    }


        // Validate category exists
    const cat = getCategoryById(data.category);
    if (!cat) {
      throw new Error(
        "Category not found"
      );
    }

    if (!data.amount) {

      throw new Error(
        "Amount is required"
      );

    }


    if (!data.period) {

      throw new Error(
        "Period is required"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.BUDGETS
      );



    const budgetId =
      generateId(
        "BUD"
      );



    const timestamp =
      now();



    sheet.appendRow([


      budgetId,


      data.person,


      data.category,


      Number(data.amount),


      data.period,


      timestamp,


      timestamp


    ]);



    return successResponse({

      message:
        "Budget created successfully",


      budget_id:
        budgetId

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


function updateBudget(e) {

  try {


    const data =
      JSON.parse(e.postData.contents);



    if (!data.budget_id) {

      throw new Error(
        "Budget ID is required"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.BUDGETS
      );



    const values =
      sheet.getDataRange()
        .getValues();



    const headers =
      values[0];



    const budgetIdIndex =
      headers.indexOf(
        "budget_id"
      );



    if (budgetIdIndex === -1) {

      throw new Error(
        "budget_id column not found"
      );

    }



    let rowNumber = -1;



    for (
      let i = 1;
      i < values.length;
      i++
    ) {


      if (
        values[i][budgetIdIndex]
        ===
        data.budget_id
      ) {

        rowNumber = i + 1;

        break;

      }


    }



    if (rowNumber === -1) {

      throw new Error(
        "Budget not found"
      );

    }




    const updatedAt =
      now();



    /*
    ======================
    UPDATE FIELDS
    ======================
    */


    const row =
      values[rowNumber - 1];



    const personIndex =
      headers.indexOf("person");


    const categoryIndex =
      headers.indexOf("category");


    const amountIndex =
      headers.indexOf("amount");


    const periodIndex =
      headers.indexOf("period");


    const updatedAtIndex =
      headers.indexOf("updated_at");




    if (personIndex !== -1 && data.person) {

      row[personIndex] =
        data.person;

    }



    if (
      categoryIndex !== -1 &&
      data.category
    ) {
      // Validate category exists
      const cat = getCategoryById(data.category);
      if (!cat) {
        throw new Error(
          "Category not found"
        );
      }
      row[categoryIndex] =
        data.category;
    }



    if (
      amountIndex !== -1 &&
      data.amount !== undefined
    ) {

      row[amountIndex] =
        Number(data.amount);

    }



    if (
      periodIndex !== -1 &&
      data.period
    ) {

      row[periodIndex] =
        data.period;

    }



    if (
      updatedAtIndex !== -1
    ) {

      row[updatedAtIndex] =
        updatedAt;

    }




    sheet
      .getRange(
        rowNumber,
        1,
        1,
        headers.length
      )
      .setValues([
        row
      ]);




    return successResponse({

      message:
        "Budget updated successfully",


      budget_id:
        data.budget_id

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


function deleteBudget(e) {

  try {


    const data =
      JSON.parse(e.postData.contents);



    if (!data.budget_id) {

      throw new Error(
        "Budget ID is required"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.BUDGETS
      );



    const values =
      sheet.getDataRange()
        .getValues();



    const headers =
      values[0];



    const budgetIdIndex =
      headers.indexOf(
        "budget_id"
      );



    if (budgetIdIndex === -1) {

      throw new Error(
        "budget_id column not found"
      );

    }



    let rowNumber = -1;



    for (
      let i = 1;
      i < values.length;
      i++
    ) {


      if (
        values[i][budgetIdIndex]
        ===
        data.budget_id
      ) {

        rowNumber = i + 1;

        break;

      }


    }



    if (rowNumber === -1) {

      throw new Error(
        "Budget not found"
      );

    }



    sheet.deleteRow(
      rowNumber
    );



    return successResponse({

      message:
        "Budget deleted successfully",


      budget_id:
        data.budget_id

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