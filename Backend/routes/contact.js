const express  = require('express');
const router = express.Router();

const {contactUs}  = require("../controllers/ContactUs.js")

router.post("/contact",contactUs);

module.exports = router;