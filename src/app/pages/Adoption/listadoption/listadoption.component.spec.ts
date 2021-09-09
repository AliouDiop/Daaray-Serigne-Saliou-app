import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoptionComponent } from './listadoption.component';

describe('ListadoptionComponent', () => {
  let component: ListadoptionComponent;
  let fixture: ComponentFixture<ListadoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
