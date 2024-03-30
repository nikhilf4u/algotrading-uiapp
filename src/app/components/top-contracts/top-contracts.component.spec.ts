import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContractsComponent } from './top-contracts.component';

describe('TopContractsComponent', () => {
  let component: TopContractsComponent;
  let fixture: ComponentFixture<TopContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
