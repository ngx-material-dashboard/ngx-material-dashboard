import * as Handlebars from 'handlebars';
import { reformatText } from '../../../generators/documentation/helpers';

export default function () {
    Handlebars.registerHelper('reformatText', function (val: string) {
        return reformatText(val);
    });
}
