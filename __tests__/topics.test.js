//const db = require("../db/data/test-data/topics");
const app = require("../app");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const db = require("../db/connection")

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/topics", () => {
	test("respond with STATUS 200.", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
		});
	test("status 200: request should respond with an array of topic objects", () => {
		return request(app)
		.get("/api/topics")
		.expect(200)
		.then((topics) => {
			expect(topics.body).toBeInstanceOf(Object);
		});
	});	
	test("should return slug and description properties.", () => {
		return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
			const { topics } = body;
			topics.forEach((topic) => {
			  expect(typeof topic.slug).toBe("string");
			  expect(typeof topic.description).toBe("string");

		});
	});	
	});
});



	// .then((response) => {
	// 	expect(response.body.treasures.length).toBe(2);
	// 	response.body.treasures.forEach((treasure) => {
	// 		expect(treasure.colour).toBe("gold");
	// 	});
			// .then((response) => {
			// //	expect(response).toBeInstanceOf(Array);
			// 	expect(response.body.length).toBeGreaterThan(1);

    //an array of topic objects, each of which should have the following properties:slug / description
	//second test to test for slug and description find the right matcher
