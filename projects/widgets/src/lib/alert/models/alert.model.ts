import { AlertType } from '../enums/alert-type.enum';

/**
 * The `Alert` class defines properties useful for tracking and rendering alert
 * messages.
 */
export class Alert {
    /** Identifier for alerts. */
    id!: string;
    /** The type of alert. */
    type!: AlertType;
    /** The text to include in the alert. */
    message!: string;
    /** Boolean value to indicate if alert should close automatically. */
    autoClose: boolean = true;
    /** Boolean value to indicate if alert should remain after route changes. */
    keepAfterRouteChange?: boolean;
    /** Boolean value to indiciate if alert should fade out. */
    fade: boolean = true;

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}
