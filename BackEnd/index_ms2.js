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


//PUT para atualizar um medicamento de acordo com o ID (UPDATE).
app.put('/medicamentos/:id', async (req, res) => {

  const medicamento = new Medicamento({
    _id: req.params.id,
    nomeMedicamento: req.body.nomeMedicamento,
    hospital: req.body.hospital,
    quantidadeDisponivel: req.body.quantidadeDisponivel
  })

  Medicamento.updateOne({_id: req.params.id }, medicamento).then(async (resultado) =>{
    //Envia a atualização para o barramento de eventos.
    await axios.put("http://localhost:10000/eventos", {
      tipo: "MedicamentoAtualizado",
      id: req.params.id,
      dados: {
        medicamento,
      },
    });
    res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
  })
})

app.post('/eventos', (req, res) => {
  res.status(200).send({ msg: 'ok' });
})

module.exports = app;
app.listen(5000, () => console.log('Medicamentos. Porta 5000'))