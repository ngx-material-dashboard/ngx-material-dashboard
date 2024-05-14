import { Component, Input, OnInit } from '@angular/core';
import {
    IconDefinition,
    Styles,
    Transform
} from '@fortawesome/fontawesome-svg-core';

/**
 * The IconComponent is a basic wrapper for rendering either fa-icon or
 * mat-icon elements, based on given icon type. This is really just meant to
 * allow users to use either fontawesome or mat-icons when defining their
 * sidenav or toolbar buttons.
 *
 * *NOTE: This module and component are currently not available in the public
 * API for the widgets library. This is done on purpose because users should
 * not need to use this component directly, as they will have more
 * functionality using either fa-icon or mat-icon elements since not all
 * available features for either tag have been implemented here.
 */
@Component({
    selector: 'ngx-mat-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
    /** Optional boolean to make icon appear with fixed width (for FontAwesome, ignored for mat-icon). */
    @Input() fixedWidth: boolean | undefined;
    /** A FontAwesome IconDefinition or a mat-icon string. */
    @Input() icon!: IconDefinition | string;
    /** Optional styles to apply to FontAwesomeIcon (ignored for mat-icon). */
    @Input() styles: Styles | undefined;
    /** Optional transform to apply to FontAwesomeIcon (ignored for mat-icon). */
    @Input() transform: string | Transform | undefined;
    /**
     * Set to value of icon if it is IconDefinition. Used to make setting icon
     * for fa-icon element easier in template.
     */
    faIcon?: IconDefinition;

    ngOnInit(): void {
        if (typeof this.icon !== 'string') {
            this.faIcon = this.icon;
        }
    }
}
