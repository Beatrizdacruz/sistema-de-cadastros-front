import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../types/Address';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAddressService {
  apiUrl: string = "http://localhost:8081/enderecos/"

  constructor(private httpCliente: HttpClient,
    private loginService: LoginService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken();
    console.log(token)
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }


  listAddress():Observable<Address[]>{
    return this.httpCliente.get<Address[]>(this.apiUrl + "list-endereco/",  {headers: this.getHeaders()})
  }

  addAddress(cep: string, logradouro: string, bairro: string, localidade: string, uf: string): Observable<Address>{
    return this.httpCliente.post<Address>(this.apiUrl + "add-endereco" , { cep, logradouro, bairro, localidade, uf}, {headers: this.getHeaders()})
  }

  editAddress(id: string, cep: string, logradouro: string, bairro: string, localidade: string, uf: string){
    return this.httpCliente.put<Address>(this.apiUrl + 'edit-endereco/' + id , {cep, logradouro, bairro, localidade, uf}, {headers: this.getHeaders()});
  }

  deleteAddress(id: string){
    return this.httpCliente.delete<Address>(this.apiUrl + 'delete-endereco/' + id, {headers: this.getHeaders()});
    
  }
}
