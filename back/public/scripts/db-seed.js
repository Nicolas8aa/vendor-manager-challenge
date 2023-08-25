require("module-alias/register");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const { Agreement, Submission, Account } = require("@models/index");
const { mockAccounts, mockAgreements, mockSubmissions } = require("./db-mock");

async function seed() {
  // create tables
  await Account.sync({ force: true });
  await Agreement.sync({ force: true });
  await Submission.sync({ force: true });

  // insert data
  await Promise.all([
    ...mockAccounts().map((account) => Account.create(account)),
    ...mockAgreements().map((agreement) => Agreement.create(agreement)),
    ...mockSubmissions().map((submission) => Submission.create(submission)),
  ]);

  // generate a JSON file with the accounts ? testing purposes
  const accounts = await Account.findAll();
  fs.writeFileSync("./accounts.json", JSON.stringify(accounts, null, 2));
}

/* This function can delete the database */
// execute seed
seed();
