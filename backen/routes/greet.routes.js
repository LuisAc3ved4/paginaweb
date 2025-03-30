const { saludarController } = require("../controller/greet.controller");
const { ProductController } = require("../controller/products.controller");
const router = require("express").Router();


router.get("/", saludarController)
router.get("/saludo-2",saludarController)


module.exports = router