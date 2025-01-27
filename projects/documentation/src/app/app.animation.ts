/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import {
    animate,
    query,
    style,
    transition,
    trigger
} from '@angular/animations';

export const ROUTE_ANIMATION = trigger('routeAnimation', [
    transition('* <=> *', [
        query(
            ':enter',
            [
                style({ opacity: 0, transform: 'translateY(32px)' }),
                animate(
                    '550ms cubic-bezier(0.35, 0, 0.25, 1)',
                    style({ opacity: 1, transform: 'translateY(0)' })
                )
            ],
            { optional: true }
        )
    ])
]);
