import { TestBed } from '@angular/core/testing';

import { SecurityQuestionsService } from './security-questions.service';

describe('SecurityQuestionsService', () => {
  let service: SecurityQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
