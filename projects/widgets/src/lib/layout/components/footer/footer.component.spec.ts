import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FooterComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the current year', () => {
        // given: the current date
        const date = new Date(Date.now());

        // and: the native element at the root of the component
        const compiled = fixture.nativeElement;

        // expect: the full year should be rendered
        expect(compiled.querySelector('span').textContent).toContain(
            `${date.getFullYear()}`
        );
    });
});
