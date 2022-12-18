import { Parameter } from './parameter.model';
import { Property } from './property.model';
import { Signature } from './signature.model';
import { TypeModel } from './type.model';
import { TypedocBase } from './typedoc-base.model';

/**
 * The Declaration model object defines necessary information for tracking JSON
 * object literals in typedoc output, and automatically defines displayName for
 * rendering details in markdown. This will handle basic JSON object literals
 * i.e. { children: boolean[], toggle: boolean }, and it will also handle maps
 * defined as JSON object literals i.e. { [id: string]: string }. It will also
 * automatically handle nesting of JSON object literals based on how models are
 * created and how displayType is rendered for TypeModels in markdown.
 */
export class Declaration extends TypedocBase {
    indexSignature?: Signature;

    constructor(data: Partial<Declaration>) {
        super(data);

        if (data.indexSignature) {
            // if indexSignature is defined then this is a map
            this.indexSignature = new Signature(data.indexSignature);
            const parameter: Parameter = this.indexSignature.parameters[0];
            const type: TypeModel | undefined = this.indexSignature.type;
            this.displayName = `{ [${parameter.name}: ${parameter?.type?.name}]: ${type?.displayType} }`;
        } else if (data.children) {
            // children is defined, then should be key: value pairs
            this.children = [];
            this.displayName = '{';
            data.children.forEach((c: Partial<Property>, index: number) => {
                const p = new Property(c);
                this.children.push(p);
                if (index > 0) {
                    this.displayName += ', ';
                }
                // render property type displayType so nested literals are
                // automatically handled properly
                this.displayName += `${p.name}: ${p.type?.displayType}`;
            });
            this.displayName += '}';
        } else {
            // default to the empty type
            this.displayName = '{}';
        }
    }
}
