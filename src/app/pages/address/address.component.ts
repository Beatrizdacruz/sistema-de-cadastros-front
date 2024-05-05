import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  constructor(private modalService: NgbModal) {}

  openModal() {
    this.modalService.open({ ariaLabelledBy: 'modal-basic-title' });
  }
}
