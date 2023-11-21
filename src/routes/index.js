const { Router } = require('express');
const dogsRouter = require("./dogsRouter")
const temperamentsRouter = require("./temperamentsRouter")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentsRouter);

router.get ("/",(req, res)=>{
    console.log("msj de prueba del back")
    res.status(200).json("todo OK");

})

module.exports = router;
