import { TestBed } from '@angular/core/testing';

import { DomManipulateService } from '../dom-manipulate.service';

describe('DomManipulateService', () => {
  let service: DomManipulateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomManipulateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
