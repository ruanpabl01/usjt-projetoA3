import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-atualizar',
  templateUrl: './medicamento-atualizar.component.html',
  styleUrls: ['./medicamento-atualizar.component.css']
})

export class MedicamentoAtualizarComponent {

  constructor(
    private medicamentoService: MedicamentoService
  ) {

  }

  onAtualizarMedicamento(form: NgForm){
    this.medicamentoService.atualizarMedicamento(
      form.value.idMedicamentoAtualizar, form.value.qtddMedicamentoAtualizar
    )
    form.resetForm()
    alert("Medicamento atualizado!")
  }
}
