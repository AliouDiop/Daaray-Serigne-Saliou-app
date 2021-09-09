import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailorphelinComponent } from './detailorphelin.component';

describe('DetailorphelinComponent', () => {
  let component: DetailorphelinComponent;
  let fixture: ComponentFixture<DetailorphelinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailorphelinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailorphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
