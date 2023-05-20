import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPoliciesModalComponent } from './privacy-policies-modal.component';

describe('PrivacyPoliciesModalComponent', () => {
  let component: PrivacyPoliciesModalComponent;
  let fixture: ComponentFixture<PrivacyPoliciesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PrivacyPoliciesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPoliciesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
