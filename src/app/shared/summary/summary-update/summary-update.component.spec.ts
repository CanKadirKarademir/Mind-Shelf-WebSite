import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryUpdateComponent } from './summary-update.component';

describe('SummaryUpdateComponent', () => {
  let component: SummaryUpdateComponent;
  let fixture: ComponentFixture<SummaryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
