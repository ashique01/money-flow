function runRecurringScheduler() {

  try {

    processRecurringTransactions();

  }
  catch(error) {


    Logger.log(
      "Recurring Scheduler Error: "
      +
      error.message
    );


    createAuditLog(
      "System",
      "Recurring Scheduler Failed",
      error.message
    );


  }

}

/**
 * Manual test for recurring scheduler.
 */
function testRecurringScheduler() {

  Logger.log("===== Scheduler Started =====");

  processRecurringTransactions();

  Logger.log("===== Scheduler Finished =====");

}


/**
 * Creates a daily trigger.
 * Run ONCE manually.
 */
function createDailyRecurringTrigger() {

  // Remove existing trigger(s)
  const triggers = ScriptApp.getProjectTriggers();

  triggers.forEach(function(trigger) {

    if (
      trigger.getHandlerFunction() ===
      "runRecurringScheduler"
    ) {

      ScriptApp.deleteTrigger(trigger);

    }

  });

  // Create new trigger
  ScriptApp.newTrigger("runRecurringScheduler")
    .timeBased()
    .everyDays(1)
    .atHour(1) // 1 AM Sydney time
    .create();

  Logger.log("Daily recurring trigger created.");

}


/**
 * Deletes all recurring scheduler triggers.
 */
function deleteRecurringTrigger() {

  const triggers = ScriptApp.getProjectTriggers();

  triggers.forEach(function(trigger) {

    if (
      trigger.getHandlerFunction() ===
      "runRecurringScheduler"
    ) {

      ScriptApp.deleteTrigger(trigger);

    }

  });

  Logger.log("Recurring trigger removed.");

}
