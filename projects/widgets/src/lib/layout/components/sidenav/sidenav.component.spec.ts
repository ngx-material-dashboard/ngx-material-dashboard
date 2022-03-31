import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockModule } from 'ng-mocks';

import { Page } from '../../../../../test/helpers/page.helper';
import { SidenavComponent } from './sidenav.component';
import { SidenavItem } from '../../interfaces/sidenav.interface';
import { of } from 'rxjs';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    let mockRouter: any;
    let page: Page<SidenavComponent>;

    describe('Root route (i.e. "/")', () => {

        beforeEach(() => {
            mockRouter = {
                navigate(): void {},
                url: '/'
            }
            init(mockRouter);

            fixture = TestBed.createComponent(SidenavComponent);
            component = fixture.componentInstance;
            component.sidenavItems = [{ route: [''], text: 'Home' }];
            fixture.detectChanges();

            page = new Page<SidenavComponent>(fixture);
        });

        it('should highlight sidenav item when route matches "/"', () => {
            // expect: there should only be one highlighted sidenav item
            const selectedSidenavItemElements: HTMLElement[] = page.queryAll('.selected-list-item');
            expect(selectedSidenavItemElements.length).toEqual(1);

            // and: the active sidenavItem content should match the current sidenavItem
            const selectedSidenavItem = selectedSidenavItemElements[0];
            const appListItem = selectedSidenavItem.getElementsByClassName('marker-list-item-text').item(0);
            expect(appListItem?.innerHTML).toEqual('Home');
        });
    });

    describe('Basic SidenavItems', () => {
        const sidenavItems: SidenavItem[] = [{ route: ['1'], text: '1' }, { route: ['2'], text: '2' }];

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

                    page = new Page<SidenavComponent>(fixture);
                });

                it(`should highlight sidenav item with text "${item.text}" when route matches`, () => {
                    // expect: there should only be one highlighted sidenav item
                    const selectedSidenavItemElements: HTMLElement[] = page.queryAll('.selected-list-item');
                    expect(selectedSidenavItemElements.length).toEqual(1);

                    // and: the active sidenavItem content should match the current sidenavItem
                    const selectedSidenavItem = selectedSidenavItemElements[0];
                    const appListItem = selectedSidenavItem.getElementsByClassName('marker-list-item-text').item(0);
                    expect(appListItem?.innerHTML).toEqual(item.text);
                });

                it('should navigate to route of given sidenavItem when item clicked', () => {
                    // given: the button in the sidenavItem
                    const button: HTMLButtonElement = page.query(`.marker-list-item-button-${item.text}`);

                    // and: a spy on the navigate function
                    const spy = spyOn(mockRouter, 'navigate');

                    // when: the button is clicked
                    button.click();

                    // then: the navigate function should have been called
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });

    describe('SidenavItem with queryParams', () => {
        const sidenavItems: SidenavItem[] = [{ route: ['requests'], text: 'Pending Requests', queryParams: { status: 'Pending' } }];

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
    
                page = new Page<SidenavComponent>(fixture);
            });
    
            it('should highlight sidenav item', () => {
                // expect: there should only be one highlighted sidenav item
                const selectedSidenavItemElements: HTMLElement[] = page.queryAll('.selected-list-item');
                expect(selectedSidenavItemElements.length).toEqual(1);
    
                // and: the active sidenavItem content should match the current sidenavItem
                const selectedSidenavItem = selectedSidenavItemElements[0];
                const appListItem = selectedSidenavItem.getElementsByClassName('marker-list-item-text').item(0);
                expect(appListItem?.innerHTML).toEqual('Pending Requests');
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
        
                    page = new Page<SidenavComponent>(fixture);
                });
    
                it('should not highlight sidnav item', () => {
                    expect(page.queryAll('.selected-list-item').length).toEqual(0);
                });
    
                it('should navigate to route of given sidenavItem when item clicked', () => {
                    // given: the button in the sidenavItem
                    const button: HTMLButtonElement = page.query(`.marker-list-item-button-Pending`);
    
                    // and: a spy on the navigate function
                    const spy = spyOn(mockRouter, 'navigate');
    
                    // when: the button is clicked
                    button.click();
    
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
        
                    page = new Page<SidenavComponent>(fixture);
                });
    
                it('should not highlight sidnav item', () => {
                    expect(page.queryAll('.selected-list-item').length).toEqual(0);
                });
    
                it('should navigate to route of given sidenavItem when item clicked', () => {
                    // given: the button in the sidenavItem
                    const button: HTMLButtonElement = page.query(`.marker-list-item-button-Pending`);
    
                    // and: a spy on the navigate function
                    const spy = spyOn(mockRouter, 'navigate');
    
                    // when: the button is clicked
                    button.click();
    
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
        
                    page = new Page<SidenavComponent>(fixture);
                });
    
                it('should not highlight sidnav item', () => {
                    expect(page.queryAll('.selected-list-item').length).toEqual(0);
                });
    
                it('should navigate to route of given sidenavItem when item clicked', () => {
                    // given: the button in the sidenavItem
                    const button: HTMLButtonElement = page.query(`.marker-list-item-button-Pending`);
    
                    // and: a spy on the navigate function
                    const spy = spyOn(mockRouter, 'navigate');
    
                    // when: the button is clicked
                    button.click();
    
                    // then: the navigate function should have been called
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });

    describe('Sidenavitems with children', () => {
        const children: SidenavItem[] = [{ route: ['1'], text: '1'}, { route: ['2'], text: '2', queryParams: { status: 'Pending' }}];
        const sidenavItems: SidenavItem[] = [{ children: children, text: 'Requests' }];

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

            page = new Page<SidenavComponent>(fixture);
        });

        it('should expand parent sidenavItem and highlight child', () => {
            // expect: there should only be one highlighted sidenav item
            const selectedSidenavItemElements: HTMLElement[] = page.queryAll('.selected-list-item');
            expect(selectedSidenavItemElements.length).toEqual(1);

            // and: the active sidenavItem content should match the current sidenavItem
            const selectedSidenavItem = selectedSidenavItemElements[0];
            const appListItem = selectedSidenavItem.getElementsByClassName('marker-list-item-text').item(0);
            expect(appListItem?.innerHTML).toEqual('1');

            // and: the parent should be expanded (i.e. have angle down icon)
            const parent: HTMLElement = page.query('.marker-list-item-button-Requests');
            expect(parent.querySelector('.marker-angle-down')).toBeDefined();
        });

        it('should close parent when sidenavItem is clicked', () => {
            // given: the button in the sidenavItem
            const button: HTMLButtonElement = page.query('.marker-list-item-button-Requests');

            // when: the button is clicked
            button.click();

            // then: the parent should be collapsed (i.e. have angle right icon)
            expect(button.querySelector('.marker-angle-right')).toBeDefined();
        });

        it('should navigate to 2nd child when sidenavItem is clicked', () => {
            // given: the button in the sidenavItem
            const button: HTMLButtonElement = page.query('.marker-list-item-button-2');
    
            // and: a spy on the navigate function
            const spy = spyOn(mockRouter, 'navigate');

            // when: the button is clicked
            button.click();

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
