import { TestBed } from '@angular/core/testing';

import { BreadcrumbAuthService } from './breadcrumb-auth.service';

describe('BreadcrumbAuthService', () => {
  let service: BreadcrumbAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
