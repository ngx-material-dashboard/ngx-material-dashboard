/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { AlertType } from '../enums/alert-type.enum';

/**
 * Properties needed for alerts rendered on screen to user.
 */
export interface AlertInterface {
    /** Identifier for alerts. */
    id?: string;
    /** The type of alert. */
    type?: AlertType;
    /** The text to include in the alert. */
    message?: string;
    /** Boolean value to indicate if alert should close automatically. */
    autoClose?: boolean;
    /** Boolean value to indicate if alert should remain after route changes. */
    keepAfterRouteChange?: boolean;
    /** Boolean value to indiciate if alert should fade out. */
    fade?: boolean;
}
