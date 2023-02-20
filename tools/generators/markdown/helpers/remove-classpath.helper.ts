import * as Handlebars from 'handlebars';

export default function () {
    Handlebars.registerHelper('removeClasspath', function (val: string) {
        if (val && val.indexOf('.') > 0) {
            return val.substring(val.indexOf('.'));
        } else {
            return val;
        }
    });
}
