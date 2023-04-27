import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SearchComponent } from 'src/app/shared';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerComponent],
      imports: [SearchComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the welcome message', () => {
    const bannerElement = fixture.debugElement.query(
      By.css('.display-5')
    ).nativeElement;
    expect(bannerElement.textContent).toContain(
      'Welcome to the Parclick online store'
    );
  });

  it('should render the search component', () => {
    const searchComponent = fixture.debugElement.query(
      By.directive(SearchComponent)
    );
    expect(searchComponent).toBeTruthy();
  });
});
