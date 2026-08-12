/**
 * =====================================================
 * CATEGORIES MODULE
 * =====================================================
 */


/**
 * Get categories
 */
function getCategories(e) {

  try {


    const email =
      e.parameter.email;


    const owner =
      getAccountOwnerFromEmail(
        email
      );


    const categories =
      getRows(
        CONFIG.SHEETS.CATEGORIES
      );


    const result =
      categories.filter(function(item) {


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
 * Create Category
 */
function createCategory(e) {

  try {


    const data =
      JSON.parse(
        e.postData.contents
      );



    if (!data.name) {

      throw new Error(
        "Category name required"
      );

    }



    if (!data.type) {

      throw new Error(
        "Category type required"
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



    const allowedTypes = [

      "Income",

      "Expense"

    ];


    if (
      !allowedTypes.includes(
        data.type
      )
    ) {

      throw new Error(
        "Invalid category type"
      );

    }



    const sheet =
      getSheet(
        CONFIG.SHEETS.CATEGORIES
      );


    const existing =
      getRows(
        CONFIG.SHEETS.CATEGORIES
      );


    const duplicate =
      existing.some(function(item) {


        return (

          String(item.name)
            .trim()
            .toLowerCase()

          ===

          String(data.name)
            .trim()
            .toLowerCase()

          &&

          String(item.type)
            .trim()
            .toLowerCase()

          ===

          String(data.type)
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
        "Category already exists"
      );

    }



    const id =
      generateId(
        "CAT"
      );


    const timestamp =
      now();


    sheet.appendRow([

      id,

      data.name,

      data.type,

      data.icon || "",

      data.color || "",

      data.owner,

      timestamp,

      timestamp

    ]);


    return successResponse({

      message:
        "Category created successfully",

      category_id:
        id

    });


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
 * Update Category
 */
function updateCategory(e) {

  try {


    const data =
      JSON.parse(
        e.postData.contents
      );


    if (!data.category_id) {

      throw new Error(
        "Category ID required"
      );

    }


    const sheet =
      getSheet(
        CONFIG.SHEETS.CATEGORIES
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
        String(data.category_id).trim()
      ) {


        const row =
          i + 1;



        if (data.name !== undefined) {

          sheet
            .getRange(row,2)
            .setValue(
              data.name
            );

        }



        if (data.type !== undefined) {

          sheet
            .getRange(row,3)
            .setValue(
              data.type
            );

        }



        if (data.icon !== undefined) {

          sheet
            .getRange(row,4)
            .setValue(
              data.icon
            );

        }



        if (data.color !== undefined) {

          sheet
            .getRange(row,5)
            .setValue(
              data.color
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
            .getRange(row,6)
            .setValue(
              data.owner
            );

        }



        sheet
          .getRange(row,8)
          .setValue(
            now()
          );


        return successResponse({

          message:
            "Category updated successfully"

        });


      }


    }


    throw new Error(
      "Category not found"
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
 * Delete Category
 */
function deleteCategory(e) {

  try {


    var id =
      e.parameter.id;


    if (!id) {

      const body =
        JSON.parse(
          e.postData.contents
        );

      id =
        body.id;

    }


    if (!id) {

      throw new Error(
        "Category ID required"
      );

    }


    const sheet =
      getSheet(
        CONFIG.SHEETS.CATEGORIES
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
            "Category deleted successfully"

        });


      }


    }


    throw new Error(
      "Category not found"
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