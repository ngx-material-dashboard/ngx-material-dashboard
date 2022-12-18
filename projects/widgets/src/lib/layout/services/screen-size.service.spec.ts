import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { Observable, from, filter, map } from 'rxjs';

import { ScreenSize } from '../enums/screen-size.enum';
import { ScreenSizeService } from './screen-size.service';

// tests based on stackoverflow response below; NOTE did have to update mocked
// return value to include breakpoints (maybe due to way service is written?)
// https://stackoverflow.com/a/53275348

describe('ScreenSizeService', () => {
    let service: ScreenSizeService;
    const widths: number[] = [500, 600, 960, 1800, 1920];
    // an array of breakpoint match values; initially all are false
    const matchObj = [
        {
            matchStr: '(max-width: 599.98px)',
            result: false,
            bp: Breakpoints.XSmall
        },
        {
            matchStr: '(min-width: 600px) and (max-width: 959.98px)',
            result: false,
            bp: Breakpoints.Small
        },
        {
            matchStr: '(min-width: 960px) and (max-width: 1279.98px)',
            result: false,
            bp: Breakpoints.Medium
        },
        {
            matchStr: '(min-width: 1280px) and (max-width: 1919.98px)',
            result: false,
            bp: Breakpoints.Large
        },
        {
            matchStr: '(min-width: 1920px)',
            result: false,
            bp: Breakpoints.XLarge
        }
    ];
    // A fake observable for returning breakpoint matches based on values
    // defined in matchObj (updating using resize function)
    const fakeObserve = (s: string[]): Observable<BreakpointState> =>
        from(matchObj).pipe(
            filter((match) => match.result),
            map((match) => {
                // set breakpoints to map of breakpoint name to result from
                // matchObj; service looks at breakpoints['<name>'] when
                // determining size to return
                const breakpoints: any = {};
                matchObj.forEach((it) => {
                    breakpoints[it.bp] = it.result;
                });

                return { matches: match.result, breakpoints: breakpoints };
            })
        );
    // a spy on the breakpointobserver observe method
    const bpSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);

    /**
     * Updates the matchObj to return breakpoints that match the given screen
     * width. Useful for testing things that rely on breakpoint sizes.
     *
     * @param width The width of the screen to set.
     */
    function resize(width: number): void {
        matchObj[0].result = width <= 599.98;
        matchObj[1].result = width >= 600 && width <= 959.98;
        matchObj[2].result = width >= 960 && width <= 1279.98;
        matchObj[3].result = width >= 1280 && width <= 1919.98;
        matchObj[4].result = width >= 1920;
    }

    beforeEach(() => {
        // setup spy to call fake observable defined above
        bpSpy.observe.and.callFake(fakeObserve);
        TestBed.configureTestingModule({
            providers: [
                ScreenSizeService,
                { provide: BreakpointObserver, useValue: bpSpy }
            ]
        });
    });

    // loop through each width and test expected screensize matches
    widths.forEach((width: number, index: number) => {
        it(`should set screenSizeSource to "${ScreenSize[index]}"`, () => {
            resize(width);
            service = TestBed.inject(ScreenSizeService);
            service.screenSize.subscribe((s: ScreenSize) => {
                expect(ScreenSize[s]).toEqual(ScreenSize[index]);
            });
        });
    });
});
