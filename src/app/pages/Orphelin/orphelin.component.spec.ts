import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrphelinComponent } from './orphelin.component';


describe('OrphelinComponent', () => {
  let component: OrphelinComponent;
  let fixture: ComponentFixture<OrphelinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrphelinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
