import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTablePlusComponent } from './dropdown-table-plus.component';

describe('DropdownTablePlusComponent', () => {
  let component: DropdownTablePlusComponent;
  let fixture: ComponentFixture<DropdownTablePlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DropdownTablePlusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownTablePlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
