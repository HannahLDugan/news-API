//const db = require("../db/data/test-data/topics");
const app = require("../app");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");
const { createTestScheduler } = require("jest");
require('jest-sorted')

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/topics", () => {
	test("respond with STATUS 200.", () => {
		return request(app)
			.get("/api/topic")
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
	test("GET 200: Responds with an article object with the nececssary properties for article_id", () => {
		return request(app)
		.get("/api/articles/1")
		.expect(200)
		.then(({body}) => {
			const article = body.article;
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
		.get("/api/articles/9999")
		.expect(404)
		.then((response) => {
			expect(response.body.msg).toEqual("not found");
		});
	});
});

	describe("GET /api/articles", () => {
		test("STATUS 200: responds with status code 200, get all articles", () => {
			return request(app)
			.get("/api/articles")
			.expect(200)
			});
	test("status 200: Responds with an articles array of article objects, each of which should have the following properties", () => {
		return request(app)
		.get("/api/articles")
		.expect(200)
			.then(({body}) => {
			const articles = body.articles.rows;
			articles.forEach((article) => {
			expect(article).toMatchObject({
				article_id: expect.any(Number),
				author: expect.any(String),
				title: expect.any(String),
				body: expect.any(String),
				created_at: expect.any(String),
				votes: expect.any(Number),
				article_img_url: expect.any(String),
				comment_count: expect.any(String)
			});
		});
	});
	});
	test("STATUS 200: articles should be sorted by date in descending order.", () => {
		return request(app)
		.get("/api/articles")
		.expect(200)
		.then((response) => {
		//	console.log(response)
		expect(response.body.articles.rows).toBeSortedBy('created_at', {descending : true})
		});
		});
});
	
//task 6 
describe("GET /api/articles/:article_id/comments", () => {
	test("respond with STATUS 200.", () => {
		return request(app)
			.get("/api/articles/1/comments")
			.expect(200)
		});
		test("STATUS 200: should return an array of comments for the given article ID with the correct properties.", () => {
			return request(app)
			.get("/api/articles/1/comments")
			.expect(200)
			.then(({body}) => {
				const { comments } = body;
			expect(comments).toHaveLength(11)
			comments.forEach((comment) => {
				expect(comment).toMatchObject({
					comment_id: expect.any(Number),
					votes: expect.any(Number),
					created_at: expect.any(String),
					author: expect.any(String),
					body: expect.any(String),
					article_id: expect.any(Number)
				});
			});
			});
		  });
		test("STATUS 200: respond with an empty array if article has nothing assiciated with it", () => {
			return request(app)
			.get("/api/articles/7/comments")
			.expect(200)
			.then((response) => {
			expect(response.body.comments).toHaveLength(0);
			})
		});
		test("STATUS 200: comments should be sorted by date in descending order.", () => {
				return request(app)
				.get("/api/articles/1/comments")
				.expect(200)
				.then(({body}) => {
				const { comments } = body;
				expect(comments).toBeSortedBy('created_at', {descending : true})
				});
				});
		test("STATUS 400: respond with 400 error if there is an invalid article id.", () => {
				return request(app)
				.get("/api/articles/idonotexist/comments")
				.expect(400)
				.then((response) => {
				expect(response.body.msg).toEqual("invalid id")
				})
				});
		test("STATUS 404: respond with 404 if there is a non-existent article_id.", () => {
				return request(app)
				.get("/api/articles/9999/comments")
				.expect(404)
				.then((response) => {
					expect(response.body.msg).toEqual("not found");
				});
			});
		});

	//task 7 TDD

	describe("POST /api/articles/:article_id/comments", () => {
		test("respond with STATUS 20 and will return the comment.", () => {
			return request(app)
				.post("/api/articles/1/comments")
				.send({
					username: "rogersop",
					body: "10/10 article",
				})
				.expect(201)
				.then(response => {
				expect(response.body).toHaveProperty('comment')
				expect(response.body.comment).toHaveProperty('body', '10/10 article')
				expect(response.body.comment).toHaveProperty('author', 'rogersop')
				expect(response.body.comment.article_id).toBe(1)
				expect(response.body.comment.comment_id).toBe(19)
				})
		});
		test("2.Status code 201. Will add another property to object sent and is ignored.", () => {
			return request(app)
			.post("/api/articles/1/comments")
			.send({
				username: "rogersop",
				body: "10/10 article",
				ingnoredProperty: "ignore"
			})
			.expect(201)
			.then(({ body }) => {
				expect(body).not.toHaveProperty('ignoredProperty');
			})
		});
		test("3. STATUS 400: error if passed an invalid article id", () => {
			return request(app)
			.post("/api/articles/dontexist/comments")
			.send({
				username: "rogersop",
				body: "Good article",
			})
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe("invalid id")
			})
		});
		test("4. STATUS 400: should return 400 if there is an incomplete username or body", () => {
			return request(app)
			.post("/api/articles/1/comments")
			.send({
				username: "rogersop",
			})
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe("invalid request")
			})
		});
		test("5. STATUS 404: username does not exist", () => {
			return request(app)
			.post("/api/articles/1/comments")
			.send({
				username: "hannahdugan",
				body: "good article",
			})
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe("not found");
			});
		});
		test("6. 404. valid article id that doesn't exist", () => {
			const body = {
				username: "rogersop",
				body: "test to add to invalid article",
			}
			return request(app)
			.post("/api/articles/999/comments")
			.send(body)
			.expect(404)
			.then(({body}) => {
				expect(body.msg).toEqual("not found");
			})
		});
	});	

//task 8 TDD

