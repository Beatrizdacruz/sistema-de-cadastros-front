
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent
} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import { ConsultaCepService } from '../../services/consulta-cep.service';
import { ToastrService } from 'ngx-toastr';

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
  templateUrl: './add-address-dialog.component.html',
  styleUrl: './add-address-dialog.component.scss'
})
export class AddAddressDialogComponent {
  formData: any = {};
  @ViewChild('map') mapElement: ElementRef | undefined;

  constructor(
    private insertEndereço: ConsultaCepService,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<AddAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.formData = { ...data.formData };
  }

  submit(){
    this.insertEndereço.enviarEnderecos(
      this.formData.value.cep,
      this.formData.value.bairro,
      this.formData.value.localidade,
      this.formData.value.logradouro,
      this.formData.value.uf
    ).subscribe({
      next: () => {
        this.toastService.success("Endereço cadastrado com sucesso"),
        this.dialogRef.close();
      },
      error: () => this.toastService.error("Erro ao cadastrar endereço")
    })
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
          console.log(data);
          
        },
        error => {
          console.log('Erro ao realizar consulta', error);
        }
      );
  }

}
