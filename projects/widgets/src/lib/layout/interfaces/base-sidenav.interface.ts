import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface BaseSidenavItem {
    /** The icon to display next to the text (optional). */
    icon?: IconDefinition;
    /** Optional parameters to include in route (should be JSON object literal). */
    queryParams?: any;
    /** The CSS selector for the item. */
    selector: string;
    /** The text for the item. */
    text: string;
    /** The text to display as a tooltip over the item (optional). */
    tooltip?: string;
}
