const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const Enums = require("../models/Enums");

const jwt = require('jsonwebtoken');
var authToken = jwt.sign( {email: 'John@mail.com'}, process.env.SUPER_SECRET, {expiresIn: 86400} );

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});


describe("GET /users/:id", () => {
  let testUser;

  beforeAll(async () => {
    testUser = await User.create({
      name: "Matteo",
      surname: "Lunardon",
      email: "matteo.lunardon@unitn.it",
      password: "SuperSecretPassword",
      user_level: "Client",
      auth: false,
    });
  });

  test("should return 200 and user data for a valid user ID", async () => {
    const res = await request(app).get(`/api/users/${testUser._id.toString()}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", testUser._id.toString());
    expect(res.body).toHaveProperty("email", "matteo.lunardon@unitn.it");
    expect(res.body).toHaveProperty("user_level", "Client");
    expect(res.body.auth).toBe(false);
  });

  test("should return 400 for an invalid user ID format", async () => {
    const res = await request(app).get("/api/users/invalid-id");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid user ID format." });
  });

  test("should return 404 if user does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/users/${fakeId.toString()}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "User not found." });
  });

  test("should not allow an invalid user_level", async () => {
    const invalidUser = new User({
      name: "Invalid",
      surname: "User",
      email: "invalid@example.com",
      password: "password",
      user_level: "UnknownRole", // user_level has to be Admin or Client.
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


describe("PUT /users/:id", () => {
  let testUser;

  beforeAll(async () => {
    testUser = await User.create({
      name: "Joao Victor",
      surname: "Costa Vaccari",
      email: "joao@unitn.com",
      password: "RandomPassword2#",
      user_level: "Client",
      auth: false,
    });
  });

  test("should update user successfully and return 200", async () => {
    const res = await request(app)
      .put(`/api/users/${testUser._id.toString()}`)
      .set("token", `${authToken}`) 
      .send({ updateFields: { name: "Updated Name" } });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User updated successfully");

    const updatedUser = await User.findById(testUser._id);
    expect(updatedUser.name).toBe("Updated Name");
  });

  test("should return 400 if no update fields are provided", async () => {
    const res = await request(app)
      .put(`/api/users/${testUser._id.toString()}`)
      .set("token", `${authToken}`)
      .send({ updateFields: {} });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "No fields to update provided");
  });

  test("should return 404 if user is not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/users/${fakeId.toString()}`)
      .set("token", `${authToken}`)
      .send({ updateFields: { name: "Doesn't Exist" } });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "No user found with the provided ID");
  });
});

describe("POST /users", () => {
  
  test("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Test",
        surname: "User",
        email: "joaoTEST1@example.com",
        password: "securePassword4-",
        user_level: "Client",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
    expect(res.body.user).toHaveProperty("_id");
  });

  test("should return 409 if email already exists", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Test",
        surname: "User",
        email: "joaoTEST1@example.com",
        password: "securePassword8*",
        user_level: "Client",
      });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message", "There is an existing account!");
  });

  test("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        email: "newuser@example.com",
        password: "Password123#",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "All fields are required.");
  });

  test("should return 400 if user_level is invalid", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Joao",
        surname: "Vaccari",
        email: "joaoTEST@example.com",
        password: "pAssword123!",
        user_level: "InvalidLevel",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      `Invalid user_level. Allowed values: ${Enums.user_level.enum.join(", ")}.`
    );
  });

});

describe("DELETE /users/:id", () => {
  let testUser, adminUser;

  beforeAll(async () => {
    adminUser = await User.create({
      name: "Admin",
      surname: "User",
      email: "admin@example.com",
      password: "passwordSecret2%",
      user_level: "Admin",
    });

    testUser = await User.create({
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      password: "passwordSecret8!",
      user_level: "Client",
    });
  });

  test("should delete user successfully and return 200", async () => {
    const res = await request(app)
      .delete(`/api/users/${testUser._id}`)
      .set("token", `${authToken}`)
      .query({ adminId: adminUser._id.toString() });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User successfully deleted.");
  });
});

describe("PUT /users/changePassword/:id", () => {
  let testUser;

  beforeAll(async () => {
    testUser = await User.create({
      name: "Davide",
      surname: "Benetti",
      email: "Davide@unitn.it",
      password: "passwordDavide9*",
      user_level: "Client",
    });
  });

  test("should update password successfully", async () => {
    const res = await request(app)
      .put(`/api/users/changePassword/${testUser._id}`)
      .set("token", `${authToken}`)
      .send({ password: "NewPassword5#" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Password successfully updated.");
  });
});

describe("PUT /users/changeAuth/:id", () => {
  let testUser, adminUser;

  beforeAll(async () => {
    adminUser = await User.create({
      name: "Matteo",
      surname: "Lunardon",
      email: "matteo.lunardon@unitn.it",
      password: "passwordAdmin31*",
      user_level: "Admin",
      auth: true,
    });

    testUser = await User.create({
      name: "Joao Victor",
      surname: "Costa Vaccari",
      email: "joao.costavacari@unitn.it",
      password: "passwordClient72!",
      user_level: "Client",
      auth: false,
    });
  });

  test("should update auth status successfully", async () => {
    const res = await request(app)
      .put(`/api/users/changeAuth/${testUser._id}`)
      .set("token", `${authToken}`)
      .query({ adminId: adminUser._id.toString() });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User authorization status successfully updated.");
  });
});