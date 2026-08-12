function executeWithLock(callback) {


  const lock =
    LockService.getScriptLock();


  try {


    lock.waitLock(10000);


    return callback();



  }

  finally {


    lock.releaseLock();


  }


}