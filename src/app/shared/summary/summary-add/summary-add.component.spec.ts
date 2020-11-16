import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryAddComponent } from './summary-add.component';

describe('SummaryAddComponent', () => {
  let component: SummaryAddComponent;
  let fixture: ComponentFixture<SummaryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
