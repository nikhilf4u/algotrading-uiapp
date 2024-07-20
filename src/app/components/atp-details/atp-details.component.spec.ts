import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtpDetailsComponent } from './atp-details.component';

describe('AtpDetailsComponent', () => {
  let component: AtpDetailsComponent;
  let fixture: ComponentFixture<AtpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtpDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
