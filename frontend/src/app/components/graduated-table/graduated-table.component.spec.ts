import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduatedTableComponent } from './graduated-table.component';

describe('GraduatedTableComponent', () => {
  let component: GraduatedTableComponent;
  let fixture: ComponentFixture<GraduatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduatedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
