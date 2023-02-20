import { FileUtil } from '../../util/file.util';
import { WorkspaceParser } from './parsers/workspace/workspace.parser';

/**
 * The `TypedocJsonParser` reads and parses the JSON output from typedoc into
 * the `workspaceParser`, making it easier to work with to generate markdown
 * needed for workspace documentation.
 */
export class TypedocJsonParser {
    workspaceParser: WorkspaceParser;

    constructor(fileName: string) {
        const str = FileUtil.read(__dirname, '..', '..', '..', fileName);
        const data = JSON.parse(str);
        this.workspaceParser = new WorkspaceParser({ data });
    }
}
