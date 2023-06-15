import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPlanModalComponent } from './subscription-plan-modal.component';

describe('SubscriptionPlanModalComponent', () => {
  let component: SubscriptionPlanModalComponent;
  let fixture: ComponentFixture<SubscriptionPlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SubscriptionPlanModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionPlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
