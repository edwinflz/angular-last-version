import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFormBodyComponent } from './subscription-form-body.component';

describe('SubscriptionFormBodyComponent', () => {
  let component: SubscriptionFormBodyComponent;
  let fixture: ComponentFixture<SubscriptionFormBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SubscriptionFormBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionFormBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
