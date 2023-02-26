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
