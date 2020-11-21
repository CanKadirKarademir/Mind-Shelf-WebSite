import { TestBed } from '@angular/core/testing';

import { CommnentService } from './commnet.service'

describe('BookService', () => {
  let service: CommnentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommnentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
