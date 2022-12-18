import { Comment } from './comment.model';
import { Module } from './module.model';
import { OverviewDetail } from './overview-detail.model';
import { Parameter } from './parameter.model';
import { Source } from './source.model';
import { UsageNote } from './usage-note.model';

/**
 * Base model class that contains most basic details for a typedoc JSON object.
 */
export class TypedocBase {
    /** Primary id value for JSON object. */
    id!: number;
    isConstant: boolean = false;
    /** The name of project, lib, class, method, or property. */
    name!: string;
    /** The kind of JSON object (unique id since number?). */
    kind!: number;
    /** The kind of JSON object. */
    kindString!: string;
    flags!: any;
    /** The children associated with the JSON object. */
    children: TypedocBase[] = [];
    comment?: Comment;
    decorators?: any[];
    description?: string;
    displayName!: string;
    module?: Module;
    parameters: Parameter[] = [];
    services: TypedocBase[] = [];
    sources!: Source[];
    type: any;
    usageNotes: UsageNote[] = [];
    urlFilesMap: { [url: string]: string[][] } = {};
    fileUsageNoteMap: { [file: string]: UsageNote } = {};
    overviewDetails: OverviewDetail[] = [];
    apiFile!: { directory: string; fileName: string };
    overviewFiles: { directory: string; fileName: string }[][] = [];

    constructor(data: Partial<TypedocBase>) {
        Object.assign(this, data);

        if (data.comment) {
            this.comment = new Comment(data.comment);
            this.description = this.comment.shortText;
            this.usageNotes = this.comment.usageNotes;
            this.overviewDetails = this.comment.overviewDetails;
        }

        if (data.flags) {
            this.isConstant = data.flags.isConst;
        }

        if (data.sources) {
            this.sources = [];
            data.sources.forEach((source: Partial<Source>) => {
                this.sources.push(new Source(source));
            });
        }
    }

    /**
     * Returns the URL in the documentation where this class will route to. The
     * URL is the key to the urlFilesMap for the class.
     */
    get url(): string {
        return Object.keys(this.urlFilesMap)[0];
    }
}
