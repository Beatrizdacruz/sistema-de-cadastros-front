import { TestBed } from '@angular/core/testing';

import { CreateAddressService } from './create-address.service';

describe('CreateAddressService', () => {
  let service: CreateAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
