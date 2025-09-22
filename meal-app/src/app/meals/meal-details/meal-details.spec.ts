import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDetails } from './meal-details';

describe('MealDetails', () => {
  let component: MealDetails;
  let fixture: ComponentFixture<MealDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
