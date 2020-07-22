var express = require("express");
var router = express.Router();
var { auth, resetToken } = require("../helpers/auth");

const { workshopOnlineController } = require("../controllers");

router.get("/", (req, res) => {
  res.status(200).send(`<p>Workshop Online Router</p>`);
});
router.post("/uploadvideo", auth, workshopOnlineController.uploadVideoByAdmin);
router.post("/webHooksVideo", workshopOnlineController.webHooksVideo);

module.exports = router;
