import { Clazz } from './clazz.model';
import { Decorator } from './decorator.model';

export class Service extends Clazz {

    constructor(data: Partial<Service>) {
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
