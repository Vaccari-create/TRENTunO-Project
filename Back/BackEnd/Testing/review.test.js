const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Review = require("../models/Review");
const jwt = require('jsonwebtoken');
var authToken = jwt.sign( {email: 'John@mail.com'}, process.env.SUPER_SECRET, {expiresIn: 86400} );

const validUserId = new mongoose.Types.ObjectId();
const validParkId = new mongoose.Types.ObjectId();
let reviewId;

afterAll(async () => {
  await Review.deleteMany();
  await mongoose.connection.close();
});

describe("POST /api/reviews", () => {
  test("should create a new review and return 201", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set("token", `${authToken}`)
      .send({
        user_id: validUserId.toString(),
        park_id: validParkId.toString(),
        Rating: 5,
        Description: "Great park!",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Review added successfully!");
    expect(res.body.review).toHaveProperty("_id");
    expect(res.body.review.user_id).toBe(validUserId.toString());
    expect(res.body.review.park_id).toBe(validParkId.toString());
    expect(res.body.review.Rating).toBe(5);
    expect(res.body.review.Description).toBe("Great park!");
    reviewId = res.body.review._id;
  });

  test("should return 402 for invalid rating", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set("token", `${authToken}`)
      .send({
        user_id: validUserId.toString(),
        park_id: validParkId.toString(),
        Rating: 10,
        Description: "Nice place!",
      });

    expect(res.status).toBe(402);
  });

  test("should return 400 if description is missing", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set("token", `${authToken}`)
      .send({
        user_id: validUserId.toString(),
        park_id: validParkId.toString(),
        Rating: 4,
      });

    expect(res.status).toBe(400);
  });
});

describe("GET /api/reviews", () => {
  test("should fetch all reviews", async () => {
    const res = await request(app).get("/api/reviews");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("should fetch reviews by user_id", async () => {
    const res = await request(app).get(`/api/reviews?user_id=${validUserId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(review => {
      expect(review.user_id).toBe(validUserId.toString());
    });
  });

  test("should fetch reviews by park_id", async () => {
    const res = await request(app).get(`/api/reviews?park_id=${validParkId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(review => {
      expect(review.park_id).toBe(validParkId.toString());
    });
  });

  test("should fetch a review by ID", async () => {
    const res = await request(app).get(`/api/reviews/${reviewId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", reviewId);
  });

  test("should return 400 for invalid ID format", async () => {
    const res = await request(app).get("/api/reviews/invalidid");

    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/reviews/:id", () => {
  test("should delete a review successfully", async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set("token", `${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Review successfully deleted.");
  });

  test("should return 404 if review is not found", async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set("token", `${authToken}`);
    expect(res.status).toBe(404);
  });
});