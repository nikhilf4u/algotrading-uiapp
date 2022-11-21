import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionChainAnalysisComponent } from './option-chain-analysis.component';

describe('OptionChainAnalysisComponent', () => {
  let component: OptionChainAnalysisComponent;
  let fixture: ComponentFixture<OptionChainAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionChainAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionChainAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