describe("PATCH: ", () => {
	test("STATUS 200: should return a 200 status code", () => {
		// jest.setTimeout(10000)
		return request(app)
			.patch("/api/articles/1/")
			.send({ inc_votes: 1 })
			.expect(200)
		   .then(({ body }) => {
			expect(body.article).toMatchObject({
				article_id: 1,
				author: expect.any(String),
				title: expect.any(String),
				body: expect.any(String),
				created_at: expect.any(String),
				votes: 101,
				article_img_url: expect.any(String),
			});
			})
});
	test("STATUS 404: should return status 404 when passed an article id that doesn't exist", () =>{
		return request(app)
		.patch("/api/articles/40")
		.expect(404)
		.then((response) => {
		expect(response.body.msg).toBe("not found");
		});
	});
	test("STATUS 400: should return 400 status code when there is an incomplete body. ", () => {
		return request(app)
		.patch("/api/articles/incomplete")
		.expect(400)
		.then((response) => {
		expect(response.body.msg).toBe("invalid id");
		})
	});
	test("STATUS 400: bad request when passed an invalid article id", () => {
		return request(app)
		.patch("/api/articles/randomid")
		.send({inc_votes: 1})
		.expect(400)
		.then((response) => {
			expect(response.body.msg).toBe("invalid id");
		})
	});
});

// task 9 - DELETE /api/comments/:comment_id

describe("DELETE api/comments/:comment_id", () => {
	test("status 204: No content, delete comment.", () => {
		return request(app)
			.delete("/api/comments/1")
			.expect(204)
	});
	test("STATUS 404: should return 404 status code when there is no comment. ", () => {
		return request(app)
		.delete("/api/comments/10000")
		.expect(404)
		.then((response) => {
			expect(response.body.msg).toBe("invalid id");
		});
		})
	test("STATUS 400: should return status 400 when there is an invalid id", () =>{
		return request(app)
		.delete("/api/comments/abcdefg")
		.expect(400)
		.then((response) => {
			expect(response.body.msg).toBe("invalid id");
		});
	});
});


describe("GET /api/users", () => {
	test("Should return 200 status code", () => {
		return request(app)
		.get("/api/users")
		.expect(200)
	});
	test("should return an array of all of the user objects with the correct properties", () => {
	return request(app)
	.get("/api/users")
	.expect(200)
	.then((response) => {
		expect(response.body.users.length).toBe(4)
		expect(Array.isArray(response.body.users)).toBe(true)
		response.body.users.forEach((user) => {
			expect(typeof user.username).toBe("string");
			expect(typeof user.name).toBe("string");
			expect(typeof user.avatar_url).toBe("string");
		});
	});
	});
	test("STATUS 404: should return 404 status code when there is no comment. ", () => {
		return request(app)
		.delete("/api/users/10000")
		.expect(404)
		.then((response) => {
			expect(response.body.msg).toBe("not found");
		});
		})
	// test("STATUS 400: should return status 400 when there is an invalid id", () =>{
	// 	return request(app)
	// 	.delete("/api/users/abcdfeg")
	// 	.expect(400)
	// 	.then((response) => {
	// 		expect(response.body.msg).toBe("invalid id");
	// 	});
	// });
});

// task 11 - GET /api/articles (topic query)

describe("GET /api/articles (topic query)", () => {
	test("returns status code 200 and an array of articles filtered by topic.", () => {
		return request(app)
			.get("/api/articles?topic=cats")
			.expect(200)
			.then((response) => {
				const { body } = response;
				expect(Array.isArray(body.articles)).toBe(true);
				expect(body.articles).toHaveLength(1)
				body.articles.forEach((article) => {
					expect(article.topic).toEqual("cats")
				});
			});
		});
	test("STATUS 200: return an empty array when requested a valid topic with no existing articles.", () =>{
			return request(app)
			.get("/api/articles?topic=paper")
			.expect(200)
			.then((response) => {
				const { body } = response;
				expect(Array.isArray(body.articles)).toBe(true);
				//console.log(body.articles)
				expect(body.articles).toStrictEqual([])
			})
			});
	test("STATUS 400: should return status 400 when there is an invalid topic", () =>{
			return request(app)
			.get("/api/articles?topic=invalidtopics")
			.expect(400)
			.then((response) => {
				const { body } = response;
				expect(body.msg).toBe("not found");
			})
		});
	});

// task 12 - GET /api/articles/:article_id (comment_count)

describe("GET /api/articles/:article_id (comment_count)", () => {
	test("Status 200: Returns status code 200 and includes comment count in the response", () => {
		return request(app)
		.get("/api/articles/1?comment_count")
		.expect(200)
		.then((response) => {
			const articles = response.body;
			//console.log(response.body)
			expect(articles).toMatchObject({
				// article: {
				// article: expect.any(Object),
				// article_id: expect.any(Number),
				// title: expect.any(String),
				// topic: expect.any(String),
				// author: expect.any(String),
				// body: expect.any(String),
				// created_at: expect.any(String),
				// votes: expect.any(Number),
				// article_img_url: expect.any(String),
				// comment_count: expect.any(String),
				// },
				article: {
				article_id: 1,
				article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
				author: "butter_bridge",
				body: "I find this existence challenging",
				comment_count: "11",
				created_at: "2020-07-09T20:11:00.000Z",
				title: "Living in the shadow of a great man",
				topic: "mitch",
				votes: 100,
				},
			});
		});
	});
	test("STATUS 400: should return status 400 when there is an invalid comment", () =>{
		return request(app)
		.get("/api/articles/idonotexist/comments")
		.expect(400)
		.then((response) => {
			const { body } = response;
			expect(body.msg).toBe("invalid id");
		})
	});
	test("STATUS 404: should return status 404 when there is an invalid comment", () =>{
		return request(app)
		.get("/api/articles/1000/comments")
		.expect(404)
		.then((response) => {
			const { body } = response;
			expect(body.msg).toBe("not found");
		})
});
});


