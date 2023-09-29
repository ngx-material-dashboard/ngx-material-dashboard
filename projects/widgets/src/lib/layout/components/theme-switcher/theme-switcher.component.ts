import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFillDrip, faMinus } from '@fortawesome/free-solid-svg-icons';

/**
 * A button for switching themes, currently only switches between 2 themes
 * 'light' and 'dark'. For this component to work you must either use existing
 * themes or define your own (including palettes) in the styles for your
 * app AND call the theme mixin provided with this component for both
 * 'light' and 'dark' themes. This button is automatically included in the
 * header component (with optional configuration to hide it), but provided
 * separately so it can be placed anywhere else in your app.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <!-- just include this in any template you want to use the switcher -->
 * <ngx-mat-theme-switcher></ngx-mat-theme-switcher>
 * ```
 * ```scss
 * // add the following to your application styles, wherever you define your
 * // themes
 * @import '~@angular/material/theming';
 * @import '@ngx-material-dashboard/widgets/theme-switcher';
 *
 * // these are just custom palettes with primary, accent, etc., but you
 * // could use pre-defined ones
 * @import "light-theme";
 * @import "dark-theme";
 *
 * // call the theme mixin provided by component with 'light' and 'dark' themes
 * @include theme($light-theme, 'light');
 * @include theme($dark-theme, 'dark');
 * ```
 */
@Component({
    selector: 'ngx-mat-theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
    faMinus: IconDefinition = faMinus;
    faFillDrip: IconDefinition = faFillDrip;
    theme = 'light';
    nextTheme = 'dark';

    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngOnInit(): void {
        this.setTheme(localStorage.getItem('theme') || 'light');
    }

    setTheme(theme: string): void {
        this.nextTheme = theme === 'light' ? 'dark' : 'light';
        this.theme = theme;
        const bodyClassList = this.document.querySelector('body')?.classList;
        if (bodyClassList) {
            const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
            if (removeClassList) {
                bodyClassList.remove(...removeClassList);
            }
            bodyClassList.add(`${this.theme}-theme`);
            localStorage.setItem('theme', this.theme);
        }
    }
}
