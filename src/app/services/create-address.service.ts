import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../types/Address';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAddressService {
  apiUrl: string = "http://localhost:8081/enderecos/"

  user_id: string = '2ab40fa3-3afe-40f6-9dc8-e2f755a12a48'
  constructor(private httpCliente: HttpClient) { }

  listAddress():Observable<Address[]>{
    return this.httpCliente.get<Address[]>(this.apiUrl + "list-endereco/2ab40fa3-3afe-40f6-9dc8-e2f755a12a48")
  }

  addAddress(cep: string, logradouro: string, bairro: string, localidade: string, uf: string){
    const user_id = '2ab40fa3-3afe-40f6-9dc8-e2f755a12a48';
    return this.httpCliente.post<Address>(this.apiUrl + "add-endereco/" , { cep, logradouro, bairro, localidade, uf, user_id}).pipe(
      tap((value) => {
        sessionStorage.setItem("id", value.id)
        sessionStorage.setItem("cep", value.cep)
        sessionStorage.setItem("logradouro", value.logradouro)
        sessionStorage.setItem("bairro", value.bairro)
        sessionStorage.setItem("localidade", value.localidade)
        sessionStorage.setItem("uf", value.uf)
        sessionStorage.setItem("user_id", value.user_id)
      })
    )
  }

  editAddress(cep: string, logradouro: string, bairro: string, localidade: string, uf: string){
    return this.httpCliente.put<Address>(this.apiUrl + 'edit-endereco/7abcc869-1f72-416f-96d5-2150041bd384' , {cep, logradouro, bairro, localidade, uf});
  }

  deleteAddress(id: string){
    return this.httpCliente.delete<Address>(this.apiUrl + 'delete-endereco/' + id);
    
  }
}
