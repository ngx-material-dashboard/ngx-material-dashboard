import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DefaultLayoutPage } from '@ngx-material-dashboard/testing';
import { MockComponents, MockModule } from 'ng-mocks';

import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { HeaderUserLoginComponent } from '../../components/header-user-login/header-user-login.component';
import { HeaderUserMenuComponent } from '../../components/header-user-menu/header-user-menu.component';
import { DefaultLayoutComponent } from './default-layout.component';
import { LoadingComponent } from '../../components/loading/loading.component';

describe('DefaultLayoutComponent', () => {
    let component: DefaultLayoutComponent;
    let fixture: ComponentFixture<DefaultLayoutComponent>;
    let page: DefaultLayoutPage;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DefaultLayoutComponent,
                HeaderComponent,
                MockComponents(FooterComponent, HeaderUserLoginComponent, HeaderUserMenuComponent, LoadingComponent, SidenavComponent)
            ],
            imports: [
                RouterTestingModule,
                MockModule(MatSidenavModule),
                MockModule(MatToolbarModule),
                MockModule(FontAwesomeModule)
            ],
            teardown: { destroyAfterEach: false }
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        page = new DefaultLayoutPage(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render app-header', () => {
        expect(page.query('app-header')).toBeDefined();
    });

    it('should render "My App" logo by default', () => {
        expect(page.header.logo).toEqual('My App');
    });

    it('should render app-footer', () => {
        expect(page.query('app-footer')).toBeDefined();
    });

    it('should render app-sidenav', () => {
        expect(page.query('app-sidenav')).toBeDefined();
    });

    it('should not render any sidenav items by default', () => {
        expect(page.sidenav.listItemsLength).toEqual(0);
    });

    it('should toggle the sidenav when the bars button is clicked', async() => {
        // given: a spy on the sidenav toggle method
        const spy = spyOn(component.sidenav, 'toggle');

        // when: the bars button is clicked in the header
        await page.header.clickButton('.marker-bars-button');

        // then: the sidenav toggle function should have been called
        expect(spy).toHaveBeenCalled();
    });
});
