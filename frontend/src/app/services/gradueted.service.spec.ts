import { TestBed } from '@angular/core/testing';

import { GraduetedService } from './gradueted.service';

describe('GraduetedService', () => {
  let service: GraduetedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduetedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
