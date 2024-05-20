import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { EditAddressDialogComponent } from '../../components/edit-address-dialog/edit-address-dialog.component';
import { AddAddressDialogComponent } from '../../components/add-address-dialog/add-address-dialog.component';
import { CreateAddressService } from '../../services/create-address.service';
import { AuthService } from '../../services/auth.service';

export interface Address {
  id: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Component({
  selector: 'app-address',
  standalone: true,
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
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
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [CreateAddressService]
})
export class AddressComponent implements OnInit {
  username: string | null = null;

  displayedColumns: string[] = ['cep', 'logradouro', 'bairro', 'localidade', 'uf', 'actions'];
  addresses = new MatTableDataSource<Address>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private createAddressService: CreateAddressService,
    private toastService: ToastrService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.listAddresses();
    this.username = this.authService.getUsername();
  }
  ngAfterViewInit(): void {
    
    console.log(this.paginator)
    this.addresses.paginator = this.paginator;
  }

  listAddresses() {
    this.createAddressService.listAddress().subscribe(addresses => {
      this.addresses.data = addresses;
    });
  }

  logout() {
    this.authService.logout();
  }

  navigate() {
    this.router.navigate(['create-address']);
  }

  addData() {
    const dialogRef = this.dialog.open(AddAddressDialogComponent, {
      width: '400px',
      data: { formData: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listAddresses();
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
        const index = this.addresses.data.findIndex(item => item.id === row.id);
        if (index !== -1) {
          this.addresses.data[index] = result;
          this.addresses.data = [...this.addresses.data]; // Refresh the data source
        }
      }
      this.listAddresses();
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
        this.createAddressService.deleteAddress(row.id).subscribe(
          () => {
            this.listAddresses();
            console.log('Excluir:', row);
          },
          (error) => {
            console.error('Erro ao excluir:', error);
          }
        );
      }
    });
  }
}
