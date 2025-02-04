const {HttpError} = require("../helpers/index");

const validateBody = scheme => {
    const func = (req, res, next)=> {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw HttpError(400, "missing fields");
      }
        const { error } = scheme.validate(req.body);
        if (error) {
            next(HttpError(400, error.message));
        }
        next()
    }

    return func;
}

const validateBodyStatus = scheme => {
  const func = (req, res, next)=> {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing field favorite");
    }
      const { error } = scheme.validate(req.body);
      if (error) {
          next(HttpError(400, error.message));
      }
      next()
  }

  return func;
}

module.exports = {validateBody, validateBodyStatus};

