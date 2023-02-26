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
