import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildonsComponent } from './detaildons.component';

describe('DetaildonsComponent', () => {
  let component: DetaildonsComponent;
  let fixture: ComponentFixture<DetaildonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaildonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
