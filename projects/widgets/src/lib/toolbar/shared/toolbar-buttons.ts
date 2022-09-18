import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToolbarButton } from '../interfaces/toolbar-button.interface';

/**
 * A basic add button.
 */
export const CREATE_TOOLBAR_BUTTON: ToolbarButton = {
    canDisable: false,
    disabled: false,
    icon: faPlus,
    multiSelectDisabled: false,
    text: 'Add',
    click: 'create'
};

/**
 * A basic edit button.
 */
export const EDIT_TOOLBAR_BUTTON: ToolbarButton = {
    canDisable: true,
    disabled: true,
    icon: faEdit,
    multiSelectDisabled: true,
    text: 'Edit',
    click: 'edit'
};

/**
 * A basic delete button.
 */
export const DELETE_TOOLBAR_BUTTON: ToolbarButton = {
    canDisable: true,
    disabled: true,
    icon: faTrash,
    multiSelectDisabled: false,
    text: 'Delete',
    click: 'delete'
};

/** Default buttons for toolbar above collection. */
export const DEFAULT_TOOLBAR_BUTTONS = [
    CREATE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON
];
