import { Clazz } from './clazz.model';
import { Decorator } from './decorator.model';

export class Component extends Clazz {
    selector?: string;
    templateUrl?: string;

    constructor(data: Partial<Component>) {
        super(data);

        if (data.decorators) {
            this.decorators = [];
            data.decorators.forEach((d: Partial<Decorator>) => {
                const decorator = new Decorator(d);
                this.decorators?.push(decorator);
            });
        }
    }
}
