const express = require('express');
//para enviar eventos para os demais microsserviços
const axios = require('axios');

const app = express();
app.use(express.json());

const eventos = [];

app.post('/eventos', (req, res) => {
    const evento = req.body;
    console.log("MedicamentoCriado");
    eventos.push(evento)
    axios.post("http://localhost:4000/eventos", eventos)
    res.status(200).send({msg: 'ok'});
});

app.put('/eventos', (req, res) => {
    const evento = req.body;
    console.log("MedicamentoAtualizado");
    for(i = 0; i < eventos.length; i++){
        if(eventos[i].id === evento.id){
            eventos[i] = evento;
        }
    }
    axios.post("http://localhost:4000/eventos", eventos);
    res.status(200).send({msg: 'ok'})
});

app.delete('/eventos/:id', (req, res) => {
    eventos.pop(req.body);
    console.log("MedicamentoDeletado");
    axios.post("http://localhost:4000/eventos", eventos);
    res.status(200).send({msg: 'ok'})
})

app.get("/eventos", (req, res) =>{
    res.send(eventos);
})

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000');
})