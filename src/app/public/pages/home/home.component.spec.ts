import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent, SearchComponent } from 'src/app/shared';
import { BannerComponent } from '../../components';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, BannerComponent],
      imports: [GalleryComponent, SearchComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render banner component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-banner')).toBeTruthy();
  });

  it('should render gallery component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-gallery')).toBeTruthy();
  });
});
