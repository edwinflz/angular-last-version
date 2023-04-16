import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { ResizeService } from '../resize.service';

describe('ResizeService', () => {
  let service: ResizeService;
  let unsubscribe$: Subject<void>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResizeService],
    });

    service = TestBed.inject(ResizeService);
    unsubscribe$ = new Subject();
  });

  afterEach(() => {
    unsubscribe$.next();
    unsubscribe$.complete();
  });

  it('should be ResizeService created', () => {
    expect(service).toBeTruthy();
  });

  it('should return currentSize', () => {
    const currentSize = service.currentSize;
    expect(currentSize).toEqual(window.innerWidth);
  });

  it('should return isMobileBreakpoint true if window size is less than 768', () => {
    spyOnProperty(service, 'currentSize', 'get').and.returnValue(500);
    expect(service.isMobileBreakpoint).toBeTrue();
  });

  it('should return isMobileBreakpoint false if window size is greater than or equal to 768', () => {
    spyOnProperty(service, 'currentSize', 'get').and.returnValue(800);
    expect(service.isMobileBreakpoint).toBeFalse();
  });

  it('should return isTabletBreakpoint true if window size is between 768 and 1024', () => {
    spyOnProperty(service, 'currentSize', 'get').and.returnValue(900);
    expect(service.isTabletBreakpoint).toBeTrue();
  });

  it('should return isTabletBreakpoint false if window size is less than 768', () => {
    spyOnProperty(service, 'currentSize', 'get').and.returnValue(500);
    expect(service.isTabletBreakpoint).toBeFalse();
  });

  it('should return isTabletBreakpoint false if window size is greater than 1024', () => {
    spyOnProperty(service, 'currentSize', 'get').and.returnValue(1200);
    expect(service.isTabletBreakpoint).toBeFalse();
  });

  it('should return isDesktopBreakpoint true if window size is greater than 1024', () => {
    spyOnProperty(service, 'currentSize', 'get').and.returnValue(1200);
    expect(service.isDesktopBreakpoint).toBeTrue();
  });

  it('should return isDesktopBreakpoint false if window size is less than or equal to 1024', () => {
    spyOnProperty(service, 'currentSize', 'get').and.returnValue(800);
    expect(service.isDesktopBreakpoint).toBeFalse();
  });

  it('should unsubscribe from the resize event when destroyed', () => {
    spyOn(service['unsubscribe$'], 'next');
    spyOn(service['unsubscribe$'], 'complete');
    service.ngOnDestroy();
    expect(service['unsubscribe$'].next).toHaveBeenCalled();
    expect(service['unsubscribe$'].complete).toHaveBeenCalled();
  });
});
