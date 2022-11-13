import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentoAtualizarComponent } from './medicamento-atualizar/medicamento-atualizar.component';
import { MedicamentoConsultaComponent } from './medicamento-consulta/medicamento-consulta.component';
import { MedicamentoDeleteComponent } from './medicamento-delete/medicamento-delete.component';
import { MedicamentoHomeComponent } from './medicamento-home/medicamento-home.component';
import { MedicamentoInserirComponent } from './medicamento-inserir/medicamento-inserir.component';
import { MedicamentoSubtrairComponent } from './medicamento-subtrair/medicamento-subtrair.component';

const routes: Routes = [
  //localhost:4200/ =>
  {
    path: "", component: MedicamentoHomeComponent
  },

  //localhost:3000/inserir =>
  {
    path: 'inserir', component: MedicamentoInserirComponent
  },

  //localhost:3000/consultar =>
  {
    path: 'consultar', component: MedicamentoConsultaComponent
  },

  //localhost:3000/atualizar =>
  {
    path: 'atualizar', component: MedicamentoAtualizarComponent
  },

  //localhost:3000/atualizar =>
  {
    path: 'deletar', component: MedicamentoDeleteComponent
  },

  //localhost:3000/subtrair =>
  {
    path: 'subtrair', component: MedicamentoSubtrairComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
