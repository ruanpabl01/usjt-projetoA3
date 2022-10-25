import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';


@Component({
  selector: 'app-medicamento-inserir',
  templateUrl: './medicamento-inserir.component.html',
  styleUrls: ['./medicamento-inserir.component.css']
})

export class MedicamentoInserirComponent {
  // hospital: string;
  // nomeMedicamento: string;
  // quantidadeDisponivel: string;

  constructor(
    private medicamentoService: MedicamentoService,
    public route: ActivatedRoute
    ) {}

  // @Output() medicamentoAdicionado = new EventEmitter <Medicamento>();

  onAdicionarMedicamento(form: NgForm) {
    this.medicamentoService.adicionarMedicamento(form.value.nomeMedicamento, form.value.hospital, form.value.quantidadeDisponivel)
    // //Construir objeto medicamento
    // const medicamento: Medicamento = {
    //   nomeMedicamento: form.value.nomeMedicamento,
    //   hospital: form.value.hospital,
    //   quantidadeDisponivel: form.value.quantidadeDisponivel
    // }
    // //Emitir evento
    //  this.medicamentoAdicionado.emit(medicamento);

  }

}

