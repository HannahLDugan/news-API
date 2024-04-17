//const db = require("../db/data/test-data/topics");
const app = require("../app");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

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

describe("GET /api", () => {
	test("STATUS 200: Responds with an object describing all the available endpoints on my API.", () => {
		return request(app)
			.get("/api")
			.expect(200)
			.then((endpoints) => {
				expect(endpoints.body).toBeInstanceOf(Object);
			})
	});
});

describe("GET /api/articles/:article_id", () => {
	test("STATUS 200: responds with status code 200", () => {
		return request(app)
		.get("/api/articles/1")
		.expect(200)
		});
	});
	test("GET 200: Responds with an article object with the nececssary properties for article_id", () => {
		return request(app)
		.get("/api/articles/1")
		.expect(200)
		.then(({body}) => {
			const article = body.article;
		//	console.log(body.article)
			expect(article.article_id).toBe(1)
			expect(article).toMatchObject({
				author: expect.any(String),
				title: expect.any(String),
				body: expect.any(String),
				created_at: expect.any(String),
				votes: expect.any(Number),
				article_img_url: expect.any(String),
			});
			});
		});
	test("GET 404: Responds with an error when articles_id does not exist", () => {
		return request(app)
		.get("/api/articles/99")
		.expect(404)
		.then((response) => {
			console.log(response.body)
			expect(response.body).toEqual({});
		});
	});


//task 5
//need to use join and count to add comment count 
//task 5 should come back with an array of objects
//key of articles & value be an array
//can test for article length equals
//does each object have a comment count object
//aggregate function look at notes
//can query comments table
//left join to be checked by test 
//test for sort by query as needs to be in desc order
//test for sad path
