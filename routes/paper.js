const express = require("express");
const router = express.Router();

const {create, deletePaper, getone, getall, updatepaper} = require("../controllers/Paper");
const {protect,roles} =  require('../middleware/auth');

router.route("/create").post(protect, create);
router.route("/delete").delete(protect, deletePaper);
router.route("/getone").get(protect, getone);
router.route("/getall").get(protect,getall);
router.route("/update").patch(protect, updatepaper);




module.exports =  router;