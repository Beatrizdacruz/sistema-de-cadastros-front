import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  apiUrl: string = "http://localhost:8081/enderecos/"

  constructor(private httpCliente: HttpClient) { }

  enviarEnderecos(cep:string, bairro: string, localidade: string, logradouro: string, uf: string){
    return this.httpCliente.post<LoginResponse>(this.apiUrl + "add-endereco", {cep, bairro, localidade, logradouro, uf}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }
}
