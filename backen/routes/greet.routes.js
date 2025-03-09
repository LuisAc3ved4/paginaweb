const { saludarController} = require("../controller/greet.controller");

const router = require("express").Router();
//const routerb = require("express").Router();

router.get("/", saludarController);      //*Endpoints
//router.get("/bye", despedirController);



//funcion callback
module.exports = router
//module.exports = routerb


//const {despedirController} = require("../controller/greet.controller");
//const routerb = require("express").Router();
//routerb.get("/",despedirController);
//module.exports = routerb