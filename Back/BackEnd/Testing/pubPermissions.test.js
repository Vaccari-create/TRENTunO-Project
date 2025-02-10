const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const PubPermission = require("../models/PubPermission");
const User = require("../models/User");

const jwt = require('jsonwebtoken');
var authToken = jwt.sign( {email: 'John@mail.com'}, process.env.SUPER_SECRET, {expiresIn: 86400} );
let pubPermissionTest;
let testUser;

beforeAll(async () => {
    await PubPermission.deleteMany();

    testUser = await User.create({
          name: "Test",
          surname: "Pub",
          email: "test.pub@unitn.it",
          password: "SuperSecretPassword71*",
          user_level: "Client",
          auth: false,
        });
  
    pubPermissionTest = await PubPermission.create({
      user_id: testUser._id,
      Description: "Test publication request",
    });
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("PubPermission API", () => {
    /** GET /pubPermission */
    test("should fetch all publication requests", async () => {
      const res = await request(app).get("/api/pubPermissions?user_level=Admin");
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  
    test("should fetch publication requests for a specific user", async () => {
      const res = await request(app).get(`/api/pubPermissions?user_id=${testUser._id}&user_level=Admin`);
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty("user_id", testUser._id.toString());
    });
  
    test("should return 400 for invalid user_id format", async () => {
      const res = await request(app).get("/api/pubPermissions?user_id=invalidId&user_level=Admin");
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid user_id format.");
    });
  
    test("should return 404 if no requests are found", async () => {
      const res = await request(app).get(`/api/pubPermissions?user_id=${new mongoose.Types.ObjectId()}&user_level=Admin`);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No publication requests found.");
    });
  
    /** POST /pubPermission */
    test("should create a new publication request", async () => {
      const res = await request(app)
        .post("/api/pubPermissions")
        .set("token", `${authToken}`)
        .send({ user_id: testUser._id.toString(), Description: "New request" });
      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Publication request successfully created.");
      expect(res.body.request).toHaveProperty("_id");
    });
  
    test("should return 400 if user_id is missing or invalid", async () => {
      const res = await request(app)
        .post("/api/pubPermissions")
        .set("token", `${authToken}`)
        .send({ Description: "Missing user_id" });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid or missing user_id.");
    });
  
    test("should return 400 if description is missing", async () => {
      const res = await request(app)
        .post("/api/pubPermissions")
        .set("token", `${authToken}`)
        .send({ 
            user_id: testUser._id.toString()
        });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Description is required.");
    });
  
    /** DELETE /pubPermission/:id */
    test("should delete a publication request", async () => {
      const newRequest = await PubPermission.create({
        user_id: testUser._id.toString(),
        Description: "To be deleted",
      });
      const res = await request(app).delete(`/api/pubPermissions/${newRequest._id}?user_level=Admin`);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Publication request successfully deleted.");
    });
  
    test("should return 400 for invalid request ID format", async () => {
      const res = await request(app).delete("/api/pubPermissions/invalidId?user_level=Admin");
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid request ID format.");
    });
  
    test("should return 404 if the request is not found", async () => {
      const res = await request(app).delete(`/api/pubPermissions/${new mongoose.Types.ObjectId()}?user_level=Admin`);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Publication request not found.");
    });
  });
  