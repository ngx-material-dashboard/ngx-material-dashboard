import * as fs from 'fs';
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

interface MarkdownConfig {
    modelType: any;
    parsers: Parser[];
    subDirectory?: string;
    symbol: string;
    template: any;
}

/**
 * The `MarkdownGenerator` generates the markdown files from the parsed typedoc
 * JSON data needed for workspace documentation. It uses a custom parser based
 * off of typedoc-json-parser (?... make sure thats correct name) to parse
 * typedoc data, and handlebars render data into markdown.
 */
export class MarkdownGenerator {
    private moduleTemplate!: HandlebarsTemplateDelegate<any>;
    private classTemplate!: HandlebarsTemplateDelegate<any>;
    private componentTemplate!: HandlebarsTemplateDelegate<any>;
    private decoratorTemplate!: HandlebarsTemplateDelegate<any>;
    private directiveTemplate!: HandlebarsTemplateDelegate<any>;
    private overviewTemplate!: HandlebarsTemplateDelegate<any>;
    private usageNotesTemplate!: HandlebarsTemplateDelegate<any>;

    constructor() {
        this.init();
    }

    /**
     * Initialize everything needed to generate markdown files.
     */
    private init() {
        registerHelpers();
        registerPartials();
        this.compileTemplates();
    }

    /**
     * Compiles the templates needed to render markdown files.
     */
    private compileTemplates() {
        const TEMPLATE_PATH = path.join(__dirname, 'templates');
        this.moduleTemplate = Handlebars.compile(
            fs.readFileSync(path.join(TEMPLATE_PATH, 'module.hbs')).toString()
        );

        this.classTemplate = Handlebars.compile(
            fs.readFileSync(path.join(TEMPLATE_PATH, 'clazz.hbs')).toString()
        );

        this.componentTemplate = Handlebars.compile(
            fs
                .readFileSync(path.join(TEMPLATE_PATH, 'component.hbs'))
                .toString()
        );

        this.decoratorTemplate = Handlebars.compile(
            fs
                .readFileSync(path.join(TEMPLATE_PATH, 'decorator.hbs'))
                .toString()
        );

        this.directiveTemplate = Handlebars.compile(
            fs
                .readFileSync(path.join(TEMPLATE_PATH, 'directive.hbs'))
                .toString()
        );

        this.overviewTemplate = Handlebars.compile(
            fs.readFileSync(path.join(TEMPLATE_PATH, 'overview.hbs')).toString()
        );

        this.usageNotesTemplate = Handlebars.compile(
            fs
                .readFileSync(path.join(TEMPLATE_PATH, 'usage-notes.hbs'))
                .toString()
        );
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
        const config: MarkdownConfig[] =
            this.generateMarkdownConfigDetailsByModule(m);
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
            //
            this.addToUrlFilesMap(
                module,
                url,
                directory,
                'api',
                'api',
                module.apiFiles
            );
            FileUtil.write(
                directory,
                `api-${module.apiFiles++}.md`,
                `## ${capitalizeFirstLetter(symbol)}`
            );

            this.addToUrlFilesMap(
                module,
                url,
                directory,
                'overview',
                'overview',
                module.overviewDetails
            );
            FileUtil.write(
                directory,
                `overview-${module.overviewDetails++}.md`,
                `## ${capitalizeFirstLetter(symbol)}`
            );

            // this.addToUrlFilesMap(
            //     module,
            //     url,
            //     directory,
            //     'examples',
            //     'example',
            //     module.usageNotes
            // );
            // FileUtil.write(
            //     directory,
            //     `example-${module.usageNotes++}.md`,
            //     `## ${capitalizeFirstLetter(symbol)}`
            // );
        }
        parsers.forEach((p: Parser) => {
            this.addToUrlFilesMap(
                module,
                url,
                directory,
                'api',
                'api',
                module.apiFiles
            );
            // generate API markdown
            FileUtil.write(
                directory,
                `api-${module.apiFiles++}.md`,
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
                this.addToUrlFilesMap(
                    module,
                    url,
                    directory,
                    'overview',
                    'overview',
                    module.overviewDetails
                );
                FileUtil.write(
                    directory,
                    `overview-${module.overviewDetails++}.md`,
                    `### ${p.name}`
                );

                if (comment.description) {
                    this.addToUrlFilesMap(
                        module,
                        url,
                        directory,
                        'overview',
                        'overview',
                        module.overviewDetails
                    );
                    FileUtil.write(
                        directory,
                        `overview-${module.overviewDetails++}.md`,
                        // match the expected object structure for template
                        this.overviewTemplate({ text: comment.description })
                    );
                }

                comment.overviewDetails.forEach((t) => {
                    this.addToUrlFilesMap(
                        module,
                        url,
                        directory,
                        'overview',
                        'overview',
                        module.overviewDetails
                    );
                    FileUtil.write(
                        directory,
                        `overview-${module.overviewDetails++}.md`,
                        this.overviewTemplate({ text: t.text })
                    );
                });

                // add usageNote/example details
                if (comment.usageNotes.length > 0) {
                    this.addToUrlFilesMap(
                        module,
                        url,
                        directory,
                        'examples',
                        'example',
                        module.usageNotes
                    );
                    FileUtil.write(
                        directory,
                        `example-${module.usageNotes++}.md`,
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
                        this.addToUrlFilesMap(
                            module,
                            url,
                            directory,
                            'examples',
                            'example',
                            module.usageNotes
                        );
                        FileUtil.write(
                            directory,
                            `example-${module.usageNotes++}.md`,
                            headers[existingIndex] // should correspond with existingIndex
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
                        this.overviewTemplate({
                            text: text
                        })
                    );
                });
                if (paths.length > 0) {
                    this.addToUrlFilesMap(
                        module,
                        url,
                        directory,
                        'examples',
                        'example',
                        module.usageNotes
                    );
                    FileUtil.write(
                        directory,
                        `example-${module.usageNotes++}.md`,
                        headers[headers.length - 1] // should be the last one.. god this sucks...
                    );
                    module.urlFilesMap[`${url}/examples`].push(paths);
                }
            }
        });
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

