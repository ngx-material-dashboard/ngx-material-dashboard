import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface SidenavItem {
    children?: SidenavItem[];
    /** The icon to display next to the text (optional). */
    icon?: IconDefinition;
    queryParams?: any;
    /** The route to use when the item is clicked (optional if children not defined). */
    route?: any[];
    /** The CSS selector for the item. */
    selector: string;
    /** The text for the item. */
    text: string;
    /** The text to display as a tooltip over the item (optional). */
    tooltip?: string;
}
