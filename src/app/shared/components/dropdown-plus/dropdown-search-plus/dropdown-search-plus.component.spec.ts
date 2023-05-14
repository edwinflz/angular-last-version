import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSearchPlusComponent } from './dropdown-search-plus.component';

describe('DropdownSearchPlusComponent', () => {
  let component: DropdownSearchPlusComponent;
  let fixture: ComponentFixture<DropdownSearchPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DropdownSearchPlusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownSearchPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
