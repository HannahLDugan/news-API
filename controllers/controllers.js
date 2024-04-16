
const { selectTopics, selectEndpoints } = require("../models/models")

exports.getTopics = (req, res, next) => {
		selectTopics().then((topics) => {
			res.status(200).send({ topics });
		})
		.catch((err) => {
			next(err);
		});
	};

exports.getEndpoints = (req, res, next) => {
	selectEndpoints().then((endpoints) => {
		res.status(200).send({ endpoints });
	})
	.catch((err) => {
		next(err);
	});		
};



