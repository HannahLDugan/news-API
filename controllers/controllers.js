
const { selectTopics, selectEndpoints, selectArticlesId, selectAllArticles, selectAllComments, addComment, updateVotes, removeComment, selectUsers } = require("../models/models")

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
	const { topic } = req.query;
	selectAllArticles(topic)
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

exports.patchVotes = (req, res, next) => {
	const { article_id } = req.params;
	const { inc_votes } = req.body;
	selectArticlesId(article_id).then(() => {
	return updateVotes(article_id, inc_votes) 
  })
	.then((article) => {
		console.log(article)
	res.status(200).send({article});
	})
	.catch((err) => {
		next(err);
	})
}

exports.deleteComment = (req, res, next) => {
	const { comment_id } = req.params;
	removeComment(comment_id)
	.then(() => {
		res.status(204).send();
	  })
	  .catch((err) => {
		next(err);
	  });
};
  
exports.getUsers = (req, res, next) => {
	selectUsers()
	.then((users) => {
		res.status(200).send({users})
	})
	.catch((err) => {
		next(err);
	  });
	}
// exports.getUserById(req, res, next) {
// 	fetchUserById(req, res, next) 
// 		.then((user) => {
// 			res.status(200).send({ user: user });
// 		})
// 		.catch((err) => {
// 			next(err);
// 		})
// 	}




// 	console.log(comment_id)
// 	removeComment(comment_id)
// 	.then((exists) => {
// 		if (!exists) {
// 		  return Promise.reject({ status: 400, msg: "invalid id" });
// 		}
// 		return deleteComment(comment_id);
// 	  })
// 	  .then((result) => {
// 		res.status(204).send(result);
// 	  })
// 	  .catch((error) => {
// 		next(error);
// 	  });
//   };




// 	.then((deleteComments) => {
// 		res.status(204).send({ deleteComments });
// 	})
// 	.catch((err) => {
// 		next(err);
// 	});
// }