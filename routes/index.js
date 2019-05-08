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

/* GET student page. */
router.get("/student/:studentNo", function(req, res, next) {
  res.render("pages/student", { title: req.params.studentNo });
});

module.exports = router;
