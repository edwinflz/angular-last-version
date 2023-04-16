import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutes } from '@enums/routes.enum';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: []
    })
    .compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on redirectHome() call', () => {
    spyOn(router, 'navigate');
    component.redirectHome();
    expect(router.navigate).toHaveBeenCalledWith([AppRoutes.HOME]);
  });
});
