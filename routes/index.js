var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("pages/index", { title: "Academic Records Verifier" });
});

/* GET admin-dashboard page. */
router.get("/admin/dashboard", function(req, res, next) {
  res.render("pages/admin-dashboard", { title: "Admin Dashboard" });
});

/* GET verifier page. */
router.get("/verifier", function(req, res, next) {
  res.render("pages/verifier", { title: "Verifier" });
});

module.exports = router;
