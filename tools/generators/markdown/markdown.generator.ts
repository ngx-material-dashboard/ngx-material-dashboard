/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

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
 * The `MarkdownGenerator` generates markdown files from parsed typedoc JSON
 * data needed for workspace documentation. It uses a custom parser built on
 * top of typedoc-json-parser to parse typedoc data, and handlebars render data
 * into markdown.
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
     * @param typedocJsonParser Top level parser with workspace and project data.
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

    /**
     * Generates all markdown files for parsers defined in given module parser.
     *
     * @param outputPath The directory where markdown files should be generated.
     * @param m The module to generate markdown files for.
     * @param url The base URL associated with module in docs app.
     */
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

    /**
     * Utility function to generate all markdown files (overview, API, and
     * example), for the given set of parsers to be generated in given
     * directory (and optional sub-directory).
     *
     * @param directory Directory where markdown should be rendered.
     * @param module The module that contains set of parsers.
     * @param parsers Set of parsers to generate markdown for.
     * @param symbol Type of parsers (i.e. component, service, etc.).
     * @param template Template to use for generating API markdown files.
     * @param url URL where markdown files will be rendered in docs app.
     * @param subDirectory Optional subdirectory where markdown should be rendered.
     */
    private generateMarkdownFiles<T extends Parser>(
        directory: string,
        module: ModuleParser,
        parsers: T[],
        symbol: string,
        template: Handlebars.TemplateDelegate,
        url: string,
        subDirectory?: string
    ) {
        let apiText: string = '';
        let overviewText: string = '';

        if (subDirectory) {
            // add subdirectory to directory and URL if defined
            directory = `${directory}/${subDirectory}`;
            url = `${url}/${subDirectory}`;
        }

        if (parsers.length > 0) {
            // add headers detail if there are parsers defined
            apiText = `## ${capitalizeFirstLetter(symbol)}\n`;
            overviewText = `## ${capitalizeFirstLetter(symbol)}\n`;
        }

        parsers.forEach((p: Parser) => {
            apiText += `${template(p)}\n`;

            // add overview and usageNote/example details
            if (
                p instanceof ClassParser ||
                p instanceof EnumParser ||
                p instanceof FunctionParser ||
                p instanceof InterfaceParser ||
                p instanceof TypeAliasParser
            ) {
                const comment: CommentParser = this.getComment(p);

                // add overview details
                overviewText += this.generateOverviewText(p, comment);
                // add usageNote/example details
                this.generateExampleMarkdownFiles(
                    comment,
                    directory,
                    module,
                    url,
                    p
                );
            }
        });

        if (apiText !== '') {
            this.generateMarkdownFile(
                directory,
                module,
                'api',
                'api',
                url,
                module.apiFiles++,
                apiText
            );
        }

        if (overviewText !== '') {
            this.generateMarkdownFile(
                directory,
                module,
                'overview',
                'overview',
                url,
                module.overviewDetails++,
                overviewText
            );
        }
    }

    /**
     * Generates the text to render for overview details based on given
     * CommentParser.
     *
     * @param p The class, interface, etc. that contains comment.
     * @param comment The comment used to render overview details.
     * @returns The overview details to render in markdown.
     */
    private generateOverviewText(p: Parser, comment: CommentParser) {
        let overviewText = `### ${p.name}\n`;

        if (comment.description) {
            // match the expected object structure for template
            overviewText +=
                this.templateConfig.overviewTemplate({
                    text: comment.description
                }) + '\n';
        }

        // add overview details
        comment.overviewDetails.forEach((t) => {
            overviewText +=
                this.templateConfig.overviewTemplate({ text: t.text }) + '\n';
        });
        return overviewText;
    }

    /**
     * Returns the appropriate comment parser details based on the type of
     * parser given.
     *
     * @param p The parser to get the comment for.
     * @returns CommentParser that can be used to generate markdown files.
     */
    private getComment(
        p:
            | ClassParser
            | EnumParser
            | FunctionParser
            | InterfaceParser
            | TypeAliasParser
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
                            type.reflection.signatures[0].comment.summary[0]
                                .text
                    });
                } else {
                    comment = p.comment;
                }
            } else {
                comment = p.comment;
            }
        }
        return comment;
    }

    /**
     * Generates markdown files used for examples.
     *
     * @param comment The comment that contains the example.
     * @param directory The directory where the markdown should be rendered.
     * @param module The module associated with example being rendered.
     * @param url The URL where the markdown file will be rendered.
     * @param p The parser that contains the comment with example.
     */
    private generateExampleMarkdownFiles(
        comment: CommentParser,
        directory: string,
        module: ModuleParser,
        url: string,
        p: Parser
    ) {
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
            paths.push(`${basePath}/example-${t}-${module.usageNotes}.md`);
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

    /**
     * Generates a markdown file in the given directory using the given data
     * and adds file to modules urlFilesMap.
     *
     * @param directory The directoy where to write the markdown file.
     * @param module The module associated with the markdown file being generated.
     * @param type The type of markdown file being generated (api, overview).
     * @param symbol The symbol to use in file name.
     * @param url The URL where markdown will be rendered in docs app.
     * @param index The index of the markdown file.
     * @param data The data to write to the file.
     */
    private generateMarkdownFile(
        directory: string,
        module: ModuleParser,
        type: string,
        symbol: string,
        url: string,
        index: number,
        data: string
    ) {
        // add file to module's urlFilesMap
        if (!module.urlFilesMap[`${url}/${type}`]) {
            module.urlFilesMap[`${url}/${type}`] = [];
        }
        const basePath = PathUtil.makeRelativeTo(directory, 'assets');
        module.urlFilesMap[`${url}/${type}`].push([
            `${basePath}/${symbol}-${index}.md`
        ]);

        // write markdown file
        FileUtil.write(directory, `${symbol}-${index}.md`, data);
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
