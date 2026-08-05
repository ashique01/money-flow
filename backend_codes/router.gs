function routeRequest(e) {

  try {


    const action =
      e.parameter.action;



    if (!action) {

      return errorResponse(
        "Missing action parameter"
      );

    }



    switch (action) {


      /*
      ======================
      TRANSACTIONS
      ======================
      */


      case "transactions":

        return getTransactions();



      case "transaction":

        return getTransactionById(
          e.parameter.id
        );



      case "createTransaction":

        return createTransaction(e);


      case "updateTransaction":

        return updateTransaction(e);



      case "deleteTransaction":

        return deleteTransaction(e);



      /*
      ======================
      DASHBOARD
      ======================
      */


      case "dashboard":

        return getDashboard(

          e.parameter.period || "month",

          e.parameter.email

        );



      /*
      ======================
      RECURRING
      ======================
      */


      case "recurring":

        return getRecurring();



      case "createRecurring":

        return createRecurring(e);



      case "updateRecurring":

        return updateRecurring(e);



      case "deleteRecurring":

        return deleteRecurring(e);



      /*
      ======================
      CATEGORIES
      ======================
      */

      case "categories":

        return getCategories(e);

      case "createCategory":

        return createCategory(e);

      case "updateCategory":

        return updateCategory(e);

      case "deleteCategory":

        return deleteCategory(e);



      /*
      ======================
      ACCOUNTS
      ======================
      */


      case "accounts":

        return getAccounts(e)

      case "createAccount":

        return createAccount(e);

      case "updateAccount":

        return updateAccount(e);

      case "toggleAccount":
        return toggleAccountStatus(e);
      case "deleteAccount":

        return deleteAccount(e);



      /*
      ======================
      USERS
      ======================
      */


      case "users":

        return getUsers();

      case "login":

        return loginUser(e);



      /*
      ======================
      Goals
      ======================
      */

      case "goals":
        return getGoals(e);

      case "createGoal":
        return createGoal(e);

      case "updateGoal":
        return updateGoal(e);

      case "deleteGoal":
        return deleteGoal(e);


      /*
      ======================
      BUDGETS
      ======================
      */

      case "budgets":
        return getBudgets();

      case "createBudget":
        return createBudget(e);

      case "updateBudget":
        return updateBudget(e);

      case "deleteBudget":
        return deleteBudget(e);

      // ANALYTICS
      case "analytics/summary":
        return getAnalyticsSummary(e);



      /*
      ======================
      DEFAULT
      ======================
      */


      default:

        return errorResponse(
          "Invalid action: " + action
        );


    }


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


