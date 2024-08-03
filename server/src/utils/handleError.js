export const errorNotFound = (req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
};
export const errorCommon = (err, req, res, next) => {
	return res.status(err.status || 500).json({
		message: err.message,
	});
};
