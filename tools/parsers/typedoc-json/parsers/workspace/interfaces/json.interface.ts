import { ProjectParserJson } from '../../project';

export interface WorkspaceParserJson {
    kind: number;
    kindString: string;
    projects: ProjectParserJson[];
}
