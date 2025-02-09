const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Events = require("../models/Event");

const jwt = require('jsonwebtoken');
var authToken = jwt.sign( {email: 'John@mail.com'}, process.env.SUPER_SECRET, {expiresIn: 86400} );

let eventTest;

const validUserId = new mongoose.Types.ObjectId();
const validParkId = new mongoose.Types.ObjectId();

afterAll(async () => {
  await Events.deleteMany();
  await mongoose.connection.close();
});

beforeAll(async () => {
    eventTest = await Events.create({
      user_id: validUserId,
      park_id: validParkId,
      status: false,
      title: "Calcetto",
      date: "20-07-2024",
      description: "Parita inizia alle 18:00"
  });
});

describe("Events API", () => {

  /** GET /events */
  test("should fetch all events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  /** GET /events?user_id={id} */
  test("should fetch events by user ID", async () => {
    const res = await request(app).get(`/api/events?user_id=${validUserId}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  /** GET /events/:id */
  test("should fetch an event by ID", async () => {
    const res = await request(app).get(`/api/events/${eventTest._id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(eventTest._id.toString());
  });

  test("should return 400 for invalid event ID", async () => {
    const res = await request(app).get("/api/events/invalidID");
    expect(res.status).toBe(400);
  });

  test("should return 404 if event is not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/events/${fakeId}`);
    expect(res.status).toBe(404);
  });

  /** POST /events */
  test("should create a new event", async () => {
    const res = await request(app)
      .post("/api/events?auth=true")
      .set("token", `${authToken}`)
      .send({
        user_id: validUserId,
        park_id: validParkId,
        title: "New Test Event",
        date: "20-07-2024",
        description: "This is a test event",
      });

    expect(res.status).toBe(201);
    expect(res.body.event).toHaveProperty("_id");
  });

  test("should return 401 if auth is missing", async () => {
    const res = await request(app).post("/api/events")
    .set("token", `${authToken}`)
    .send({
      user_id: validUserId,
      park_id: validParkId,
      title: "Unauthorized Event",
      date: "20-07-2024",
      description: "This should fail",
    });

    expect(res.status).toBe(401);
  });

  test("should return 400 if missing required fields", async () => {
    const res = await request(app).post("/api/events?auth=true")
    .set("token", `${authToken}`)
    .send({
      user_id: validUserId,
      park_id: validParkId,
      title: "Incomplete Event",
    });

    expect(res.status).toBe(400);
  });

  /** PUT /events/:id */
  test("should update an event description", async () => {
    const res = await request(app)
      .put(`/api/events/${eventTest._id}?user_level=Admin`)
      .set("token", `${authToken}`)
      .send({ description: "Updated event description" });

    expect(res.status).toBe(200);
    expect(res.body.event.description).toBe("Updated event description");
  });

  test("should return 403 if user is not an admin", async () => {
    const res = await request(app)
      .put(`/api/events/${eventTest._id}?user_level=Client`)
      .set("token", `${authToken}`)
      .send({ description: "Should not update" });

    expect(res.status).toBe(403);
  });

  test("should return 404 if event to update is not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/events/${fakeId}?user_level=Admin`)
      .set("token", `${authToken}`)
      .send({ description: "Non-existent event" });

    expect(res.status).toBe(404);
  });

  /** DELETE /events/:id */
  test("should delete an event", async () => {
    newEvent = await Events.create({
      user_id: validUserId,
      park_id: validParkId,
      title: "Delete Me",
      date: "20-07-2024",
      description: "This event will be deleted",
    });

    const deleteRes = await request(app).delete(`/api/events/${newEvent._id}`)
    .set("token", `${authToken}`);
    expect(deleteRes.status).toBe(200);
  });

  test("should return 404 if event to delete is not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/events/${fakeId}`)
    .set("token", `${authToken}`);
    expect(res.status).toBe(404);
  });

  test("should return 400 for invalid event ID", async () => {
    const res = await request(app).delete("/api/events/invalidID")
    .set("token", `${authToken}`);
    expect(res.status).toBe(400);
  });
});

