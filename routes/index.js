//this route can also be used for health check on cloud.
const router = new (require("restify-router")).Router();
router.get("", function(req, res, next) {
  res.json({ Message: "Welcome to Netuce API" });
  next();
});

module.exports = router;
