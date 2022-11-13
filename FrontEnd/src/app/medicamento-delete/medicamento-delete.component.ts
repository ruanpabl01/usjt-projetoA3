import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-delete',
  templateUrl: './medicamento-delete.component.html',
  styleUrls: ['./medicamento-delete.component.css']
})

export class MedicamentoDeleteComponent {
  medicamentos: Medicamento[];
  medicamentosConsulta: Medicamento[];
  medicamentosSubcription: Subscription;

  constructor(
    private medicamentoService: MedicamentoService,
    ) {}

    ngOnInit():void{
      this.medicamentoService.getMedicamentos();
      this.medicamentosSubcription = this.medicamentoService
        .getListaDeMedicamentosAtualizadaObservable()
        .subscribe((medicamentos: Medicamento[])=>{
          this.medicamentos = medicamentos
        })
    }

  onDelete(form: NgForm){
    this.medicamentoService.removerMedicamento(
      form.value.idMedicamentoDelete
    )
    form.resetForm()
  }
}