    // console.log(m.pages.map((p) => p.name));
    private generateMarkdownConfigDetailsByModule(
        m: ModuleParser
    ): MarkdownConfig[] {
        return [
            {
                modelType: ClassParser,
                parsers: m.components,
                symbol: 'components',
                template: this.componentTemplate
            },
            {
                modelType: ClassParser,
                parsers: m.converters,
                symbol: 'converters',
                template: this.classTemplate
            },
            {
                modelType: FunctionParser,
                parsers: m.decorators,
                symbol: 'decorators',
                template: this.decoratorTemplate
            },
            {
                modelType: ClassParser,
                parsers: m.directives,
                symbol: 'directives',
                template: this.directiveTemplate
            },
            {
                modelType: ClassParser,
                parsers: m.elements,
                subDirectory: 'elements',
                symbol: 'elements',
                template: this.classTemplate
            },
            {
                modelType: ClassParser,
                parsers: m.enums,
                symbol: 'enums',
                template: this.classTemplate
            },
            {
                modelType: FunctionParser,
                parsers: m.fixtures,
                subDirectory: 'fixtures',
                symbol: 'fixtures',
                template: this.classTemplate
            },
            {
                modelType: InterfaceParser,
                parsers: m.interfaces,
                symbol: 'interfaces',
                template: this.classTemplate
            },
            {
                modelType: ClassParser,
                parsers: m.models,
                subDirectory: m.name === 'TestingModule' ? 'models' : '',
                symbol: 'models',
                template: this.classTemplate
            },
            {
                modelType: ClassParser,
                parsers: m.mocks,
                subDirectory: 'mocks',
                symbol: 'mocks',
                template: this.classTemplate
            },
            {
                modelType: ClassParser,
                parsers: m.services,
                symbol: 'services',
                template: this.classTemplate
            },
            {
                modelType: TypeAliasParser,
                parsers: m.typeAliases,
                symbol: 'typeAliases',
                template: this.componentTemplate
            }
        ];
    }
}
