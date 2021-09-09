import { TestBed } from '@angular/core/testing';

import { AuthServiceLog } from './auth.service';

describe('AuthService', () => {
  let service: AuthServiceLog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceLog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
