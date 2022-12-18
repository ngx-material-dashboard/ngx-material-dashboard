import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../interfaces/button.interface';

/**
 * A basic edit button.
 */
export const EDIT_BUTTON: Button = {
    icon: faEdit,
    click: 'edit'
};

/**
 * A basic delete button.
 */
export const DELETE_BUTTON: Button = {
    icon: faTrash,
    click: 'delete'
};

/** Default buttons that appear in each row inside actions column. */
export const DEFAULT_COLLECTION_BUTTONS = [EDIT_BUTTON, DELETE_BUTTON];
