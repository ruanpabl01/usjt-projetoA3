import { Component } from '@angular/core';
import { Medicamento } from './medicamento.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  medicamentos: Medicamento[] = []

  onMedicamentoAdicionado(medicamento){
    console.log(medicamento)
    this.medicamentos = [...this.medicamentos, medicamento]
  }
}

