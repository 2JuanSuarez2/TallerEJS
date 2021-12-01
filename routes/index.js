const express= require('express');
const { seguros } = require('../resources/files/seguro');
const router = express.Router();

const colombia = require('./../resources/files/colombia');
const seguro = require('./../resources/files/seguro');

let insurance = []

router.get('/',(req,res)=>{
    res.render("index",{insurance:insurance,title:"Página de Inicio"});
});

router.get('/insert',(req, res)=>{
    res.render('insert',{title:"Insertar Seguro",
        departments:colombia.departments,
        towns:colombia.towns,
        seguros:seguro.seguros });
});

router.post('/insert',(req,res)=>{
    const{insuranc, name, lastName, gender, dpto, town, email, phone } = req.body;
    const insurancAux = seguro.seguros.find( record => record.code == insuranc ).name; 
    const dptoAux = colombia.departments.find( record => record.code == dpto ).name;
    const townAux = colombia.towns.find( record => record.code == town ).name;
    const city = townAux.concat( '-', dptoAux );
    const genAux = gender == 'F' ? "Femenino" : "Masculino";
    let newReg = {insurancAux, lastName, name, genAux, city, email, phone  };
    insurance.push(newReg);
    res.redirect('/');
});

router.get('/about',(req,res)=>{
   res.render('about',{title:"Sobre Nosotros"});
});

module.exports = router;
