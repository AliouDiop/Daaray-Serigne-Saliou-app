import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaitsuserComponent } from './detaitsuser.component';

describe('DetaitsuserComponent', () => {
  let component: DetaitsuserComponent;
  let fixture: ComponentFixture<DetaitsuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaitsuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaitsuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
