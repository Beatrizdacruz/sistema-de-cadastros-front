import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  providers: [  ]
})
export class CreateAddressComponent{
  addressForm!: FormGroup<CreateAddressForm>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
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



  back(){
    this.location.back();
  }

}
