import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikePriceSelectionComponent } from './strike-price-selection.component';

describe('StrikePriceSelectionComponent', () => {
  let component: StrikePriceSelectionComponent;
  let fixture: ComponentFixture<StrikePriceSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrikePriceSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrikePriceSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
