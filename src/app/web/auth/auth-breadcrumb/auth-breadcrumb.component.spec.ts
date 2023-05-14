import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBreadcrumbComponent } from './auth-breadcrumb.component';

describe('AuthBreadcrumbComponent', () => {
  let component: AuthBreadcrumbComponent;
  let fixture: ComponentFixture<AuthBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AuthBreadcrumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
