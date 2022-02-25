import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderDataComponent } from './gender-data.component';

describe('GenderDataComponent', () => {
  let component: GenderDataComponent;
  let fixture: ComponentFixture<GenderDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
