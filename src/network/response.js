const status2 = {
  200: "Done",
  201: "Created",
  401: "Not authirized",
  404: "Not found",
  500: "Error sever",
};

const success = (req, res, statusCode, msg, body) => {
  res.status(statusCode).json({
    ok: true,
    message: msg,
    statusMessage: status2[statusCode],
    body,
  });
};

const error = (req, res, statusCode, msg, body) => {
  res.status(statusCode).json({
    ok: false,
    message: msg,
    statusMessage: status2[statusCode],
    body,
  });
};

module.exports = {
  success,
  error,
};
