import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConsultaCepService } from '../../services/consulta-cep.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';



interface CreateAddressForm {
  cep: FormControl;
  bairro: FormControl;
  localidade: FormControl;
  logradouro: FormControl;
  uf: FormControl;
}

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss'],
  providers: [ ConsultaCepService ]
})
export class CreateAddressComponent{
  addressForm!: FormGroup<CreateAddressForm>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private insertEndereço: ConsultaCepService,
    private toastService: ToastrService
  ) {
    this.addressForm = new FormGroup({
      cep: new FormControl('', [Validators.required, Validators.minLength(3)]),
      bairro: new FormControl('', [Validators.required, Validators.minLength(6)]),
      localidade: new FormControl('', [Validators.required, Validators.minLength(6)]),
      logradouro: new FormControl('', [Validators.required, Validators.minLength(4)]),
      uf: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }


  submit(){
    this.insertEndereço.enviarEnderecos(
      this.addressForm.value.cep,
      this.addressForm.value.bairro,
      this.addressForm.value.localidade,
      this.addressForm.value.logradouro,
      this.addressForm.value.uf
    ).subscribe({
      next: () => {
        this.toastService.success("Endereço cadastrado com sucesso"),
        this.router.navigate(["address"])
      },
      error: () => this.toastService.error("Erro ao cadastrar endereço")
    })
  }

  back(){
    this.location.back();
  }

}
