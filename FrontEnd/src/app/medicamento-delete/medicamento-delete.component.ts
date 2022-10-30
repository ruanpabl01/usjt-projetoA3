import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-delete',
  templateUrl: './medicamento-delete.component.html',
  styleUrls: ['./medicamento-delete.component.css']
})

export class MedicamentoDeleteComponent {

  constructor(
    private medicamentoService: MedicamentoService,
    ) {}

  onDelete(form: NgForm){
    this.medicamentoService.removerMedicamento(
      form.value.idMedicamentoDelete
    )
    form.resetForm()
    alert("Medicamento deletado!")
  }
}
