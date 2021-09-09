import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorphelinComponent } from './addorphelin.component';

describe('AddorphelinComponent', () => {
  let component: AddorphelinComponent;
  let fixture: ComponentFixture<AddorphelinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddorphelinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddorphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
