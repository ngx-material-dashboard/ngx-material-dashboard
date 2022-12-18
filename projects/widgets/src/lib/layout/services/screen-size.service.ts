import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ScreenSize } from '../../layout/enums/screen-size.enum';

@Injectable({
    providedIn: 'root'
})
export class ScreenSizeService implements OnDestroy {
    /** Observable for the screen size. */
    readonly screenSize: Observable<ScreenSize>;
    /** The source for the screen size. */
    private screenSizeSource: BehaviorSubject<ScreenSize>;
    /** The subscriptions for the service. */
    private sub: Subscription;

    constructor(private breakpointObserver: BreakpointObserver) {
        this.screenSizeSource = new BehaviorSubject<ScreenSize>(
            ScreenSize.Medium
        );
        this.screenSize = this.screenSizeSource.asObservable();
        this.sub = new Subscription();

        const sub = this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge
            ])
            .subscribe((state: BreakpointState) => {
                if (state.breakpoints[Breakpoints.XSmall]) {
                    this.screenSizeSource.next(ScreenSize.XSmall);
                } else if (state.breakpoints[Breakpoints.Small]) {
                    this.screenSizeSource.next(ScreenSize.Small);
                } else if (state.breakpoints[Breakpoints.Medium]) {
                    this.screenSizeSource.next(ScreenSize.Medium);
                } else if (state.breakpoints[Breakpoints.Large]) {
                    this.screenSizeSource.next(ScreenSize.Large);
                } else if (state.breakpoints[Breakpoints.XLarge]) {
                    this.screenSizeSource.next(ScreenSize.XLarge);
                }
            });
        this.sub.add(sub);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
