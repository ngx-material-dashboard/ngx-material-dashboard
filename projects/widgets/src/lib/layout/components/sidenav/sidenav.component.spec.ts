import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { SidenavComponent } from './sidenav.component';
import { SidenavItem } from '../../interfaces/sidenav.interface';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    let mockRouter: any;
    let pageElement: SidenavElement;

    describe('Root route (i.e. "/")', () => {

        beforeEach(() => {
            mockRouter = {
                navigate(): void {},
                url: '/'
            }
            init(mockRouter);

            fixture = TestBed.createComponent(SidenavComponent);
            component = fixture.componentInstance;
            component.sidenavItems = [{ route: [''], selector: 'home', text: 'Home' }];
            fixture.detectChanges();

            pageElement = new SidenavElement(fixture, ['home']);
        });

        it('should highlight sidenav item when route matches "/"', () => {
            // expect: there should only be one highlighted sidenav item
            const selectedSidenavItemElements: HTMLElement[] = pageElement.queryAll('.selected-list-item');
            expect(selectedSidenavItemElements.length).toEqual(1);

            // and: the active sidenavItem content should match the 'Home' sidenavItem
            expect(pageElement.isListItemActive('home')).toEqual(true);
        });
    });

    describe('Basic SidenavItems', () => {
        const sidenavItems: SidenavItem[] = [{ route: ['1'], selector: '1', text: '1' }, { route: ['2'], selector: '2', text: '2' }];

        /**
         * Loop through each of the sidenavItems for the tests below.
         */
        sidenavItems.forEach((item: SidenavItem) => {
            describe(`${item.text} SidenavItem`, () => {
                beforeEach(() => {
                    // mock for the Router object
                    mockRouter = {
                        // mock navigate function since we only need to ensure it was called
                        navigate(): void {},
                        // mock the current URL to match the sidenav item under test
                        url: item.route ? item.route.join('/') : item.text.toLowerCase().split(' ').join('-')
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
                    const selectedSidenavItemElements: HTMLElement[] = pageElement.queryAll('.selected-list-item');
                    expect(selectedSidenavItemElements.length).toEqual(1);

                    // and: the active sidenavItem content should match the current sidenavItem
                    expect(pageElement.isListItemActive(item.selector)).toEqual(true);
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
        const sidenavItems: SidenavItem[] = [{ route: ['requests'], selector: 'pendingRequests', text: 'Pending Requests', queryParams: { status: 'Pending' } }];

        describe('Route matches sidenavItem', () => {
            beforeEach(() => {
                mockRouter = {
                    navigate(): void {},
                    url: 'requests?status=Pending'
                }
                init(mockRouter, { status: 'Pending' });
    
                fixture = TestBed.createComponent(SidenavComponent);
                component = fixture.componentInstance;
                component.sidenavItems = sidenavItems;
                fixture.detectChanges();
    
                pageElement = new SidenavElement(fixture, ['pendingRequests']);
            });
    
            it('should highlight sidenav item', () => {
                // expect: there should only be one highlighted sidenav item
                const selectedSidenavItemElements: HTMLElement[] = pageElement.queryAll('.selected-list-item');
                expect(selectedSidenavItemElements.length).toEqual(1);
    
                // and: the active sidenavItem content should match the current sidenavItem
                expect(pageElement.isListItemActive('pendingRequests')).toEqual(true);
            });
        });

        describe('Route does not match sidenavItem', () => {

            describe('Different URL and same queryParams', () => {
                beforeEach(() => {
                    mockRouter = {
                        navigate(): void {},
                        url: 'additional-requests?status=Pending'
                    }
                    init(mockRouter, { status: 'Pending' });
        
                    fixture = TestBed.createComponent(SidenavComponent);
                    component = fixture.componentInstance;
                    component.sidenavItems = sidenavItems;
                    fixture.detectChanges();
        
                    pageElement = new SidenavElement(fixture, ['pendingRequests']);
                });
    
                it('should not highlight sidenav item', () => {
                    expect(pageElement.isListItemActive('pendingRequests')).toBeFalse();
                });
    
                it('should navigate to route of given sidenavItem when item clicked', async() => {
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
                        navigate(): void {},
                        url: 'requests?status=Approved'
                    }
                    init(mockRouter, { status: 'Approved' });
        
                    fixture = TestBed.createComponent(SidenavComponent);
                    component = fixture.componentInstance;
                    component.sidenavItems = sidenavItems;
                    fixture.detectChanges();
        
                    pageElement = new SidenavElement(fixture, ['pendingRequests']);
                });
    
                it('should not highlight sidenav item', () => {
                    expect(pageElement.isListItemActive('pendingRequests')).toBeFalse();
                });
    
                it('should navigate to route of given sidenavItem when item clicked', async() => {
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
                        navigate(): void {},
                        url: 'requests?status=Pending&isComplete=true'
                    }
                    init(mockRouter, { status: 'Pending', isComplete: true });
        
                    fixture = TestBed.createComponent(SidenavComponent);
                    component = fixture.componentInstance;
                    component.sidenavItems = sidenavItems;
                    fixture.detectChanges();
        
                    pageElement = new SidenavElement(fixture, ['pendingRequests']);
                });
    
                it('should not highlight sidenav item', () => {
                    expect(pageElement.isListItemActive('pendingRequests')).toBeFalse();
                });
    
                it('should navigate to route of given sidenavItem when item clicked', async() => {
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
        const children: SidenavItem[] = [{ route: ['1'], selector: '1', text: '1'}, { route: ['2'], selector: '2', text: '2', queryParams: { status: 'Pending' }}];
        const sidenavItems: SidenavItem[] = [{ children: children, selector: 'requests', text: 'Requests' }];

        beforeEach(() => {
            mockRouter = {
                navigate(): void {},
                url: '1'
            }
            init(mockRouter);

            fixture = TestBed.createComponent(SidenavComponent);
            component = fixture.componentInstance;
            component.sidenavItems = sidenavItems;
            fixture.detectChanges();

            pageElement = new SidenavElement(fixture, ['requests'], ['1', '2']);
        });

        it('should expand parent sidenavItem and highlight child', () => {
            // expect: there should only be one highlighted sidenav item
            const selectedSidenavItemElements: HTMLElement[] = pageElement.queryAll('.selected-list-item');
            expect(selectedSidenavItemElements.length).toEqual(1);

            // and: the active sidenavItem content should match the current sidenavItem
            expect(pageElement.isListItemActive('1')).toEqual(true);

            // and: the parent should be expanded (i.e. have angle down icon)
            expect(pageElement.isListItemExpanded('requests')).toEqual(true);
        });

        it('should close parent when sidenavItem is clicked', () => {
            // when: the button is clicked
            pageElement.clickListItem('requests');

            // then: the parent should be collapsed (i.e. have angle right icon)
            expect(pageElement.isListItemExpanded('requests')).toEqual(false);
        });

        it('should navigate to 2nd child when sidenavItem is clicked', async() => {
            // given: a spy on the navigate function
            const spy = spyOn(mockRouter, 'navigate');

            // when: the button is clicked
            await pageElement.clickListItem('2');

            // then: the navigate function should have been called
            expect(spy).toHaveBeenCalled();
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
        }
    ];

    TestBed.configureTestingModule({
        declarations: [ SidenavComponent ],
        imports: [
            RouterTestingModule,
            MockModule(MatListModule),
            MockModule(MatSidenavModule),
            MockModule(FontAwesomeModule)
        ],
        providers
    });
}
