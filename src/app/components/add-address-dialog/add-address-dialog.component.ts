import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { ToastrService } from 'ngx-toastr';
import { CreateAddressService } from '../../services/create-address.service';

@Component({
  selector: 'app-add-address-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  providers: [CreateAddressService],
  templateUrl: './add-address-dialog.component.html',
  styleUrls: ['./add-address-dialog.component.scss']
})
export class AddAddressDialogComponent {
  formData: any = {};
  @ViewChild('map') mapElement: ElementRef | undefined;

  constructor(
    private CreateAddressService: CreateAddressService, // Correção aqui
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<AddAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.formData = data.formData? { ...data.formData }: {};
  }

  adicionarAddress() {
    const { cep, logradouro, bairro, localidade, uf } = this.formData;
    this.CreateAddressService.addAddress(cep, logradouro, bairro, localidade, uf)
    .subscribe({
        
      next: (value: any) => {
        console.log("o format data")
        console.log(this.formData)
        sessionStorage.setItem("cep", cep);
        sessionStorage.setItem("logradouro", logradouro);
        sessionStorage.setItem("bairro", bairro);
        sessionStorage.setItem("localidade", localidade);
        sessionStorage.setItem("uf", uf);
        console.log(sessionStorage)
        this.toastService.success("Endereço cadastrado com sucesso");
        this.dialogRef.close();
      },
      error: (error:any) => {
        console.log(error)
        this.toastService.error("Erro ao cadastrar endereço");
      }
      
    });
  }


  close() {
    this.dialogRef.close();
  }

  findAddress() {
    const cep = this.formData.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      return;
    }
    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
      .subscribe(
        data => {
          this.formData.logradouro = data.logradouro;
          this.formData.localidade = data.localidade;
          this.formData.uf = data.uf;
          this.formData.bairro = data.bairro;
          //console.log(data);
        },
        error => {
          console.log('Erro ao realizar consulta', error);
        }
      );
  }

}
