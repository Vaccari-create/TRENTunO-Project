const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Report = require("../models/Report");
const jwt = require('jsonwebtoken');
var authToken = jwt.sign( {email: 'John@mail.com'}, process.env.SUPER_SECRET, {expiresIn: 86400} );
const validUserId = new mongoose.Types.ObjectId();
const validParkId = new mongoose.Types.ObjectId();
let testReport;

afterAll(async () => {
  await Report.deleteMany();
  await mongoose.connection.close();
});

beforeAll(async () => {
    testReport = await Report.create({
      user_id: validUserId.toString(),
      park_id: validParkId.toString(),
      description: "Testing",
    });
  });

describe("POST /api/reports", () => {
  test("should create a new report and return 201", async () => {
    const res = await request(app)
      .post("/api/reports")
      .set("token", `${authToken}`)
      .send({
        user_id: validUserId.toString(),
        park_id: validParkId.toString(),
        description: "Broken bench.",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Report successfully created");
    expect(res.body.report).toHaveProperty("_id");
    //reportId = res.body.report._id;
  });

  test("should return 401 for missing or invalid user_id", async () => {
    const res = await request(app)
      .post("/api/reports")
      .set("token", `${authToken}`)
      .send({ park_id: validParkId.toString(), description: "Test" });
    expect(res.status).toBe(401);
  });

});

describe("PUT /changeStatus/:id", () => {
  test("should update the status of a report", async () => {
    const res = await request(app)
      .put(`/api/reports/changeStatus/${testReport._id}?user_level=Admin`)
      .set("token", `${authToken}`)
      .send({ status: "Presa in Carico" });

    expect(res.status).toBe(200);
    expect(res.body.report.status).toBe("Presa in Carico");
  });

  test("should return 400 for invalid report ID", async () => {
    const res = await request(app)
      .put(`/api/reports/changeStatus/invalidID?user_level=Admin`)
      .set("token", `${authToken}`)
      .send({ status: "Chiusa" });

    expect(res.status).toBe(400);
  });

  test("should return 400 for invalid status", async () => {
    const res = await request(app)
      .put(`/api/reports/changeStatus/${testReport._id}?user_level=Admin`)
      .set("token", `${authToken}`)
      .send({ status: "InvalidStatus" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid status/);
  });

  test("should return 404 if report is not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/reports/changeStatus/${fakeId}?user_level=Admin`)
      .set("token", `${authToken}`)
      .send({ status: "Chiusa" });

    expect(res.status).toBe(404);
  });
});

describe("GET /api/reports", () => {
  test("should fetch all reports", async () => {
    const res = await request(app).get("/api/reports");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("should fetch reports by user_id", async () => {
    const res = await request(app).get(`/api/reports?user_id=${validUserId}`);
    expect(res.status).toBe(200);
  });
});

describe("GET /api/reports/:id", () => {
  test("should fetch a report by ID", async () => {
    const res = await request(app).get(`/api/reports/${testReport._id}`);
    expect(res.status).toBe(200);
  });

  test("should return 400 for invalid report ID", async () => {
    const res = await request(app).get("/api/reports/invalidid");
    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/reports/:id", () => {
  test("should delete a report successfully", async () => {
    const res = await request(app)
      .delete(`/api/reports/${testReport._id}?user_level=Admin`)
      .set("token", `${authToken}`);
    expect(res.status).toBe(200);
  });
});
