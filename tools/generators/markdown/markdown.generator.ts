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

interface MarkdownConfig {
    modelType: any;
    parsers: Parser[];
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
                    if (project.name !== reformattedName) {
                        // append module name to path if different from project
                        // prevents repeated strings in path
                        outputPath = path.join(basePath, reformatText(m.name));
                    } else {
                        // otherwise set outputPath to basePath
                        outputPath = basePath;
                    }
                    m.baseMarkdownDirectory = outputPath;

                    // generate markdown files for entire module
                    this.generateMarkdownFilesByModule(outputPath, m);
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
    private generateMarkdownFilesByModule(outputPath: string, m: ModuleParser) {
        const config: MarkdownConfig[] =
            this.generateMarkdownConfigDetailsByModule(m);
        config.forEach((s) => {
            this.generateMarkdownFiles(
                outputPath,
                m,
                s.parsers,
                s.symbol,
                s.template
            );
        });
    }

    private generateMarkdownFiles<T extends Parser>(
        directory: string,
        module: ModuleParser,
        parsers: T[],
        symbol: string,
        template: Handlebars.TemplateDelegate,
        includeSymbol: boolean = true
    ) {
        if (parsers.length > 0 && includeSymbol) {
            //
            FileUtil.write(
                directory,
                `api-${module.apiFiles++}.md`,
                `## ${capitalizeFirstLetter(symbol)}`
            );

            FileUtil.write(
                directory,
                `overview-${module.overviewDetails++}.md`,
                `## ${capitalizeFirstLetter(symbol)}`
            );
        }
        parsers.forEach((p: Parser) => {
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
                FileUtil.write(
                    directory,
                    `overview-${module.overviewDetails++}.md`,
                    `### ${p.name}`
                );

                if (p.comment.description) {
                    FileUtil.write(
                        directory,
                        `overview-${module.overviewDetails++}.md`,
                        // match the expected object structure for template
                        this.overviewTemplate({ text: p.comment.description })
                    );
                }

                p.comment.overviewDetails.forEach((t) => {
                    FileUtil.write(
                        directory,
                        `overview-${module.overviewDetails++}.md`,
                        this.overviewTemplate({ text: t.text.join('') })
                    );
                });

                if (p.comment.usageNotes.length > 0) {
                    FileUtil.write(
                        directory,
                        `example-${module.usageNotes++}.md`,
                        `### ${p.name}`
                    );
                }
                p.comment.usageNoteTypes.forEach((t, i) => {
                    FileUtil.write(
                        directory,
                        `example-${t}-${module.usageNotes++}.md`,
                        this.overviewTemplate({
                            text: p.comment.usageNotesTypeMap[`${t}-${i}`]
                        })
                    );
                });
            }
        });
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

    // console.log(m.elements.map((e) => e.name));
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
                modelType: InterfaceParser,
                parsers: m.interfaces,
                symbol: 'interfaces',
                template: this.classTemplate
            },
            {
                modelType: ClassParser,
                parsers: m.models,
                symbol: 'models',
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
