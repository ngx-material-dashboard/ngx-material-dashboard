import { Decorator } from "./decorator.model";
import { Source } from "./source.model";

/**
 * Base model class that contains most basic details for a typedoc JSON object.
 */
export class TypedocBase {
    /** Primary id value for JSON object. */
    id!: number;
    /** The name of project, lib, class, method, or property. */
    name!: string;
    /** The kind of JSON object (unique id since number?). */
    kind!: number;
    /** The kind of JSON object. */
    kindString!: string;
    flags!: {};
    /** The children associated with the JSON object. */
    children: TypedocBase[] = [];
    comment?: { shortText: string, returns?: string };
    decorators?: any[];
    description?: string;
    sources!: Source[];

    constructor(data: Partial<TypedocBase>) {
        Object.assign(this, data);

        this.description = this.comment?.shortText;
    }
}
