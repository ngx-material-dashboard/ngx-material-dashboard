import { ProjectParser } from '../project';
import { Options } from './interfaces/options.interface';

/**
 * The `WorkspaceParser` is a simple wrapper for the ProjectParser. A workspace
 * contains 1 or more projects, this allows for parsing multiple projects in
 * a workspace.
 */
export class WorkspaceParser {
    /**
     * An array of project  parsers for this workspace.
     */
    public readonly projects: ProjectParser[] = [];

    public constructor(options: Options) {
        const { data } = options;

        if ('projects' in data) {
            // not sure this is valid use-case...
        } else {
            const { children = [] } = data;
            children.forEach((child: any) => {
                this.projects.push(new ProjectParser({ data: child }));
            });
        }
    }
}
