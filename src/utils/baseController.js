class BaseController {
    success(res, data = [], message , httpStatus = 200) {
      res.status(httpStatus).send({
        message,
        data,
      });
    }
  
    error(res, error, message) {        
      res.status(error || 400).json({
        message: message,
      });
    }
  }
  
  module.exports = new BaseController();
  