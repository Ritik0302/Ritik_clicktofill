const addTimestampMiddleware = (req, res, next) => {
    req.body.timestamp = new Date().toISOString();
    next();
  };
  
  const addUidMiddleware = (req, res, next) => {
    const email = req.body.email;
    const uID = email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);
    req.body.uid = uID;
    req.body.employeeId = uID;
    next();
  };
  
  module.exports = { addTimestampMiddleware, addUidMiddleware };
  