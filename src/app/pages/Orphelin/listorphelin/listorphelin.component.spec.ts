import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListorphelinComponent } from './listorphelin.component';

describe('ListorphelinComponent', () => {
  let component: ListorphelinComponent;
  let fixture: ComponentFixture<ListorphelinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListorphelinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListorphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
