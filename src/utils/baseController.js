class BaseController {
    success(res, data = [], message = 'success', httpStatus = 200) {
      res.status(httpStatus).send({
        message,
        data,
      });
    }
  
    error(res, error, message="sorry an error occured") {
      console.log(error)
      res.status(error.code || 400).json({
        status: 'error',
        message: message,
      });
    }
  }
  
  module.exports = new BaseController();
  