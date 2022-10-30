import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MedicamentoService } from '../medicamento.service';
import { Medicamento } from '../medicamento.model';

@Component({
  selector: 'app-medicamento-consulta',
  templateUrl: './medicamento-consulta.component.html',
  styleUrls: ['./medicamento-consulta.component.css']
})

export class MedicamentoConsultaComponent {
  medicamentos: Medicamento[];

  constructor(private medicamentoService: MedicamentoService) {

  }

  onConsultarMedicamento(form: NgForm){
    this.medicamentos = this.medicamentoService.consultarMedicamento(
      form.value.nomeMedicamentoConsulta
    );
    form.resetForm()
  }
}
