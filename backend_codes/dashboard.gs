function getDashboard(
  period,
  email
) {

  period = period || "month";

  const owner =
    getAccountOwnerFromEmail(
      email
    );
  const nowDate = new Date();

  const startDate = new Date();
  const endDate = new Date();


  switch (period) {

    case "today":

      startDate.setHours(0, 0, 0, 0);

      endDate.setHours(23, 59, 59, 999);

      break;


    case "week":

      startDate.setDate(
        nowDate.getDate() - nowDate.getDay()
      );

      startDate.setHours(0, 0, 0, 0);


      endDate.setDate(
        startDate.getDate() + 6
      );

      endDate.setHours(23, 59, 59, 999);

      break;


    case "month":

      startDate.setDate(1);

      startDate.setHours(0, 0, 0, 0);


      endDate.setMonth(
        nowDate.getMonth() + 1
      );

      endDate.setDate(0);

      endDate.setHours(23, 59, 59, 999);

      break;


    case "year":

      startDate.setMonth(0, 1);

      startDate.setHours(0, 0, 0, 0);


      endDate.setMonth(11, 31);

      endDate.setHours(23, 59, 59, 999);

      break;


    case "all":

      startDate.setFullYear(2000);

      endDate.setFullYear(3000);

      break;

  }


  const transactions =
    getRows(CONFIG.SHEETS.TRANSACTIONS);



  const filteredTransactions =
    transactions.filter(function (tx) {

      const txDate =
        new Date(tx.date);


      const person =
        String(tx.person)
          .trim()
          .toLowerCase();


      return (

        txDate >= startDate &&

        txDate <= endDate &&

        (

          person ===
          owner.toLowerCase()

          ||

          person ===
          "shared"

        )

      );

    });

  let totalIncome = 0;
  let totalExpense = 0;

  let categories = {};
  let people = {};


  filteredTransactions.forEach(function (tx) {

    const amount =
      Number(tx.amount) || 0;


    if (tx.type === "Income") {

      totalIncome += amount;

    }


    if (tx.type === "Expense") {

      totalExpense += amount;


      const category =
        tx.category || "Other";


      if (!categories[category]) {

        categories[category] = 0;

      }


      categories[category] += amount;



      const person =
        tx.person || "Unknown";


      if (!people[person]) {

        people[person] = 0;

      }


      people[person] += amount;

    }

  });


  // ---- Round totals for UI ----
  const round2 = v => Number(v.toFixed(2));
  totalIncome = round2(totalIncome);
  totalExpense = round2(totalExpense);

  const accounts =
    getRows(
      CONFIG.SHEETS.ACCOUNTS
    );


  const accountSummary =
    accounts
      .filter(function (account) {

        const accountOwner =
          String(account.owner)
            .trim()
            .toLowerCase();

        return (

          accountOwner ===
          owner.toLowerCase()

          ||

          accountOwner ===
          "shared"

        );

      })

      .map(function (account) {

        return {

          name:
            account.name,

          type:
            account.type,

          balance:
            Number(account.balance) || 0,

          currency:
            account.currency

        };

      });

  return successResponse({

    period: period,


    accounts:
      accountSummary,


    summary: {

      balance: round2(totalIncome - totalExpense),


      income:
        totalIncome,


      expense:
        totalExpense,


      savingRate:

        totalIncome > 0

          ?

          Number(
            (
              (
                (totalIncome - totalExpense)
                /
                totalIncome
              )
              *
              100
            ).toFixed(2)
          )

          :

          0

    },


    monthly: {

      income:
        totalIncome,


      expense:
        totalExpense

    },


    categories:

      Object.keys(categories)
        .map(function (key) {

          return {

            name: key,

            amount: categories[key]

          };

        })
        .sort(function (a, b) {

          return b.amount - a.amount;

        }),



    people: people,



    recentTransactions:

      filteredTransactions
        .sort(function (a, b) {

          return new Date(b.date)
            -
            new Date(a.date);

        })
        .slice(0, 10)

  });


}