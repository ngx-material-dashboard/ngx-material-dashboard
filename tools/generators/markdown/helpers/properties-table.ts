import * as Handlebars from 'handlebars';
import { Property } from '../../../converters/typedoc-json/models/property.model';

export default function() {
    Handlebars.registerHelper("propertiesTable", function(properties: Property[]) {
        const headers = ['Name', 'Description'];
    
        const rows = properties.map((property: Property) => {
            const row: string[] = [];
            const nameCol: string[] = [];
            nameCol.push(property.name + ':');
            nameCol.push(property.displayType);
    
            const descriptionCol: string[] = [];
            descriptionCol.push(property.description ? property.description : '');
    
            row.push(nameCol.join(' '));
            row.push(descriptionCol.join(' '));
            return `| ${row.join(' | ')} |\n`;
        });
    
        const output = `\n| ${headers.join(' | ')} |\n| ${headers
            .map(() => ':------:')
            .join(' | ')} |\n${rows.join('')}`;
        return output;
    });
}
