const bcrypt = require("bcryptjs");

function mockAccounts() {
  const accounts = [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      profession: "Engineer",
      admin: true,
      balance: 987.21,
      type: "buyer",
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Smith",
      profession: "Designer",
      balance: 321.55,
      type: "buyer",
    },
    {
      id: 3,
      firstName: "Eve",
      lastName: "Green",
      profession: "Artist",
      balance: 456.78,
      type: "buyer",
    },
    {
      id: 4,
      firstName: "Mark",
      lastName: "Williams",
      profession: "Writer",
      balance: 81.13,
      type: "buyer",
    },
    {
      id: 5,
      firstName: "John",
      lastName: "Doe",
      profession: "Musician",
      balance: 624.45,
      type: "supplier",
    },
    {
      id: 6,
      firstName: "Jane",
      lastName: "Smith",
      profession: "Developer",
      balance: 1100.21,
      type: "supplier",
    },
    {
      id: 7,
      firstName: "Mike",
      lastName: "Johnson",
      profession: "Designer",
      balance: 500.33,
      type: "supplier",
    },
    {
      id: 8,
      firstName: "Lucy",
      lastName: "Brown",
      profession: "Photographer",
      balance: 909.09,
      type: "supplier",
    },
  ];

  return accounts.map((account) => ({
    ...account,
    password: bcrypt.hashSync("example", 8),
    email: `${account.firstName}${account.lastName}@example.com`,
  }));
}

function mockAgreements() {
  return [
    {
      id: 1,
      terms: "Sample terms for agreement 1",
      status: "terminated",
      BuyerId: 1,
      SupplierId: 5,
    },
    {
      id: 2,
      terms: "Sample terms for agreement 2",
      status: "in_progress",
      BuyerId: 1,
      SupplierId: 6,
    },
    {
      id: 3,
      terms: "Sample terms for agreement 3",
      status: "in_progress",
      BuyerId: 2,
      SupplierId: 6,
    },
    {
      id: 4,
      terms: "Sample terms for agreement 4",
      status: "in_progress",
      BuyerId: 2,
      SupplierId: 7,
    },
    {
      id: 5,
      terms: "Sample terms for agreement 5",
      status: "new",
      BuyerId: 3,
      SupplierId: 8,
    },
    {
      id: 6,
      terms: "Sample terms for agreement 6",
      status: "in_progress",
      BuyerId: 3,
      SupplierId: 7,
    },
    {
      id: 7,
      terms: "Sample terms for agreement 7",
      status: "in_progress",
      BuyerId: 4,
      SupplierId: 7,
    },
    {
      id: 8,
      terms: "Sample terms for agreement 8",
      status: "in_progress",
      BuyerId: 4,
      SupplierId: 6,
    },
    {
      id: 9,
      terms: "Sample terms for agreement 9",
      status: "in_progress",
      BuyerId: 4,
      SupplierId: 8,
    },
  ];
}

function mockSubmissions() {
  return [
    {
      description: "Sample submission 1",
      price: 102.11,
      AgreementId: 1,
    },
    {
      description: "Sample submission 2",
      price: 203.22,
      AgreementId: 2,
    },
    {
      description: "Sample submission 3",
      price: 144.33,
      AgreementId: 3,
    },
    {
      description: "Sample submission 4",
      price: 199.44,
      AgreementId: 4,
    },
    {
      description: "Sample submission 5",
      price: 75.55,
      AgreementId: 7,
    },
    {
      description: "Sample submission 6",
      price: 312.66,
      paid: true,
      paymentDate: "2022-04-18T08:15:12.000Z",
      AgreementId: 7,
    },
    {
      description: "Sample submission 7",
      price: 92.77,
      paid: true,
      paymentDate: "2022-04-20T14:30:06.000Z",
      AgreementId: 2,
    },
    {
      description: "Sample submission 8",
      price: 115.88,
      paid: true,
      paymentDate: "2022-04-22T19:45:45.000Z",
      AgreementId: 3,
    },
    {
      description: "Sample submission 9",
      price: 156.99,
      paid: true,
      paymentDate: "2022-04-24T23:55:22.000Z",
      AgreementId: 1,
    },
    {
      description: "Sample submission 10",
      price: 278.1,
      paid: true,
      paymentDate: "2022-04-27T03:10:11.000Z",
      AgreementId: 5,
    },
    {
      description: "Sample submission 11",
      price: 33.21,
      paid: true,
      paymentDate: "2022-04-28T05:20:33.000Z",
      AgreementId: 1,
    },
    {
      description: "Sample submission 12",
      price: 44.32,
      paid: true,
      paymentDate: "2022-04-30T07:30:15.000Z",
      AgreementId: 2,
    },
    {
      description: "Sample submission 13",
      price: 55.43,
      paid: true,
      paymentDate: "2022-05-01T09:40:18.000Z",
      AgreementId: 3,
    },
    {
      description: "Sample submission 14",
      price: 66.54,
      paid: true,
      paymentDate: "2022-05-03T12:00:07.000Z",
      AgreementId: 3,
    },
  ];
}

module.exports = {
  mockAccounts,
  mockAgreements,
  mockSubmissions,
};
