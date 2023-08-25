// create tests for the agreements route using the supertest module
require("module-alias/register");
const request = require("supertest");

const app = require("../../app");

let token;

beforeAll((done) => {
  request(app)
    .post("/auth/login")
    .send({
      email: "AliceJohnson@example.com",
      password: "example",
    })
    .end((err, response) => {
      token = response.body.accessToken;
      done();
    });
});

describe("agreements route", () => {
  describe("GET /agreements", () => {
    it("should return a 200 status code", async () => {
      const response = await request(app)
        .get("/agreements")
        .set("x-access-token", token);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /agreements/:id", () => {
    it("should return a 200 status code", async () => {
      const response = await request(app)
        .get("/agreements/1")
        .set("x-access-token", token);
      expect(response.statusCode).toBe(200);
    });
  });
});
