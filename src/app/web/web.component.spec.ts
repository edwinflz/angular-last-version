import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WrapperMainPageComponent } from '@layouts/wrapper-main-page/wrapper-main-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WebComponent } from './web.component';

describe('WebComponent', () => {
  let component: WebComponent;
  let fixture: ComponentFixture<WebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, WrapperMainPageComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component WebComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a router-outlet element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should contain a app-wrapper-main-page element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-wrapper-main-page')).toBeTruthy();
  });
});
