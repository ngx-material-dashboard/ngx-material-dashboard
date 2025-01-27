/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import {
    trigger,
    transition,
    style,
    animate,
    group
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        group([
            animate('0.5s ease', style({ transform: 'translateY(-20%)' })),
            animate('600ms', style({ opacity: 0 }))
        ])
    ])
]);
