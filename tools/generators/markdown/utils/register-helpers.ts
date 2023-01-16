import Contains from '../helpers/contains';
import CurlyBracket from '../helpers/curly-brackets';
import PropertiesTable from '../helpers/properties-table';
import ReformatTextHelper from '../helpers/reformat-text.helper';

export function registerHelpers() {
    Contains();
    CurlyBracket();
    PropertiesTable();
    ReformatTextHelper();
}
