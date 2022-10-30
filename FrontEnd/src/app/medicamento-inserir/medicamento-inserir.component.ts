import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicamentoAtualizarComponent } from '../medicamento-atualizar/medicamento-atualizar.component';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';


@Component({
  selector: 'app-medicamento-inserir',
  templateUrl: './medicamento-inserir.component.html',
  styleUrls: ['./medicamento-inserir.component.css']
})

export class MedicamentoInserirComponent {

  constructor(
    private medicamentoService: MedicamentoService,
    public route: ActivatedRoute
    ) {}

  onAdicionarMedicamento(form: NgForm) {
    this.medicamentoService.adicionarMedicamento(
      form.value.nomeMedicamento,
      form.value.hospital,
      form.value.quantidadeDisponivel
    )
    form.resetForm()
    alert("Medicamento inserido!")
  }

}

