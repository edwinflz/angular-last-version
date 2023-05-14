import { TestBed } from '@angular/core/testing';

import { FormManipulateService } from '../form-manipulate.service';

describe('FormManipulateService', () => {
  let service: FormManipulateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormManipulateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
