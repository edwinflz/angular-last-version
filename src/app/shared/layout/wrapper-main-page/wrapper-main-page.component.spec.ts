import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperMainPageComponent } from './wrapper-main-page.component';

describe('WrapperMainPageComponent', () => {
  let component: WrapperMainPageComponent;
  let fixture: ComponentFixture<WrapperMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
