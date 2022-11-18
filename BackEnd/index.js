require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const axios = require('axios');
app.use(express.json());

//vamos substituir a configuração CORS manual, usando o pacote cors
app.use(cors());

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_HOST } =
  process.env;

const urlMongoDB = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.${MONGODB_HOST}.mongodb.net/?retryWrites=true&w=majority`
const Medicamento = require("./models/medicamento");
const medicamento = require("./models/medicamento");

mongoose
  .connect(urlMongoDB)
  .then((response) => {
    console.log("Conexão OK");
    // console.log(response)
  })
  .catch((err) => {
    console.log("Conexão NOK");
    console.log(err);
  });

//POST para cadastrar um medicamento novo (CREATE).
app.post('/medicamentos', async (req, res) => {
  
  const medicamento = new Medicamento({
    nomeMedicamento: req.body.nomeMedicamento,
    hospital: req.body.hospital,
    quantidadeDisponivel: req.body.quantidadeDisponivel
  })

  medicamento.save().then(async medicamentoInserido => {
    //Envia a atualização para o barramento de eventos.
    await axios.post("http://localhost:10000/eventos", {
      tipo: "MedicamentoCriado",
      id: medicamentoInserido._id,
      dados: {
        medicamento
      },
    });
    res.status(201).json({
      id: medicamentoInserido._id,
    })
  })
})

//PUT para aatualizar um medicamento de acordo com o ID (UPDATE).
app.put('/medicamentos/:id', async (req, res) => {

  const medicamento = new Medicamento({
    _id: req.params.id,
    nomeMedicamento: req.body.nomeMedicamento,
    hospital: req.body.hospital,
    quantidadeDisponivel: req.body.quantidadeDisponivel
  })

  Medicamento.updateOne({_id: req.params.id }, medicamento).then(async (resultado) =>{
    //Envia a atualização para o barramento de eventos.
    await axios.post("http://localhost:10000/eventos", {
      tipo: "MedicamentoAtualizado",
      id: req.params.id,
      dados: {
        medicamento,
      },
    });
    console.log(resultado);
    res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
  })
})

//DELETE para deletar um medicamento de acordo com o ID (DELETE).
app.delete('/medicamentos/:id', async (req, res) => {

  Medicamento.findById({_id: req.params.id}).then((resultado) =>{
    if(resultado != null){
      Medicamento.deleteOne({ _id: req.params.id }).then(async (resultado) => {

        await axios.post("http://localhost:10000/eventos", {
          tipo: "MedicamentoDeletado",
          id: req.params.id,
        });

        console.log(resultado);
        res.status(200).json({ mensagem: "Medicamento removido" })
      });      

    }else{
      res.status(200).json({mensagem: "Medicamento não encontrado"})
    }
  })

})

app.get("/medicamentos", async (req, res) => {
  Medicamento.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo OK",
      medicamentos: documents,
    });
  });
});

app.post('/eventos', (req, res) => {
  res.status(200).send({ msg: 'ok' });
})

module.exports = app;
app.listen(4000, () => console.log('Medicamentos. Porta 4000'))