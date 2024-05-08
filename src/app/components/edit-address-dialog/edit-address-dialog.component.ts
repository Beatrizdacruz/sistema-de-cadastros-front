
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

@Component({
  selector: 'app-edit-address-dialog',
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
  templateUrl: './edit-address-dialog.component.html',
  styleUrl: './edit-address-dialog.component.scss'
})
export class EditAddressDialogComponent {
  formData: any = {};
  @ViewChild('map') mapElement: ElementRef | undefined;

  constructor(
    public dialogRef: MatDialogRef<EditAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.formData = { ...data.formData };
  }

  save() {
    this.dialogRef.close(this.formData);
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
