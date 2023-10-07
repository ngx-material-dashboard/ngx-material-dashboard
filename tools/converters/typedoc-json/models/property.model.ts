import { TypedocBase } from './typedoc-base.model';
import { Decorator } from './decorator.model';
import { TypeModel } from './type.model';
import { Parameter } from './parameter.model';

export class Property extends TypedocBase {
    propertyDecorator?: Decorator;
    propertyDecoratorDisplay: string = '';
    displayType: string;
    defaultValue?: string;
    override kindString: string = 'Property';

    constructor(data: Partial<Property>) {
        super(data);

        if (data.decorators) {
            this.propertyDecorator = new Decorator(data.decorators[0]);
            if (this.propertyDecorator.type) {
                this.propertyDecoratorDisplay = `@${this.propertyDecorator.type.name}()`;
            }
        }

        if (data.parameters) {
            // if parameters exist then property should be an index signature
            // so set the name to param.name and param.type.displayType value;
            // which should result in something like '[text: string]'
            // TODO see if we need to handle multiple parameters
            const param = new Parameter(data.parameters[0]);
            this.parameters = [param];
            this.name = `[${param.name}: ${param.type.displayType}]`;
        }

        if (data.type) {
            this.type = new TypeModel(data.type);
            this.displayType = this.type.displayType;
        } else {
            this.displayType = 'any';
        }
    }

    /**
     * Custom sort comparator function that sorts properties including any
     * decorator they may have. Properties with decorators should come before
     * properties without decorators. Properties with decorators should be
     * sorted by decorator name. If they have the same decorator, then they
     * should be sorted by property name.
     *
     * @param a First property to compare.
     * @param b Second property to compare.
     * @returns -1, 0, or 1 depending on how a compares to b.
     */
    static sort(a: Property, b: Property): number {
        if (a.propertyDecorator && b.propertyDecorator) {
            if (
                a.propertyDecorator.type.name === b.propertyDecorator.type.name
            ) {
                return a.name.localeCompare(b.name);
            } else {
                return a.propertyDecorator.type.name.localeCompare(
                    b.propertyDecorator.type.name
                );
            }
        } else if (!a.propertyDecorator && !b.propertyDecorator) {
            return a.name.localeCompare(b.name);
        } else if (a.propertyDecorator) {
            return -1;
        } else {
            return 1;
        }
    }
}
