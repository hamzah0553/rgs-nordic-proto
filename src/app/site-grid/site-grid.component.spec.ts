import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteGridComponent } from './site-grid.component';

describe('SiteGridComponent', () => {
  let component: SiteGridComponent;
  let fixture: ComponentFixture<SiteGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
