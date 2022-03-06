import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsDataComponent } from './subjects-data.component';

describe('SubjectsDataComponent', () => {
  let component: SubjectsDataComponent;
  let fixture: ComponentFixture<SubjectsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
