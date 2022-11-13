import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-subatrair',
  templateUrl: './medicamento-subtrair.component.html',
  styleUrls: ['./medicamento-subtrair.component.css']
})

export class MedicamentoSubtrairComponent {
  medicamentos: Medicamento[];
  medicamentosConsulta: Medicamento[];
  medicamentosSubcription: Subscription;

  constructor(
    private medicamentoService: MedicamentoService
  ) {

  }

  ngOnInit():void{
    this.medicamentoService.getMedicamentos();
    this.medicamentosSubcription = this.medicamentoService
      .getListaDeMedicamentosAtualizadaObservable()
      .subscribe((medicamentos: Medicamento[])=>{
        this.medicamentos = medicamentos
      })
  }

  onAtualizarMedicamento(form: NgForm){
    this.medicamentoService.subtrairMedicamento(
      form.value.idMedicamentoAtualizar, form.value.qtddMedicamentoAtualizar
    )
    form.resetForm()
  }
}
