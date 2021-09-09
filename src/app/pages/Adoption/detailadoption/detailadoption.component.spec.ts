import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailadoptionComponent } from './detailadoption.component';

describe('DetailadoptionComponent', () => {
  let component: DetailadoptionComponent;
  let fixture: ComponentFixture<DetailadoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailadoptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailadoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
