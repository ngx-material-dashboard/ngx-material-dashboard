import { TestBed } from '@angular/core/testing';

import { SidenavUtilService } from './sidenav-util.service';

describe('SidenavUtilService', () => {
  let service: SidenavUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
