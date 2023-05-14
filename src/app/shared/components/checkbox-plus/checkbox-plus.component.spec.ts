import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxPlusComponent } from './checkbox-plus.component';

describe('CheckboxPlusComponent', () => {
  let component: CheckboxPlusComponent;
  let fixture: ComponentFixture<CheckboxPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CheckboxPlusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
