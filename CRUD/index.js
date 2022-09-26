const express = require('express');
const app = express();
const axios = require('axios');

//Lista de medicamentos (É incrementada a cada novo medicamento).
const medicamentos = {};

//Nova lista de medicamentos, é populada apenas com medicamentos específicos. Serve para o GET (READ).
const novaLista = {};

//ID do medicamento (é incrementado a cada novo medicamento).
let idMedicamento = 0;

//Estamos aplicando um middleware.
app.use(express.json());

//POST para cadastrar um medicamento novo (CREATE).
app.post('/medicamentos', async (req, res) => {
  //Toda vez que o POST é chamado, incrementa 1 no ID do medicamento.
  idMedicamento++;
  //Atribui os parâmetros da requisição (POSTMAN) às variáveis que estão entre chaves.
  //Nesse caso o que é passado via requisição é: O nome do hospital, o nome do medicamento e a quantidade disponível deste medicamento.
  const { hospital, nomeMedicamento, quantidadeDisponivel } = req.body;
  //Inclui o que foi enviado na requisição na lista de medicamentos, incrementando 1 a cada novo medicamento incluído.
  medicamentos[idMedicamento] = { idMedicamento, hospital, nomeMedicamento, quantidadeDisponivel };
  //Envia a atualização para o barramento de eventos.
  await axios.post("http://localhost:10000/eventos", {
    tipo: "MedicamentoCriado",
    dados: {
      idMedicamento,
      hospital,
      nomeMedicamento,
      quantidadeDisponivel
    },
  });
  //Resposta de created, exibindo também o que foi incluído na lista medicamentos. 
  res.status(201).send(medicamentos[idMedicamento]);
})

//GET para obter a lista específica de medicamentos (READ).
app.get('/medicamentos', (req, res) => {
  //Atribui os parâmetros da requisição (POSTMAN) à variável entre chaves.
  //Nesse caso o que é passado via requisição é: O nome do medicamento cujo qual se deseja obter uma lista.
  const { nomeMedicamentoParaConsulta } = req.body;
  //Percorre toda a lista de medicamentos existente
  for (let cont = 1; cont <= idMedicamento; cont++) {
    //Lógica IF para verificar quais chaves possuem o nomeMedicamento = nomeMedicamentoParaConsulta.
    if (medicamentos[cont].nomeMedicamento === nomeMedicamentoParaConsulta) {
      //Inclui os atributos que possuem o mesmo nome a uma nova lista.    
      novaLista[cont] = medicamentos[cont];
    }
  }
  //Retorna a nova lista.
  res.status(200).send(novaLista)
})

//PUT para atualizar um a quantidade disponível de um medicamento de acordo com o ID passado (UPDATE).
app.put('/medicamentos', async (req, res) => {
  //Atribui os parâmetros da requisição (POSTMAN) às variáveis que estão entre chaves.
  //Nesse caso o que é passado via requisição é: O nome do medicamento cujo qual se deseja obter uma lista.
  const { idMedicamentoParaAtualizar, novaQuantidadeDisponivel } = req.body;
  //De acordo com o ID do medicamento enviado no request, substitui a quantidade disponível na lista pela nova quantidade enviada no request.
  medicamentos[idMedicamentoParaAtualizar].quantidadeDisponivel = novaQuantidadeDisponivel;
  //Resposta de sucesso no UPDATE
  res.status(201).send("Quantidade do medicamento ID: " + idMedicamentoParaAtualizar + " atualizada.");
})


//DELETE para deletar um medicamento de acordo com o ID (DELETE).
app.delete('/medicamentos', async (req, res) => {
  //Atribui os parâmetros da requisição (POSTMAN) às variáveis que estão entre chaves.
  //Nesse caso o que é passado via requisição é: O id do medicamento cujo qual se deseja deletar.
  const { idMedicamento } = req.body;
  //Deleta o medicamento que possui ID igual ao passado na requisição delete.
  delete (medicamentos[idMedicamento]);
  //Resposta de sucesso.
  res.status(200).send("Medicamento ID: " + idMedicamento + " Deletado.");
})

app.post('/eventos', (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: 'ok' });
})

app.listen(4000, () => console.log('Medicamentos. Porta 4000'))