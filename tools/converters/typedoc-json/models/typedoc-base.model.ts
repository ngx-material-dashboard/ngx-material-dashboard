import { Comment } from './comment.model';
import { Module } from "./module.model";
import { OverviewDetail } from './overview-detail.model';
import { Parameter } from './parameter.model';
import { Source } from "./source.model";
import { TypeModel } from './type.model';
import { UsageNote } from './usage-note.model';

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
    comment?: Comment;
    decorators?: any[];
    description?: string;
    displayName!: string;
    module?: Module;
    parameters: Parameter[] = [];
    sources!: Source[];
    type: any;
    usageNotes: UsageNote[] = [];
    fileUsageNoteMap: { [file: string]: UsageNote } = {};
    overviewDetails: OverviewDetail[] = [];

    constructor(data: Partial<TypedocBase>) {
        Object.assign(this, data);

        if (data.comment) {
            this.comment = new Comment(data.comment);
            this.description = this.comment.shortText;
            this.usageNotes = this.comment.usageNotes;
            this.overviewDetails = this.comment.overviewDetails;
        }
    }
}
