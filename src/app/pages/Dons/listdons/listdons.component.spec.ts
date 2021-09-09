import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdonsComponent } from './listdons.component';

describe('ListdonsComponent', () => {
  let component: ListdonsComponent;
  let fixture: ComponentFixture<ListdonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListdonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
