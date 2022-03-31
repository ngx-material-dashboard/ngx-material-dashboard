import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * A button to display above a table. A toolbar button should have either a click or href defined. The
 * click will need to be handled programmatically, while the href should be handled by the browser (but
 * should only be used for downloading files directly; at least for now).
 */
export interface TableToolbarButton {
    /**
     * Boolean value to indicate whether the button can be disabled (based on selections in table;
     * i.e. 'add' button should not be disabled).
     */
    canDisable: boolean;
    /** Boolean value to indicate whether the button should be disabled/enabled (defaults to disabled). */
    disabled: boolean;
    /** The link to use when the button is clicked (should be a link to directly download file; at least for now). */
    href?: string;
    /** The icon to display next to the text. */
    icon?: IconDefinition;
    /** A stacked icon. */
    stackedIcon?: IconDefinition;
    /** Styles specific to stacked icon. */
    stackedIconStyles?: {};
    /** Boolean value to indicate whether the button should be disabled if more than one row selected. */
    multiSelectDisabled?: boolean;
    /** The text for the item (required). */
    text: string;
    /** The tooltip to display when the user hovers over the button. */
    tooltip?: string;
    /** The function to execute when the button is clicked.  */
    click?: string;
}
