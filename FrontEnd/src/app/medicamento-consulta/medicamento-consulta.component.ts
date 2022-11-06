import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MedicamentoService } from '../medicamento.service';
import { Medicamento } from '../medicamento.model';

@Component({
  selector: 'app-medicamento-consulta',
  templateUrl: './medicamento-consulta.component.html',
  styleUrls: ['./medicamento-consulta.component.css']
})

export class MedicamentoConsultaComponent implements OnInit {
  medicamentos: Medicamento[];
  medicamentosConsulta: Medicamento[];
  medicamentosSubcription: Subscription;

  constructor(private medicamentoService: MedicamentoService) {

  }

  ngOnInit():void{
    this.medicamentoService.getMedicamentos();
    this.medicamentosSubcription = this.medicamentoService
      .getListaDeMedicamentosAtualizadaObservable()
      .subscribe((medicamentos: Medicamento[])=>{
        this.medicamentos = medicamentos
      })
  }

  onConsultarMedicamento(form: NgForm){
    this.medicamentosConsulta = this.medicamentoService.consultarMedicamento(form.value.nomeMedicamentoConsulta);
    form.resetForm()
  }
}
