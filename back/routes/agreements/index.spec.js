// create tests for the agreements route using the supertest module
require("module-alias/register");
const request = require("supertest");
const { mockAgreements } = require("@root/public/scripts/db-mock.js");
const { Agreement } = require("@models/index");

const app = require("../../app");

let token;

const api = request(app);

beforeAll(async () => {
  await Agreement.sync({ force: true });
  await Promise.all(
    mockAgreements().map((agreement) => Agreement.create(agreement))
  );

  let response = await api.post("/auth/login").send({
    email: "AliceJohnson@example.com",
    password: "example",
  });

  token = response.body.accessToken;

  return;
});

describe("agreements route", () => {
  describe("GET /agreements", () => {
    it("should return a 200 status code", async () => {
      await api
        .get("/agreements")
        .set("x-access-token", token)
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("there are 7 agreements", async () => {
      const response = await api
        .get("/agreements")
        .set("x-access-token", token);
      expect(response.body.length).toBe(1); // only 1 agreement for Alice
    });
  });

  describe("GET /agreements/:id", () => {
    it("should return a 200 status code", async () => {
      await api
        .get("/agreements/1")
        .set("x-access-token", token)
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("should return the agreement with id 1", async () => {
      const response = await api
        .get("/agreements/1")
        .set("x-access-token", token);
      expect(response.body.id).toBe(1);
    });

    it("should return a 404 status code", async () => {
      await api.get("/agreements/999").set("x-access-token", token).expect(404);
    });
  });
});
