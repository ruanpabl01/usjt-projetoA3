import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-atualizar',
  templateUrl: './medicamento-atualizar.component.html',
  styleUrls: ['./medicamento-atualizar.component.css']
})

export class MedicamentoAtualizarComponent {
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
    this.medicamentoService.atualizarMedicamento(
      form.value.idMedicamentoAtualizar, form.value.qtddMedicamentoAtualizar, form.value.nomeMedicamentoAtualizar, form.value.hospitalMedicamentoAtualizar
    )
    form.resetForm()
  }
}
