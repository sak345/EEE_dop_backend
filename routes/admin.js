const express = require("express");
const router = express.Router();

const {protect, roles} = require("../middleware/auth");
const {getall, getone, create, updateuser, getalluser, getoneuser, deleteuser, downloadPapers} = require("../controllers/adminFunc");

router.route("/paper/getall").get(protect, roles, getall);
router.route("/paper/getone").get(protect, roles, getone);
router.route("/paper/download").get(protect, roles, downloadPapers);
router.route("/user/create").post(protect, roles, create);
router.route("/user/update").patch(protect, roles, updateuser);
router.route("/user/getall").get(protect, roles, getalluser);
router.route("/user/getone").get(protect, roles, getoneuser);
router.route("/user/delete").delete(protect, roles, deleteuser);






module.exports = router; 