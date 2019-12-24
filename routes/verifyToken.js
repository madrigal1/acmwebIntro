const jwt = require("jsonwebtoken");

module .exports = function (req,res,next) {
  const token = req.header('auth-token');
  if(!token) return res.status(404).send("Access denied");
  try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRECT);
        req.user = verified;
        next();
    }catch(e) {
        console.log(e);
       res.status(404).send("invalid token");
  }
}
