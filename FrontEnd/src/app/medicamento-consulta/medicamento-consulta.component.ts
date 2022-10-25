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
  clientesSubscription: Subscription;

  constructor(private medicamentoService: MedicamentoService) {

  }

  onConsultarMedicamento(form: NgForm){
    // console.log(form.value.nomeMedicamentoConsulta)
    console.log(this.medicamentoService.getMedicamento(form.value.nomeMedicamentoConsulta));
  }

}

