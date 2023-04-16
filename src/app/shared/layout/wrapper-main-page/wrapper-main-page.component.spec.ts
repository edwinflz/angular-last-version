import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { WrapperMainPageComponent } from './wrapper-main-page.component';


describe('WrapperMainPageComponent', () => {
  let component: WrapperMainPageComponent;
  let fixture: ComponentFixture<WrapperMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FooterComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an app-header element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should contain an app-footer element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
