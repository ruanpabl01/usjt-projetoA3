const express = require('express');
//para enviar eventos para os demais microsserviços
const axios = require('axios');

const app= express();
app.use(express.json());

const eventos = [];

app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento);
    
    for(i = 0; i < eventos.length; i++){
        console.log(eventos[i])
    }
    res.status(200).send({msg: 'ok'});
});

app.get("/eventos", (req, res) =>{
    res.send(eventos);
})

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000');
})