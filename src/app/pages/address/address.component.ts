import { MatDialog } from '@angular/material/dialog';

import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { EditAddressDialogComponent } from '../../components/edit-address-dialog/edit-address-dialog.component';
import { AddAddressDialogComponent } from '../../components/add-address-dialog/add-address-dialog.component';
import { CreateAddressService } from '../../services/create-address.service';

export interface Address {
  id: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}
// const addresses: Address[] = [
//   //exemplo enquanto não conecto com o banco
//   { id: 1, cep: '12345-678', logradouro: 'Rua das Flores', bairro: 'Centro', localidade: 'São Paulo', uf:'SP' },
//   { id: 2, cep: '54321-987', logradouro: 'Avenida das Palmeiras', bairro: 'Jardim Botânico', localidade: 'Rio de Janeiro', uf:'RJ' },
//   { id: 3, cep: '98765-432', logradouro: 'Travessa das Orquídeas', bairro: 'Vila Aurora', localidade: 'Belo Horizonte', uf: 'MG' },
//   { id: 4, cep: '13579-246', logradouro: 'Alameda dos Girassóis', bairro: 'Parque Industrial', localidade: 'Campinas', uf: 'sp' },
//   { id: 5, cep: '01234-567', logradouro: 'Rua das Amendoeiras', bairro: 'Jardim Primavera', localidade: 'Porto Alegre', uf: 'RS' }

// ];

@Component({
    selector: 'app-address',
    standalone: true,
    templateUrl: './address.component.html',
    styleUrl: './address.component.scss',
    imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    NgIf,
    MatIcon,
    MatIconButton,
    
    
    ],
    providers: [CreateAddressService]
})


export class AddressComponent {
  
  constructor(private router: Router,
    private CreateAddressService: CreateAddressService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(){
    this.listAddresses()
  }
  displayedColumns: string[] = ['cep', 'logradouro', 'bairro', 'localidade', 'uf', 'actions'];
  addresses:Address[] = [];

  listAddresses(){
    this.CreateAddressService.listAddress()
    .subscribe(addresses => 
      {this.addresses = addresses}
    )
  }

  

  navigate(){
    this.router.navigate(["create-address"])
  }

  @ViewChild(MatTable)
  table!: MatTable<Address>;

  addData(){
    const dialogRef = this.dialog.open(AddAddressDialogComponent, {
      width: '400px',
      data: { formData: {} }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      
    });
  }
  
  
  editRow(row: Address) {
    const dialogRef = this.dialog.open(EditAddressDialogComponent, {
      width: '400px',
      data: { formData: { ...row } }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        // Atualize o item na fonte de dados
        const index = this.addresses.findIndex(item => item.id === row.id);
        if (index !== -1) {
          this.addresses[index] = result;
        }
      }
    });
  }

  removeData(row: Address) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja excluir este item?',
        buttonText: {
          ok: 'Excluir',
          cancel: 'Cancelar'
        }
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Remover o item da fonte de dados
        this.addresses = this.addresses.filter(item => item.id !== row.id);
        console.log('Excluir:', row);
      }
    });
  }
}
