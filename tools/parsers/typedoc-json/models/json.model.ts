import type { JSONOutput } from 'typedoc';
import { Json as JsonInterface } from '../interfaces/json.interface';

/**
 * An Instance of the most basic type of object defined in typedoc JSON output.
 */
export class Json implements JsonInterface {
    id: number;
    name: string;

    constructor(data: Json | JSONOutput.ProjectReflection) {
        this.id = data.id;
        this.name = data.name;
    }
}
