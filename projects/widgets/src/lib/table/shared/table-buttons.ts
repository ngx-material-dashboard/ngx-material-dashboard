import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TableButton } from '../interfaces/table-button.interface';

/**
 * A basic edit button.
 */
export const EDIT_BUTTON: TableButton = {
    disabled: true,
    icon: faEdit,
    multiSelectDisabled: true,
    text: 'Edit',
    click: 'edit'
};

/**
 * A basic delete button.
 */
export const DELETE_BUTTON: TableButton = {
    disabled: true,
    icon: faTrash,
    multiSelectDisabled: false,
    text: 'Delete',
    click: 'delete'
};
