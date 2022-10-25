import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Medicamento } from "./medicamento.model";

//single source of truth
@Injectable({providedIn: 'root'})
export class MedicamentoService{
  private listaMedicamentoAtualizada = new Subject<Medicamento[]>();

  private medicamentos: Medicamento[]=[];

  constructor(private httpClient: HttpClient) { }

  adicionarMedicamento(nomeMedicamento:string, hospital:string, quantidadeDisponivel:string):void{
    const medicamento:Medicamento = {id:"", nomeMedicamento, hospital, quantidadeDisponivel}
    const url = 'http://localhost:4000/medicamentos'
    this.httpClient.post<{mensagem: string, id:string}>(url, medicamento)
    .subscribe((dados)=>{
      medicamento.id = dados.id
      this.medicamentos.push(medicamento)
      this.listaMedicamentoAtualizada.next([...this.medicamentos])
    })
  }

  removerMedicamento(id: string):void{
    this.httpClient.delete(`http://localhost:4000/medicamentos/${id}`)
    .subscribe(()=>{
      this.medicamentos = this.medicamentos.filter((cli) => cli.id !== id);
      this.listaMedicamentoAtualizada.next([...this.medicamentos]);
  })
  }
}
