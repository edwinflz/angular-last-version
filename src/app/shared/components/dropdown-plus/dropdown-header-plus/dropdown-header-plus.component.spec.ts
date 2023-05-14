import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownHeaderPlusComponent } from './dropdown-header-plus.component';

describe('DropdownHeaderPlusComponent', () => {
  let component: DropdownHeaderPlusComponent;
  let fixture: ComponentFixture<DropdownHeaderPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DropdownHeaderPlusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownHeaderPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
