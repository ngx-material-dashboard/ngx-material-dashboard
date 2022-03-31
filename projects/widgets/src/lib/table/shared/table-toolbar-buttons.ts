import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TableToolbarButton } from '../interfaces/table-toolbar-button.interface';

/**
 * A basic add button.
 */
export const CREATE_TOOLBAR_BUTTON: TableToolbarButton = {
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
export const EDIT_TOOLBAR_BUTTON: TableToolbarButton = {
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
export const DELETE_TOOLBAR_BUTTON: TableToolbarButton = {
    canDisable: true,
    disabled: true,
    icon: faTrash,
    multiSelectDisabled: false,
    text: 'Delete',
    click: 'delete'
};
