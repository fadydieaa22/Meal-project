import { ComponentFixture, TestBed } from '@angular/core/testing';

// Update the import path if the file is named 'meals-list.component.ts'
// Update the import path if the file is named differently or located elsewhere
import { MealsListComponent } from './meals-list';
// Jasmine globals are available in Angular test environments; no import needed.

describe('MealsListComponent', () => {
  let component: MealsListComponent;
  let fixture: ComponentFixture<MealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
