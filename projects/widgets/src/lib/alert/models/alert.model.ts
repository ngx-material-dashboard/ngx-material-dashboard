/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { AlertInterface } from '../interfaces/alert.interface';
import { AlertType } from '../enums/alert-type.enum';

/**
 * The `Alert` class defines properties useful for tracking and rendering alert
 * messages.
 */
export class Alert implements AlertInterface {
    id!: string;
    type!: AlertType;
    message!: string;
    autoClose: boolean = true;
    keepAfterRouteChange?: boolean;
    fade: boolean = true;

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}
