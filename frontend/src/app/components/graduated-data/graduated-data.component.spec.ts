import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduatedDataComponent } from './graduated-data.component';

describe('GraduatedDataComponent', () => {
  let component: GraduatedDataComponent;
  let fixture: ComponentFixture<GraduatedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduatedDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduatedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
