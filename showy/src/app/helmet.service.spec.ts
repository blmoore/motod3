/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HelmetService } from './helmet.service';

describe('HelmetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelmetService]
    });
  });

  it('should ...', inject([HelmetService], (service: HelmetService) => {
    expect(service).toBeTruthy();
  }));
});
