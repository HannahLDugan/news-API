# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).

NC News
Welcome to NC News! This is a full-stack news platform where users can read, vote on, and discuss articles on various topics. You can visit the hosted version of NC News here.

Summary
NC News provides a user-friendly interface for browsing and interacting with a wide range of articles. Users can explore articles by topic, read comments, post their own comments, and vote on both articles and comments.

Getting Started
To get started with NC News on your local machine, follow these steps:

Clone the Repository.

Install Dependencies below:
Copy code
cd nc-news
npm install

Seed Local Database:
Copy code
npm run seed

Create .env Files:
You need to create two .env files in the root directory of the project:
.env.development for development environment variables.
.env.test for test environment variables.

Start the Server:
sql
Copy code
npm start

Endpoints included:

GET /api: Get all available endpoints.
GET /api/topics: Get all topics.
GET /api/articles/:article_id: Get a specific article by ID.
GET /api/articles: Get all articles.
GET /api/articles/:article_id/comments: Get comments for a specific article.
POST /api/articles/:article_id/comments: Post a new comment to a specific article.
PATCH /api/articles/:article_id: Update votes for a specific article.
DELETE /api/comments/:comment_id: Delete a comment by ID.
GET /api/users: Get all users.

Requirements:

To run NC News locally, you'll need:

Node.js
PostgreSQL
