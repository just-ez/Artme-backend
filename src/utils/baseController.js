class BaseController {
    success(res, data = [], message , httpStatus = 200) {
      res.status(httpStatus).send({
        message,
        data,
      });
    }
  
    error(res, error,) {        
      res.status(error.code || 400).json({
        message: error.message,
      });
    }
  }
  
  module.exports = new BaseController();
  