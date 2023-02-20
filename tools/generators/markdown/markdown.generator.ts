import * as Handlebars from 'handlebars';
import * as path from 'path';

import { FileUtil } from '../../util/file.util';
import {
    capitalizeFirstLetter,
    reformatText
} from '../../generators/documentation/helpers';
import {
    ClassParser,
    CommentParser,
    EnumParser,
    FunctionParser,
    InterfaceParser,
    ModuleParser,
    Parser,
    TypeAliasParser
} from '../../parsers/typedoc-json';
import { ProjectParser } from '../../parsers/typedoc-json/parsers/project';
import { TypedocJsonParser } from '../../parsers/typedoc-json/typedoc-json.parser';
import { registerHelpers } from './utils/register-helpers';
import { registerPartials } from './utils/register-partials';
import { Kind } from '../../parsers/typedoc-json/enums';
import { PathUtil } from './utils/path.util';
import { ReflectionTypeParser } from 'typedoc-json-parser';
import { MarkdownConfig } from './interfaces/markdown-config.interface';
import { generateMarkdownConfigDetailsByModule } from '../../config/processed/markdown.config';
import { TemplateConfig } from '../../config/processed/template.config';

/**
 * The `MarkdownGenerator` generates the markdown files from the parsed typedoc
 * JSON data needed for workspace documentation. It uses a custom parser based
 * off of typedoc-json-parser (?... make sure thats correct name) to parse
 * typedoc data, and handlebars render data into markdown.
 */
export class MarkdownGenerator {
    templateConfig: TemplateConfig;

    constructor(templateConfig: TemplateConfig) {
        this.templateConfig = templateConfig;
        this.init();
    }

    /**
     * Initialize everything needed to generate markdown files.
     */
    private init() {
        registerHelpers();
        registerPartials();
    }

    /**
     * Generates all markdown files from given TypedocJsonParser data.
     *
     * @param typedocJsonParser
     */
    generateMarkdown(typedocJsonParser: TypedocJsonParser): void {
        typedocJsonParser.workspaceParser.projects.forEach(
            (project: ProjectParser) => {
                // generate the base output path for markdown for project
                const basePath = this.generateBaseOutputPath(project.name);
                project.baseMarkdownDirectory = basePath;

                project.modules?.forEach((m: ModuleParser) => {
                    const reformattedName = reformatText(m.name);
                    let outputPath;
                    let url;
                    if (project.name !== reformattedName) {
                        // append module name to path if different from project
                        // prevents repeated strings in path
                        outputPath = path.join(basePath, reformatText(m.name));
                        url = `/${project.name}/${reformattedName}`;
                    } else {
                        // otherwise set outputPath to basePath
                        outputPath = basePath;
                        url = `/${project.name}`;
                    }
                    m.baseMarkdownDirectory = outputPath;

                    // generate markdown files for entire module
                    this.generateMarkdownFilesByModule(outputPath, m, url);
                });
            }
        );
    }

    // look at comment -> summary for main overview; should be
    // first paragraph (maybe 2?) of class comments; may also
    // need toc look at blockTags for @overviewDetails for any
    // additional text to generate

    // generate example markdown files
    // look at comment -> blockTags; should be @usageNotes
    private generateMarkdownFilesByModule(
        outputPath: string,
        m: ModuleParser,
        url: string
    ) {
        const config: MarkdownConfig[] = generateMarkdownConfigDetailsByModule(
            m,
            this.templateConfig
        );
        config.forEach((s) => {
            this.generateMarkdownFiles(
                outputPath,
                m,
                s.parsers,
                s.symbol,
                s.template,
                url,
                s.subDirectory
            );
        });
    }

