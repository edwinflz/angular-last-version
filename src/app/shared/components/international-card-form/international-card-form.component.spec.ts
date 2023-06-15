import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalCardFormComponent } from './international-card-form.component';

describe('InternationalCardFormComponent', () => {
  let component: InternationalCardFormComponent;
  let fixture: ComponentFixture<InternationalCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InternationalCardFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
