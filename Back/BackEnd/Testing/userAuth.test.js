const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/authentication", () => {
    let testUser;

     beforeAll(async () => {
        testUser = await User.create({
          name: "AAAAA",
          surname: "BBBBBBB",
          email: "aaa.bbb@unitn.it",
          password: "SuperSecretPassword",
          user_level: "Client",
          auth: false,
        });
      });

    test("should authenticate user and return token", async () => {

      //jest.spyOn(User, "findOne").mockResolvedValue(testUser);
  
      const res = await request(app)
        .post("/api/users/authentication")
        .send({ email: testUser.email, password: testUser.password });
  
      expect(res.status).toBe(200);
      //expect(res.body).toHaveProperty("success", true);
      //expect(res.body).toHaveProperty("token", testUser.token);
      //expect(res.body).toHaveProperty("userId", testUser._id.toString());
    });
  
    test("should return 401 for invalid credentials", async () => {
      //jest.spyOn(User, "findOne").mockResolvedValue(null);
  
      const res = await request(app)
        .post("/api/users/authentication")
        .send({ email: "wrong@example.com", password: "wrongpass" });
  
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("success", false);
    });
  });