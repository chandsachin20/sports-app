function verifyToken(req, res, next) {
  const bearerHeader = req.header("user");
  if (typeof bearerHeader !== undefined) {
    const bearerToken = bearerHeader;
    req.token = bearerToken;
    next();
  }
  else{
      res.sendStatus(403);
  }
}

module.exports = verifyToken