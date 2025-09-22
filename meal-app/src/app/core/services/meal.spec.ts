import { TestBed } from '@angular/core/testing';

import { Meal } from './meal';

describe('Meal', () => {
  let service: Meal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Meal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
