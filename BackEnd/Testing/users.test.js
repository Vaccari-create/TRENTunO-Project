const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../Routes/users"); // Import the Express app and server
const User = require("../models/User");



describe("GET /users/:id", () => {
  let testUser;

  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/Testing");

    // Create a test user that follows the schema
    testUser = await User.create({
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      password: "securepassword",
      user_level: "Client",
      auth: false,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should return 200 and user data for a valid user ID", async () => {
    const res = await request(app).get(`/${testUser._id.toString()}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", testUser._id.toString());
    expect(res.body).toHaveProperty("email", "john@example.com");
    expect(res.body).toHaveProperty("user_level", "Client");
    expect(res.body.auth).toBe(false); // Check default value
  });

  test("should return 400 for an invalid user ID format", async () => {
    const res = await request(app).get("/invalid-id");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid user ID format." });
  });

  test("should return 404 if user does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/${fakeId.toString()}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "User not found." });
  });

  test("should return 500 if an unexpected error occurs", async () => {
    jest.spyOn(User, "findById").mockRejectedValueOnce(new Error("Database error"));
    const res = await request(app).get(`/${testUser._id.toString()}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "An error occurred while fetching the user." });
  });

  test("should not allow an invalid user_level", async () => {
    const invalidUser = new User({
      name: "Invalid",
      surname: "User",
      email: "invalid@example.com",
      password: "password",
      user_level: "UnknownRole", // Invalid value
    });

    let error;
    try {
      await invalidUser.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.user_level).toBeDefined();
  });
});

/*
describe("PUT /users/:id", () => {
  let testUser;
  let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzNmNDljN2FiNDJhNjQ3YmQzNmQ3NjYiLCJlbWFpbCI6IkpvYW9WaWN0b3IzMUBhZG1pbi5jb20iLCJhdXRoIjoidHJ1ZSIsImlhdCI6MTczODg0MDY1OCwiZXhwIjoxNzM4OTI3MDU4fQ.MxGr-C44D9EsUam0y3EjdhXNUssGUl-_w-dsqFDcgac"; // Mock token for tokenChecker middleware

  beforeAll(async () => {

    // Create a test user
    testUser = await User.create({
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      password: "securepassword",
      user_level: "Client",
      auth: false,
    });
  });

  test("should update user successfully and return 200", async () => {
    const res = await request(app)
      .put(`/${testUser._id.toString()}`)
      .set("token", `${authToken}`) // Simulate token
      .send({ updateFields: { name: "Updated Name" } });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User updated successfully");

    // Verify the user is updated in the database
    const updatedUser = await User.findById(testUser._id);
    expect(updatedUser.name).toBe("Updated Name");
  });

  test("should return 400 if no update fields are provided", async () => {
    const res = await request(app)
      .put(`/${testUser._id.toString()}`)
      .set("token", `${authToken}`)
      .send({ updateFields: {} });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "No fields to update provided");
  });

  test("should return 404 if user is not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/${fakeId.toString()}`)
      .set("token", `${authToken}`)
      .send({ updateFields: { name: "Doesn't Exist" } });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "No user found with the provided ID");
  });
});*/