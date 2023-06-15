import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFormHeaderComponent } from './subscription-form-header.component';

describe('SubscriptionFormHeaderComponent', () => {
  let component: SubscriptionFormHeaderComponent;
  let fixture: ComponentFixture<SubscriptionFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SubscriptionFormHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
