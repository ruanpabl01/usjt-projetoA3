import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Medicamento } from "./medicamento.model";
import { map } from 'rxjs/operators';
import { HashLocationStrategy } from "@angular/common";

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
    const idExiste = this.medicamentos.find((cli) => cli.id === id);

    if (idExiste != undefined) {
      this.httpClient.delete<{ mensagem: string }>(`http://localhost:4000/medicamentos/${id}`)
        .subscribe((dados) => {
          if (dados.mensagem === "Medicamento removido") {
            this.medicamentos = this.medicamentos.filter((cli) => cli.id !== id);
            this.listaMedicamentoAtualizada.next([...this.medicamentos]);
            alert("Medicamento removido!")
          } else {
            alert("Medicamento n??o encontrado!")
          }
        })
    }else{
      alert("Medicamento n??o encontrado!")
    }
  }

  consultarMedicamento(nome: string) {

    if (([...this.medicamentos.filter((cli) => cli.nomeMedicamento.includes(nome))]).length != 0) {
      return ([...this.medicamentos.filter((cli) => cli.nomeMedicamento.includes(nome))])
    } else {
      alert("Medicamento n??o encontrado!")
      return null
    }
  }

  atualizarMedicamento(id: string, novaQuantidade: number, novoNome: string, novoHospital: string) {
    const copia = [...this.medicamentos];
    const indice = copia.findIndex(cli => cli.id === id);

    if (indice >= 0) {
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
    } else {
      alert("Medicamento n??o encontrado!")
    }
  }

  subtrairMedicamento(id: string, quantidadeSubtrair: number) {
    const copia = [...this.medicamentos]
    const indice = copia.findIndex(cli => cli.id === id);

    if (indice >= 0) {
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

          this.httpClient.put(`http://localhost:5000/medicamentos/${id}`, medicamento).subscribe(() => {
            this.medicamentos = copia;
            this.listaMedicamentoAtualizada.next([...this.medicamentos]);
            alert("Medicamento atualizado!")
          })

          if (copia[indice].quantidadeDisponivel < 5) {
            alert("Estoque do medicamento acabando! Restam: " + copia[indice].quantidadeDisponivel)
          }

        } else {
          alert("A quantidade a ser subtra??da ?? maior que a quantidade dispon??vel do medicamento.")
        }
      } else {
        alert("N??o h?? estoque dispon??vel para o medicamento em quest??o.")
      }
    } else {
      alert("Medicamento n??o encontrado!")
    }
  }
}
