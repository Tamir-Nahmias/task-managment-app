import { Injectable, signal, NgZone, inject, OnDestroy } from '@angular/core';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const BREAKPOINTS = {
  mobile: 425,
  tablet: 768,
} as const;

@Injectable({ providedIn: 'root' })
export class BreakpointService implements OnDestroy {
  private zone = inject(NgZone);

  readonly isMobile = signal(false);
  readonly isTablet = signal(false);
  readonly isDesktop = signal(true);
  readonly current = signal<Breakpoint>('desktop');

  private mobileQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.mobile}px)`);
  private tabletQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.tablet}px)`);

  private onMobileChange = (e: MediaQueryListEvent | MediaQueryList) => {
    this.zone.run(() => this.evaluate());
  };
  private onTabletChange = (e: MediaQueryListEvent | MediaQueryList) => {
    this.zone.run(() => this.evaluate());
  };

  constructor() {
    this.mobileQuery.addEventListener('change', this.onMobileChange);
    this.tabletQuery.addEventListener('change', this.onTabletChange);
    this.evaluate();
  }

  private evaluate(): void {
    const mobile = this.mobileQuery.matches;
    const tablet = this.tabletQuery.matches && !mobile;
    const desktop = !this.mobileQuery.matches && !this.tabletQuery.matches;

    this.isMobile.set(mobile);
    this.isTablet.set(tablet);
    this.isDesktop.set(desktop);

    if (mobile) this.current.set('mobile');
    else if (tablet) this.current.set('tablet');
    else this.current.set('desktop');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.onMobileChange);
    this.tabletQuery.removeEventListener('change', this.onTabletChange);
  }
}
