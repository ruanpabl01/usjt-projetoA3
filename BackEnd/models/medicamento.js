const mongoose = require ('mongoose')

//definindo o schema
const medicamentoSchema = mongoose.Schema({
  nomeMedicamento: {type: String, required: true},
  hospital: {type: String, required: false, default: '00000000'},
  quantidadeDisponivel: {type: String, required: true}
})

module.exports = mongoose.model('Medicamento', medicamentoSchema)