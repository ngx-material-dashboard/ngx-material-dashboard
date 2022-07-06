import * as Handlebars from 'handlebars';

export default function() {
    Handlebars.registerHelper("curlyBracket", function(open: boolean) {
        return open ? '{' : '}';
    })
}
