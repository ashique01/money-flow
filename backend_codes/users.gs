/**
 * Get all users
 */
function getUsers() {

  const users =
    getRows(CONFIG.SHEETS.USERS);

  return successResponse(users);

}



/**
 * Login user by email
 */
function loginUser(e) {

  try {

    const data =
      JSON.parse(e.postData.contents);


    if (!data.email) {

      throw new Error(
        "Email required"
      );

    }


    const email =
      String(data.email)
        .trim()
        .toLowerCase();



    const users =
      getRows(CONFIG.SHEETS.USERS);



    const user =
      users.find(function (item) {

        return (
          String(item.email)
            .trim()
            .toLowerCase()
          ===
          email
        );

      });



    if (!user) {

      throw new Error(
        "User not found"
      );

    }



    if (
      String(user.status)
        .trim()
        .toLowerCase()
      !==
      "active"
    ) {

      throw new Error(
        "Account inactive"
      );

    }



    return successResponse({

      authenticated: true,

      user: {

        user_id: user.user_id,

        name: user.name,

        email: user.email,

        avatar: user.avatar || ""

      }

    });


  }

  catch (error) {

    Logger.log(error.stack);

    return errorResponse(
      error.message
    );

  }

}