import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrphelinComponent } from './edit-orphelin.component';

describe('EditOrphelinComponent', () => {
  let component: EditOrphelinComponent;
  let fixture: ComponentFixture<EditOrphelinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrphelinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
