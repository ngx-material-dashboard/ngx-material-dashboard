import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { SidenavComponent } from './sidenav.component';
import { SidenavItem } from '../../interfaces/sidenav.interface';
import { SidenavItemWithRoute } from '../../interfaces/sidenav-with-route.interface';
import { SidenavUtilService } from '../../services/sidenav-util.service';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    let mockRouter: any;
    let pageElement: SidenavElement;

    describe('Root route (i.e. "/")', () => {
        beforeEach(() => {
            mockRouter = {
                events: of({}),
                navigate(): void {},
                url: '/'
            };
            init(mockRouter);

            fixture = TestBed.createComponent(SidenavComponent);
            component = fixture.componentInstance;
            component.sidenavItems = [
                { route: [''], selector: 'home', text: 'Home' }
            ];
            fixture.detectChanges();

            pageElement = new SidenavElement(fixture, ['home']);
        });

        it('should highlight sidenav item when route matches "/"', () => {
            // expect: there should only be one highlighted sidenav item
            const selectedSidenavItemElements: HTMLElement[] =
                pageElement.queryAll('.selected-list-item');
            expect(selectedSidenavItemElements.length).toEqual(1);

            // and: the active sidenavItem content should match the 'Home' sidenavItem
            expect(pageElement.isListItemActive('home')).toEqual(true);
        });
    });

    describe('Basic SidenavItems', () => {
        const sidenavItems: SidenavItemWithRoute[] = [
            { route: ['1'], selector: '1', text: '1' },
            { route: ['2'], selector: '2', text: '2' }
        ];

        /**
         * Loop through each of the sidenavItems for the tests below.
         */
        sidenavItems.forEach((item: SidenavItemWithRoute) => {
            describe(`${item.text} SidenavItem`, () => {
                beforeEach(() => {
                    // mock for the Router object
                    mockRouter = {
                        events: of({}),
                        // mock navigate function since we only need to ensure it was called
                        navigate(): void {},
                        // mock the current URL to match the sidenav item under test
                        url: item.route
                            ? item.route.join('/')
                            : item.text.toLowerCase().split(' ').join('-')
                    };
                    init(mockRouter);
                });

                beforeEach(() => {
                    fixture = TestBed.createComponent(SidenavComponent);
                    component = fixture.componentInstance;
                    component.sidenavItems = sidenavItems;
                    fixture.detectChanges();

                    pageElement = new SidenavElement(fixture, ['1', '2']);
                });

                it(`should highlight sidenav item with text "${item.text}" when route matches`, () => {
                    // expect: there should only be one highlighted sidenav item
                    const selectedSidenavItemElements: HTMLElement[] =
                        pageElement.queryAll('.selected-list-item');
                    expect(selectedSidenavItemElements.length).toEqual(1);

                    // and: the active sidenavItem content should match the current sidenavItem
                    expect(pageElement.isListItemActive(item.selector)).toEqual(
                        true
                    );
                });

                it('should navigate to route of given sidenavItem when item clicked', () => {
                    // given: a spy on the navigate function
                    const spy = spyOn(mockRouter, 'navigate');

                    // when: the button is clicked
                    pageElement.clickListItem(item.selector);

                    // then: the navigate function should have been called
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });

    describe('SidenavItem with queryParams', () => {
        const sidenavItems: SidenavItem[] = [
            {
                route: ['requests'],
                selector: 'pendingRequests',
                text: 'Pending Requests',
                queryParams: { status: 'Pending' }
            }
        ];

        describe('Route matches sidenavItem', () => {
            beforeEach(() => {
                mockRouter = {
                    events: of({}),
                    navigate(): void {},
                    url: 'requests?status=Pending'
                };
                init(mockRouter, { status: 'Pending' });

                fixture = TestBed.createComponent(SidenavComponent);
                component = fixture.componentInstance;
                component.sidenavItems = sidenavItems;
                fixture.detectChanges();

                pageElement = new SidenavElement(fixture, ['pendingRequests']);
            });

            it('should highlight sidenav item', () => {
                // expect: there should only be one highlighted sidenav item
                const selectedSidenavItemElements: HTMLElement[] =
                    pageElement.queryAll('.selected-list-item');
                expect(selectedSidenavItemElements.length).toEqual(1);

                // and: the active sidenavItem content should match the current sidenavItem
                expect(pageElement.isListItemActive('pendingRequests')).toEqual(
                    true
                );
            });
        });

        describe('Route does not match sidenavItem', () => {
            describe('Different URL and same queryParams', () => {
                beforeEach(() => {
                    mockRouter = {
                        events: of({}),
                        navigate(): void {},
                        url: 'additional-requests?status=Pending'
                    };
                    init(mockRouter, { status: 'Pending' });

                    fixture = TestBed.createComponent(SidenavComponent);
                    component = fixture.componentInstance;
                    component.sidenavItems = sidenavItems;
                    fixture.detectChanges();

                    pageElement = new SidenavElement(fixture, [
                        'pendingRequests'
                    ]);
                });

                it('should not highlight sidenav item', () => {
                    expect(
                        pageElement.isListItemActive('pendingRequests')
                    ).toBeFalse();
                });

                it('should navigate to route of given sidenavItem when item clicked', async () => {
                    // given: a spy on the navigate function
                    const spy = spyOn(mockRouter, 'navigate');

                    // when: the button is clicked
                    pageElement.clickListItem('pendingRequests');

                    // then: the navigate function should have been called
                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('Same URL but different queryParam', () => {
                beforeEach(() => {
                    mockRouter = {
                        events: of({}),
                        navigate(): void {},
                        url: 'requests?status=Approved'
                    };
                    init(mockRouter, { status: 'Approved' });

                    fixture = TestBed.createComponent(SidenavComponent);
                    component = fixture.componentInstance;
                    component.sidenavItems = sidenavItems;
                    fixture.detectChanges();

                    pageElement = new SidenavElement(fixture, [
                        'pendingRequests'
                    ]);
                });

                it('should not highlight sidenav item', () => {
                    expect(
                        pageElement.isListItemActive('pendingRequests')
                    ).toBeFalse();
                });

                it('should navigate to route of given sidenavItem when item clicked', async () => {
                    // given: a spy on the navigate function
                    const spy = spyOn(mockRouter, 'navigate');

                    // when: the button is clicked
                    await pageElement.clickListItem('pendingRequests');

                    // then: the navigate function should have been called
                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('Same URL but additional queryParams', () => {
                beforeEach(() => {
                    mockRouter = {
                        events: of({}),
                        navigate(): void {},
                        url: 'requests?status=Pending&isComplete=true'
                    };
                    init(mockRouter, { status: 'Pending', isComplete: true });

                    fixture = TestBed.createComponent(SidenavComponent);
                    component = fixture.componentInstance;
                    component.sidenavItems = sidenavItems;
                    fixture.detectChanges();

                    pageElement = new SidenavElement(fixture, [
                        'pendingRequests'
                    ]);
                });

                it('should not highlight sidenav item', () => {
                    expect(
                        pageElement.isListItemActive('pendingRequests')
                    ).toBeFalse();
                });

                it('should navigate to route of given sidenavItem when item clicked', async () => {
                    // given: a spy on the navigate function
                    const spy = spyOn(mockRouter, 'navigate');

                    // when: the button is clicked
                    await pageElement.clickListItem('pendingRequests');

                    // then: the navigate function should have been called
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });

    describe('Sidenavitems with children', () => {
        const children1: SidenavItem[] = [
            { route: ['1'], selector: '1', text: '1' },
            {
                route: ['2'],
                selector: '2',
                text: '2',
                queryParams: { status: 'Pending' }
            },
            { route: ['3'], selector: '3', text: '3' }
        ];
        const children2: SidenavItem[] = [
            { route: ['4'], selector: '4', text: '4' }
        ];
        const sidenavItems: SidenavItem[] = [
            { children: children1, selector: 'requests', text: 'Requests' },
            { children: children2, selector: 'results', text: 'Results' }
        ];

        describe('SidenavItem with children active', () => {
            beforeEach(() => {
                mockRouter = {
                    events: of({}),
                    navigate(): void {},
                    url: '/requests/1'
                };
                init(mockRouter);

                fixture = TestBed.createComponent(SidenavComponent);
                component = fixture.componentInstance;
                component.sidenavItems = sidenavItems;
                fixture.detectChanges();

                pageElement = new SidenavElement(
                    fixture,
                    ['requests', 'results'],
                    ['1', '2', '3', '4']
                );
            });

            it('should expand parent sidenavItem and highlight child', () => {
                // expect: there should only be one highlighted sidenav item
                const selectedSidenavItemElements: HTMLElement[] =
                    pageElement.queryAll('.selected-list-item');
                expect(selectedSidenavItemElements.length).toEqual(1);

                // and: the active sidenavItem content should match the current sidenavItem
                expect(pageElement.isListItemActive('1')).toEqual(true);

                // and: the parent should be expanded (i.e. have angle down icon)
                expect(pageElement.isListItemExpanded('requests')).toEqual(
                    true
                );
            });

            it('should close parent when sidenavItem is clicked', () => {
                // when: the button is clicked
                pageElement.clickListItem('requests');

                // then: the parent should be collapsed (i.e. have angle right icon)
                expect(pageElement.isListItemExpanded('requests')).toEqual(
                    false
                );
            });

            it('should navigate to 2nd child when sidenavItem is clicked', async () => {
                // given: a spy on the navigate function
                const spy = spyOn(mockRouter, 'navigate');

                // when: the button is clicked
                await pageElement.clickListItem('2');

                // then: the navigate function should have been called
                expect(spy).toHaveBeenCalled();
            });

            it('should navigate to 3rd child when sidenavItem is clicked', async () => {
                // given: a spy on the navigate function
                const spy = spyOn(mockRouter, 'navigate');

                // when: the button is clicked
                await pageElement.clickListItem('3');

                // then: the navigate function should have been called
                expect(spy).toHaveBeenCalled();
            });

            it('should return false for isToggled when given item index does not exist', () => {
                expect(component.isToggled(-1)).toBeFalse();
            });
        });

        describe('SidenavItem without children active', () => {
            beforeEach(() => {
                mockRouter = {
                    events: of({}),
                    navigate(): void {},
                    url: '/results'
                };
                init(mockRouter);

                fixture = TestBed.createComponent(SidenavComponent);
                component = fixture.componentInstance;
                component.sidenavItems = sidenavItems;
                fixture.detectChanges();

                pageElement = new SidenavElement(
                    fixture,
                    ['requests', 'results'],
                    ['1', '2', '3', '4']
                );
            });

            it('should expand results item by default', () => {
                expect(pageElement.isListItemExpanded('results')).toBeTrue();
            });
        });

        describe('Rail sidenav', () => {
            let sidenavUtilService: SidenavUtilService;

            beforeEach(() => {
                mockRouter = {
                    events: of({}),
                    navigate(): void {},
                    url: '/requests'
                };
                init(mockRouter);

                sidenavUtilService = TestBed.inject(SidenavUtilService);
                fixture = TestBed.createComponent(SidenavComponent);
                component = fixture.componentInstance;
                component.mode = 'rail';
                component.sidenavItems = sidenavItems;
                fixture.detectChanges();

                pageElement = new SidenavElement(
                    fixture,
                    ['requests', 'results'],
                    ['1', '2', '3', '4']
                );
            });

            it('should not render children when sidenav collapsed', () => {
                // when: the sidenav menu is collapsed
                sidenavUtilService.toggleSidenavMenu(false);
                fixture.detectChanges();

                // expect: the sidenavItem with children should not be toggled
                expect(pageElement.isListItemExpanded('results')).toBeFalse();
            });
        });
    });

    describe('Sidenavitems with grand children', () => {
        const grandChildren1: SidenavItem[] = [
            { route: ['1', 'g1'], selector: 'g1', text: 'g1' },
            {
                route: ['1', 'g11'],
                selector: 'g11',
                text: 'g11',
                queryParams: { status: 'Pending' }
            }
        ];
        const grandChildren2: SidenavItem[] = [
            { route: ['2', 'g2'], selector: 'g2', text: 'g2' },
            {
                route: ['2', 'g22'],
                selector: 'g22',
                text: 'g22',
                queryParams: { status: 'Pending' }
            }
        ];
        const grandChildren3: SidenavItem[] = [
            { route: ['3', 'g2'], selector: 'g3', text: 'g3' }
        ];
        const children1: SidenavItem[] = [
            { selector: '1', text: '1', children: grandChildren1 },
            { selector: '2', text: '2', children: grandChildren2 }
        ];
        const children2: SidenavItem[] = [
            { selector: '3', text: '3', children: grandChildren3 },
            { route: ['4'], selector: '4', text: '4' }
        ];
        const sidenavItems: SidenavItem[] = [
            { children: children1, selector: 'requests', text: 'Requests' },
            { children: children2, selector: 'results', text: 'Results' }
        ];

        describe('Route ends at grandChild (i.e. no sub routes)', () => {
            beforeEach(() => {
                mockRouter = {
                    events: of({}),
                    navigate(): void {},
                    url: '/requests/1/g1'
                };
                init(mockRouter);

                fixture = TestBed.createComponent(SidenavComponent);
                component = fixture.componentInstance;
                component.sidenavItems = sidenavItems;
                fixture.detectChanges();

                pageElement = new SidenavElement(
                    fixture,
                    ['requests', 'results'],
                    ['1', '2', '3', '4'],
                    ['g1', 'g11', 'g2', 'g22', 'g3']
                );
            });

            it('should expand parent sidenavItem and highlight child by default', () => {
                // expect: there should only be one highlighted sidenav item
                const selectedSidenavItemElements: HTMLElement[] =
                    pageElement.queryAll('.selected-list-item');
                expect(selectedSidenavItemElements.length).toEqual(1);

                // and: the active sidenavItem content should match the current sidenavItem
                expect(pageElement.isListItemActive('g1')).toEqual(true);

                // and: the parent should be expanded (i.e. have angle down icon)
                expect(pageElement.isListItemExpanded('1')).toEqual(true);

                // and: the grand parent should be expaned
                expect(pageElement.isListItemExpanded('requests')).toEqual(
                    true
                );

                // and the parent's sibling should not be expanded
                expect(pageElement.isListItemExpanded('2')).toEqual(false);
            });

            it('should return false for isChildToggled when given childItemIndex undefined', () => {
                expect(component.isChildToggled(0, -1)).toBeFalse();
            });

            it('should expand results sidenavItem when it is clicked', () => {
                pageElement.clickListItem('results');

                expect(pageElement.isListItemExpanded('results')).toBeTrue();
            });

            it('should expand child item 3 when it is clicked', async () => {
                await pageElement.clickListItem('results');
                await pageElement.clickListItem('3');

                expect(pageElement.isListItemExpanded('3')).toBeTrue();
            });

            it('should call selectGrandChild when grandchild item clicked', async () => {
                // given: a spy on the selectGrandChild method
                const spy = spyOn(
                    component,
                    'selectGrandChild'
                ).and.callThrough();

                // when: the g11 grandchild is clicked
                await pageElement.clickListItem('g11');

                // then: the spy should have been called
                expect(spy).toHaveBeenCalled();

                // when: the g1 granchilc is clicked
                await pageElement.clickListItem('g1');

                // then: the spy should have been called
                expect(spy).toHaveBeenCalled();
            });
        });

        describe('Route ends after grandChild (i.e. sub routes from tabs or something)', () => {
            beforeEach(() => {
                mockRouter = {
                    events: of({}),
                    navigate(): void {},
                    url: '/requests/1/g1/sub'
                };
                init(mockRouter);

                fixture = TestBed.createComponent(SidenavComponent);
                component = fixture.componentInstance;
                component.sidenavItems = sidenavItems;
                fixture.detectChanges();

                pageElement = new SidenavElement(
                    fixture,
                    ['requests'],
                    ['1', '2'],
                    ['g1', 'g11', 'g2', 'g22']
                );
            });

            it('should expand parent sidenavItem and highlight child', () => {
                // expect: there should only be one highlighted sidenav item
                const selectedSidenavItemElements: HTMLElement[] =
                    pageElement.queryAll('.selected-list-item');
                expect(selectedSidenavItemElements.length).toEqual(1);

                // and: the active sidenavItem content should match the current sidenavItem
                expect(pageElement.isListItemActive('g1')).toEqual(true);

                // and: the parent should be expanded (i.e. have angle down icon)
                expect(pageElement.isListItemExpanded('1')).toEqual(true);
            });
        });
    });
});

function init(mockRouter: any, queryParams: any = {}): void {
    const providers: any = [
        {
            provide: ActivatedRoute,
            useValue: {
                queryParams: of(queryParams)
            }
        },
        {
            provide: Router,
            useValue: mockRouter
        },
        SidenavUtilService
    ];

    TestBed.configureTestingModule({
        declarations: [SidenavComponent],
        imports: [
            RouterTestingModule,
            MockModule(MatBadgeModule),
            MockModule(MatListModule),
            MockModule(FontAwesomeModule)
        ],
        providers
    });
}