    private generateMarkdownFiles<T extends Parser>(
        directory: string,
        module: ModuleParser,
        parsers: T[],
        symbol: string,
        template: Handlebars.TemplateDelegate,
        url: string,
        subDirectory?: string
    ) {
        if (subDirectory) {
            directory = `${directory}/${subDirectory}`;
            url = `${url}/${subDirectory}`;
        }
        if (parsers.length > 0) {
            this.generateMarkdownFile(
                directory,
                module,
                'api',
                'api',
                url,
                module.apiFiles++,
                `## ${capitalizeFirstLetter(symbol)}`
            );

            this.generateMarkdownFile(
                directory,
                module,
                'overview',
                'overview',
                url,
                module.overviewDetails++,
                `## ${capitalizeFirstLetter(symbol)}`
            );
        }
        parsers.forEach((p: Parser) => {
            this.generateMarkdownFile(
                directory,
                module,
                'api',
                'api',
                url,
                module.apiFiles++,
                template(p)
            );

            // generate overview and example markdown
            if (
                p instanceof ClassParser ||
                p instanceof EnumParser ||
                p instanceof FunctionParser ||
                p instanceof InterfaceParser ||
                p instanceof TypeAliasParser
            ) {
                let comment: CommentParser;
                if (p instanceof FunctionParser) {
                    comment = p.signatures[0].comment;
                } else {
                    if (
                        p instanceof TypeAliasParser &&
                        p.type.kind === Kind.Reflection
                    ) {
                        const type: ReflectionTypeParser =
                            p.type as ReflectionTypeParser;
                        if (
                            type.reflection &&
                            type.reflection.signatures &&
                            type.reflection.signatures[0].comment &&
                            type.reflection.signatures[0].comment.summary
                        ) {
                            // this is a special case to be able to render docs
                            // for ModelType and MetaModelType; only overview
                            // details rendered, TODO remove API md files?
                            comment = new CommentParser({
                                blockTags: [],
                                modifierTags: [],
                                description:
                                    type.reflection.signatures[0].comment
                                        .summary[0].text
                            });
                        } else {
                            comment = p.comment;
                        }
                    } else {
                        comment = p.comment;
                    }
                }
                this.generateMarkdownFile(
                    directory,
                    module,
                    'overview',
                    'overview',
                    url,
                    module.overviewDetails++,
                    `### ${p.name}`
                );

                if (comment.description) {
                    this.generateMarkdownFile(
                        directory,
                        module,
                        'overview',
                        'overview',
                        url,
                        module.overviewDetails++,
                        // match the expected object structure for template
                        this.templateConfig.overviewTemplate({
                            text: comment.description
                        })
                    );
                }

                comment.overviewDetails.forEach((t) => {
                    this.generateMarkdownFile(
                        directory,
                        module,
                        'overview',
                        'overview',
                        url,
                        module.overviewDetails++,
                        this.templateConfig.overviewTemplate({ text: t.text })
                    );
                });

                // add usageNote/example details
                if (comment.usageNotes.length > 0) {
                    this.generateMarkdownFile(
                        directory,
                        module,
                        'examples',
                        'example',
                        url,
                        module.usageNotes++,
                        `### ${p.name}`
                    );
                }
                const headers: string[] = [];
                let paths: string[] = [];
                const basePath = PathUtil.makeRelativeTo(directory, 'assets');
                comment.usageNoteTypes.forEach((t, i) => {
                    let text = comment.usageNotesTypeMap[`${t}-${i}`];
                    if (text.search(/#+/) === 0) {
                        // add header as separate markdown file if it exists
                        // ...but create the file and add it before we add paths
                        headers.push(text.split('\n')[0]);
                        text = text.split('\n').slice(1).join('\n');
                    }
                    const existingIndex = paths.findIndex(
                        (it) => it.indexOf(`-${t}-`) > 0
                    );
                    if (existingIndex >= 0) {
                        // if paths already contains an example of given type,
                        // then add existing paths to urlFilesMap and re-initialize
                        // paths so we don't end up with more than 1 example in
                        // given set of tabbed results; I HATE that I have to do this...
                        this.generateMarkdownFile(
                            directory,
                            module,
                            'examples',
                            'example',
                            url,
                            module.usageNotes++,
                            headers[existingIndex]
                        );
                        module.urlFilesMap[`${url}/examples`].push(paths);
                        paths = [];
                    }
                    paths.push(
                        `${basePath}/example-${t}-${module.usageNotes}.md`
                    );
                    FileUtil.write(
                        directory,
                        `example-${t}-${module.usageNotes++}.md`,
                        this.templateConfig.overviewTemplate({
                            text: text
                        })
                    );
                });
                if (paths.length > 0) {
                    // should be the last one.. god this sucks...
                    this.generateMarkdownFile(
                        directory,
                        module,
                        'examples',
                        'example',
                        url,
                        module.usageNotes++,
                        headers[headers.length - 1]
                    );
                    module.urlFilesMap[`${url}/examples`].push(paths);
                }
            }
        });
    }

    private generateMarkdownFile(
        directory: string,
        module: ModuleParser,
        type: string,
        symbol: string,
        url: string,
        index: number,
        data: any
    ) {
        this.addToUrlFilesMap(module, url, directory, type, symbol, index);
        FileUtil.write(directory, `${symbol}-${index}.md`, data);
    }

    private addToUrlFilesMap(
        module: ModuleParser,
        url: string,
        directory: string,
        type: string,
        symbol: string,
        index: number
    ) {
        if (!module.urlFilesMap[`${url}/${type}`]) {
            module.urlFilesMap[`${url}/${type}`] = [];
        }
        const basePath = PathUtil.makeRelativeTo(directory, 'assets');
        module.urlFilesMap[`${url}/${type}`].push([
            `${basePath}/${symbol}-${index}.md`
        ]);
    }

    /**
     * Generates the base output path for markdown files relative to this one
     * at the given basePath.
     *
     * @param basePath The path to put at end of path argument.
     * @returns Base output path for markdown files.
     */
    private generateBaseOutputPath(basePath: string): string {
        return path.join(
            __dirname,
            '..',
            '..',
            '..',
            'projects',
            'documentation',
            'src',
            'assets',
            'docs',
            basePath
        );
    }
}
