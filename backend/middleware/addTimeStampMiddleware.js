const addTimestampMiddleware = (req, res, next) => {
    req.body.timestamp = new Date().toISOString();
    next();
  };



  module.exports=addTimestampMiddleware