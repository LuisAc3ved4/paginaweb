const {saludar} = require("../service/greet.service");

const saludarController = (req,res)=>{
    const mensajSaludo = saludar();
    res.json(mensajSaludo);
}

//const despedirController = (req,res)=>{
//    const mensajeAdios = despedir();
//    res.json(mensajeAdios);
//}


module.exports = {saludarController};