import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    const navbarBrand = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(navbarBrand.nativeElement.textContent.trim()).toEqual(
      'Parclick Shop'
    );
  });

  it('should have the correct menu items', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('.nav-link'));
    expect(navLinks.length).toEqual(4);
    expect(navLinks[0].nativeElement.textContent.trim()).toEqual('Home');
    expect(navLinks[1].nativeElement.textContent.trim()).toEqual('Categories');
    expect(navLinks[2].nativeElement.textContent.trim()).toEqual('Cart');
    expect(navLinks[3].nativeElement.textContent.trim()).toEqual('Login');
  });
});
