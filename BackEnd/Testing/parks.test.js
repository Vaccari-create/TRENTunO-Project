const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Parks = require("../models/Park");
const Users = require("../models/User");
const jwt = require('jsonwebtoken');
var authToken = jwt.sign( {email: 'John@mail.com'}, process.env.SUPER_SECRET, {expiresIn: 86400} );

let parkTest;
let adminTest;

const validAdminId = new mongoose.Types.ObjectId();
const validParkId = new mongoose.Types.ObjectId();

afterAll(async () => {
  await Users.deleteMany();
  await Parks.deleteMany();
  await mongoose.connection.close();
});

beforeAll(async () => {
    parkTest = await Parks.create({
      name: "Albere",
      x_coord: 1.2334,
      y_coord: 2.3555,
      rating: 5,
      description: "Best park",
      categories: ["Pet", "Sport"]
  });
    
      adminTest = await Users.create({
      name: "Joao Victor",
      surname: "Costa Vaccari",
      email: "joao.costavaccari@studenti.unitn.it",
      password: "securePassword31#",
      user_level: "Admin",
      auth: true
    });
});

describe("GET /api/parks", () => {
    test("should fetch all parks", async () => {
      const res = await request(app).get("/api/parks");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  
    test("should fetch park by park_id", async () => {
      const res = await request(app).get(`/api/parks/${parkTest._id}`);
      expect(res.status).toBe(200);
    });
  });

  describe("Parks API", () => {
    test("should create a new park", async () => {
      const res = await request(app)
        .post("/api/parks")
        .set("token", `${authToken}`)
        .query({ adminId: adminTest._id.toString() })
        .send({
          name: "Piazza Dante",
          x_coord: 40.785091,
          y_coord: -73.968285,
          rating: 5,
          description: "A large public park in Trento",
          categories: ["Sport", "Running"],
        });
  
      expect(res.status).toBe(201);
    });
  
    test("should return 400 if name is missing", async () => {
      const res = await request(app)
        .post("/api/parks")
        .set("token", `${authToken}`)
        .query({ adminId: adminTest._id.toString() })
        .send({
          x_coord: 40.785091,
          y_coord: -73.968285,
          rating: 5,
          description: "Missing name",
          categories: ["Sport"],
        });
  
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid or missing Name. It must be a non-empty string.");
    });
  
    test("should return 400 if x_coord is missing or invalid", async () => {
      const res = await request(app)
        .post("/api/parks")
        .set("token", `${authToken}`)
        .query({ adminId: adminTest._id })
        .send({
          name: "Invalid Park",
          y_coord: -73.968285,
          rating: 5,
          description: "Invalid x_coord",
          categories: ["Sport"],
        });
  
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid or missing x_coord. It must be a number.");
    });
  
    test("should return 400 if y_coord is missing or invalid", async () => {
      const res = await request(app)
        .post("/api/parks")
        .set("token", `${authToken}`)
        .query({ adminId: adminTest._id.toString() })
        .send({
          name: "Invalid Park",
          x_coord: 40.785091,
          rating: 5,
          description: "Invalid y_coord",
          categories: ["Sport"],
        });
  
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid or missing y_coord. It must be a number.");
    });
  
    test("should return 402 if rating is out of range", async () => {
      const res = await request(app)
        .post("/api/parks")
        .set("token", `${authToken}`)
        .query({ adminId: adminTest._id.toString() })
        .send({
          name: "Bad Rating Park",
          x_coord: 40.785091,
          y_coord: -73.968285,
          rating: 10,
          description: "Invalid rating",
          categories: ["Sport"],
        });
  
      expect(res.status).toBe(402);
      expect(res.body.message).toBe("Invalid or missing Rating. It must be a number between 1 and 5.");
    });
  
    test("should return 400 if description is missing", async () => {
      const res = await request(app)
        .post("/api/parks")
        .set("token", `${authToken}`)
        .query({ adminId: adminTest._id.toString() })
        .send({
          name: "No Description Park",
          x_coord: 40.785091,
          y_coord: -73.968285,
          rating: 4,
          categories: ["Sport"],
        });
  
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid or missing Description. It must be a non-empty string.");
    });
  
    test("should return 400 if categories are invalid", async () => {
      const res = await request(app)
        .post("/api/parks")
        .set("token", `${authToken}`)
        .query({ adminId: adminTest._id.toString() })
        .send({
          name: "Invalid Category Park",
          x_coord: 40.785091,
          y_coord: -73.968285,
          rating: 4,
          description: "Wrong category",
          categories: ["InvalidCategory"],
        });
  
      expect(res.status).toBe(400);
      expect(res.body.message).toContain("Invalid categories: InvalidCategory");
    });
  
    test("should return 403 if user is not an admin", async () => {
      const res = await request(app)
        .post("/api/parks")
        .set("token", `${authToken}`)
        .query({ adminId: new mongoose.Types.ObjectId().toString() }) // Assuming this is not an admin ID
        .send({
          name: "Unauthorized Park",
          x_coord: 40.785091,
          y_coord: -73.968285,
          rating: 4,
          description: "Only admins can create parks",
          categories: ["Sport"],
        });
  
      expect(res.status).toBe(403);
      expect(res.body.message).toBe("Only admins can create parks.");
    });  
  });