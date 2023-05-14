import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPlusComponent } from './dropdown-plus.component';

describe('DropdownPlusComponent', () => {
  let component: DropdownPlusComponent;
  let fixture: ComponentFixture<DropdownPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DropdownPlusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
