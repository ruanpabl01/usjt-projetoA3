import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Medicamento } from "./medicamento.model";
import { map } from 'rxjs/operators';
import { getLocaleDayPeriods } from "@angular/common";

//single source of truth
@Injectable({ providedIn: 'root' })
export class MedicamentoService {
  private listaMedicamentoAtualizada = new Subject<Medicamento[]>();
  private medicamentos: Medicamento[] = [];

  constructor(private httpClient: HttpClient) { }

  getListaDeMedicamentosAtualizadaObservable() {
    return this.listaMedicamentoAtualizada.asObservable();
  }

  getMedicamentos(): void {
    const url = "http://localhost:4000/medicamentos"
    this.httpClient
      .get<{ mensagem: string, medicamentos: any }>(url)
      .pipe(map((dados) => {
        return dados.medicamentos.map(medicamento => {
          return {
            id: medicamento._id,
            nomeMedicamento: medicamento.nomeMedicamento,
            hospital: medicamento.hospital,
            quantidadeDisponivel: medicamento.quantidadeDisponivel
          }
        })
      }))
      .subscribe(
        (medicamentos) => {
          this.medicamentos = medicamentos;
          this.listaMedicamentoAtualizada.next([...this.medicamentos]);
        }
      )
  }

  adicionarMedicamento(nomeMedicamento: string, hospital: string, quantidadeDisponivel: number): void {
    const medicamento: Medicamento = { id: "", nomeMedicamento, hospital, quantidadeDisponivel }
    const url = 'http://localhost:4000/medicamentos'

    this.httpClient.post<{ mensagem: string, id: string }>(url, medicamento)
      .subscribe((dados) => {
        medicamento.id = dados.id
        this.medicamentos.push(medicamento)
        this.listaMedicamentoAtualizada.next([...this.medicamentos])
      })
  }

  removerMedicamento(id: string): void {
    this.httpClient.delete<{ mensagem: string }>(`http://localhost:4000/medicamentos/${id}`)
      .subscribe((dados) => {
        if (dados.mensagem === "Medicamento removido") {
          this.medicamentos = this.medicamentos.filter((cli) => cli.id !== id);
          this.listaMedicamentoAtualizada.next([...this.medicamentos]);
          alert("Medicamento removido!")
        } else {
          alert("Medicamento não encontrado!")
        }
      })
  }

  consultarMedicamento(nome: string) {
    if (([...this.medicamentos.filter((cli) => cli.nomeMedicamento === nome)]).length === 1) {
      return ([...this.medicamentos.filter((cli) => cli.nomeMedicamento === nome)])
    } else {
      alert("Medicamento não encontrado!")
      return null
    }
  }

  atualizarMedicamento(id: string, novaQuantidade: number, novoNome: string, novoHospital: string){
    const copia = [...this.medicamentos];
    const indice = copia.findIndex(cli => cli.id === id);

    copia[indice].nomeMedicamento = novoNome;
    copia[indice].hospital = novoHospital;
    copia[indice].quantidadeDisponivel = novaQuantidade;

    const medicamento: Medicamento = {
      id: "",
      nomeMedicamento: copia[indice].nomeMedicamento,
      hospital: copia[indice].hospital,
      quantidadeDisponivel: copia[indice].quantidadeDisponivel
    }

    this.httpClient.put(`http://localhost:4000/medicamentos/${id}`, medicamento).subscribe(() => {
      this.medicamentos = copia;
      this.listaMedicamentoAtualizada.next([...this.medicamentos]);
      alert("Medicamento atualizado!")
    })

  }

  subtrairMedicamento(id: string, quantidadeSubtrair: number) {
    const copia = [...this.medicamentos]
    const indice = copia.findIndex(cli => cli.id === id);
    const resultadoSub = copia[indice].quantidadeDisponivel - quantidadeSubtrair

    if (copia[indice].quantidadeDisponivel > 0) {
      if (resultadoSub >= 0) {

        copia[indice].quantidadeDisponivel -= quantidadeSubtrair

        const medicamento: Medicamento = {
          id: "",
          nomeMedicamento: copia[indice].nomeMedicamento,
          hospital: copia[indice].hospital,
          quantidadeDisponivel: copia[indice].quantidadeDisponivel
        }

        if (copia[indice].quantidadeDisponivel < 5) {
          alert("Estoque do medicamento acabando! Restam: " + copia[indice].quantidadeDisponivel)
        }

        this.httpClient.put(`http://localhost:4000/medicamentos/${id}`, medicamento).subscribe(() => {
          this.medicamentos = copia;
          this.listaMedicamentoAtualizada.next([...this.medicamentos]);
          alert("Medicamento atualizado!")
        })

      }else{
        alert("A quantidade a ser subtraída é maior que a quantidade disponível do medicamento.")
      }

    }else{
      alert("Não há estoque disponível para o medicamento em questão.")
    }

  }
}
