import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * A button to render in a table row.
 */
export interface TableButton {
    /** The action the button performs (i.e. 'add', 'edit'). */
    click: string;
    /** Boolean value to indicate whether the button should be disabled. */
    disabled: boolean;
    /** The icon to display in the button. */
    icon: IconDefinition;
    /** Boolean value to indicate whether the button can be clicked when multiple values selected. */
    multiSelectDisabled: boolean;
    /** The text to display in the button. */
    text: string;
}
