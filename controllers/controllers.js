
const { selectTopics, selectEndpoints, selectArticlesId } = require("../models/models")

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
	.catch((err) => {
		next(err);
	});
};



