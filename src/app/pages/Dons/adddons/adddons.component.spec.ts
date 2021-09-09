import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddonsComponent } from './adddons.component';

describe('AdddonsComponent', () => {
  let component: AdddonsComponent;
  let fixture: ComponentFixture<AdddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
