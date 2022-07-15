import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TableButton } from '../interfaces/table-button.interface';

/**
 * A basic edit button.
 */
export const EDIT_BUTTON: TableButton = {
    icon: faEdit,
    click: 'edit'
};

/**
 * A basic delete button.
 */
export const DELETE_BUTTON: TableButton = {
    icon: faTrash,
    click: 'delete'
};
