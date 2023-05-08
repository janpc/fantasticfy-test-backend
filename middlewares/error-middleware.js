function errorMiddleware(err, req, res, next) {
  console.error(err);
  if (req.headersSent) {
    return next(err);
  }

  const {code, message} = err;
  

  if (code) {
    res.status(code).send({
      data: null,
      error: message,
    });
  }

  res.status(500).send({
    data: null,
    error: "Something went wrong",
  });
}

module.exports = {
  errorMiddleware,
};