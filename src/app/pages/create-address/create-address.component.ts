import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConsultaCepService } from '../../services/consulta-cep.service';
import { Location } from '@angular/common';


interface CreateAddressForm {
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
}

@Component({
  selector: 'app-create-address',
  standalone: true,
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss'],
})
export class CreateAddressComponent implements OnInit {
  addressForm!: FormGroup;
  usuario: any = {
    nome: null,
    email: null
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private location: Location
  ) {
    this.addressForm = new FormGroup({
      cep: new FormControl('', [Validators.required, Validators.minLength(3)]),
      rua: new FormControl('', [Validators.required, Validators.minLength(3)]),
      bairro: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cidade: new FormControl('', [Validators.required, Validators.minLength(6)]),
      estado: new FormControl('', [Validators.required, Validators.minLength(4)]),
      numero: new FormControl('', [Validators.required, Validators.minLength(1)]),
      complemento: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.addressForm.value);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.addressForm.value))
      .subscribe(dados => {
        console.log(dados);
        this.addressForm.reset();
      });
  }

  navigate() {
    this.router.navigate(["create-address"]);
  }
  back(){
    this.location.back();
  }

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.addressForm.patchValue({
      rua: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

  verificaValidTouched(campo: FormControl) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: FormControl) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  resetaDadosForm() {
    this.addressForm.patchValue({
      rua: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null
    });
  }
}
