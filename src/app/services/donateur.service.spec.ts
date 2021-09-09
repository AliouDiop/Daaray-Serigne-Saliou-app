import { TestBed } from '@angular/core/testing';
import { DonateurService } from './donateur.service';

import { TransactionService } from './transaction.service';

describe('DonateurService', () => {
  let service: DonateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
