
const { selectTopics, selectEndpoints, selectArticlesId, selectAllArticles, selectAllComments, addComment } = require("../models/models")

exports.getTopics = (req, res, next) => {
		selectTopics().then((topics) => {
			res.status(200).send({ topics });
		})
		.catch((err) => {
			next(err);
		});
	};

exports.getEndpoints = (req, res, next) => {
	selectEndpoints()
	.then((endpoints) => {
		res.status(200).send({ endpoints });
	})
	.catch((err) => {
		next(err);
	});		
};

exports.getArticlesId = (req, res, next) => {
	const { article_id } = req.params
	selectArticlesId(article_id)
	.then((article) => {
		res.status(200).send({article});
	})
	.catch((next))
};

exports.getAllArticles = (req, res, next) => {
	selectAllArticles()
	.then((articles) => {
		res.status(200).send({ articles });
	})
	.catch((err) => {
		next(err);
	});		
};


exports.getComments = (req, res, next) => {
	const { article_id } = req.params;
	selectArticlesId(article_id).then(() => {
		return selectAllComments(article_id)
	})
	.then((comments) => {
		res.status(200).send({ comments });
	})
	.catch((err) => {
		next(err);
	});
}

exports.postComment = (req, res, next) => {
	const { article_id } = req.params;
	const { username, body } = req.body;
	addComment(article_id, username, body)
	.then((comment) => {
	res.status(201).send({comment});
	})
	.catch((err) => {
		next(err);
	});		
}

