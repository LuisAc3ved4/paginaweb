const {saludar} = require("../service/greet.service");

const saludarController = (req,res)=>{
    const mensajSaludo = saludar();
    res.json(mensajSaludo);
}

module.exports = {saludarController}