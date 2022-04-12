import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MockModule } from 'ng-mocks';

import { Page } from '../../../../../test/helpers/page.helper';
import { LoadingService } from '../../services/loading.service';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
    let component: LoadingComponent;
    let fixture: ComponentFixture<LoadingComponent>;
    let page: Page<LoadingComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ LoadingComponent ],
            imports: [
                MockModule(MatProgressSpinnerModule)
            ],
            providers: [
                LoadingService
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = new Page(fixture);
    });

    it('should not display loading spinner by default (when loading is false)', () => {
        expect(page.query('.loading-spinner')).toBeNull();
    });

    it('should display loading spinner when loading is true', () => {
        // given: loading set to true
        component.loading = true;
        fixture.detectChanges();

        // expect
        expect(page.query('.loading-spinner')).toBeDefined();
    });
});
