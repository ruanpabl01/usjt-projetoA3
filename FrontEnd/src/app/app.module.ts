import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { FormsModule } from '@angular/forms';
 import { HttpClientModule} from '@angular/common/http'

 import { MatButtonModule } from '@angular/material/button'
 import { MatCardModule } from '@angular/material/card';
 import { MatExpansionModule } from '@angular/material/expansion'
 import { MatInputModule } from '@angular/material/input';
 import { MatToolbarModule } from '@angular/material/toolbar'

 import { MedicamentoConsultaComponent } from './medicamento-consulta/medicamento-consulta.component';
 import { MedicamentoInserirComponent } from './medicamento-inserir/medicamento-inserir.component';
 import { MedicamentoHomeComponent } from './medicamento-home/medicamento-home.component';
 import { MedicamentoDeleteComponent } from './medicamento-delete/medicamento-delete.component';
 import { MedicamentoAtualizarComponent } from './medicamento-atualizar/medicamento-atualizar.component';

 import { CabecalhoComponent } from './cabecalho/cabecalho.component';



@NgModule({
  declarations: [
    AppComponent,
    MedicamentoInserirComponent,
    MedicamentoHomeComponent,
    MedicamentoConsultaComponent,
    MedicamentoDeleteComponent,
    MedicamentoAtualizarComponent,
    CabecalhoComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
