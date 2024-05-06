import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { ConsultaCepService } from '../../services/consulta-cep.service';




@Component({
  selector: 'app-address',
  standalone: true,
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  
  constructor(private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
  }
  


  navigate(){
    this.router.navigate(["create-address"])
  }
}
