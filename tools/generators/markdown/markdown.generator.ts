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
    InterfaceParser,
    ModuleParser,
    Parser,
    TypeAliasParser
} from '../../parsers/typedoc-json';
import { ProjectParser } from '../../parsers/typedoc-json/parsers/project';
import { TypedocJsonParser } from '../../parsers/typedoc-json/typedoc-json.parser';
import { registerHelpers } from './utils/register-helpers';
import { registerPartials } from './utils/register-partials';

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

                if (project.name === 'testing' && project.modules) {
                    const m = project.modules[0];

                    let outputPath = path.join(basePath, 'elements');
                    this.generateMarkdownFiles<ClassParser>(
                        outputPath,
                        0,
                        m,
                        m.elements,
                        'elements',
                        this.classTemplate
                    );

                    outputPath = path.join(basePath, 'models');
                    this.generateMarkdownFiles<ClassParser>(
                        outputPath,
                        0,
                        m,
                        m.models,
                        'models',
                        this.classTemplate
                    );
                } else {
                    project.modules?.forEach((m: ModuleParser) => {
                        const reformattedName = reformatText(m.name);
                        let outputPath;
                        if (project.name !== reformattedName) {
                            // append module name to path if different from project
                            // prevents repeated strings in path
                            outputPath = path.join(
                                basePath,
                                reformatText(m.name)
                            );
                        } else {
                            // otherwise set outputPath to basePath
                            outputPath = basePath;
                        }
                        m.baseMarkdownDirectory = outputPath;

                        // generate API markdown files
                        this.generateApiMarkdownFiles(outputPath, m);

                        // generate overview markdown files
                        // look at comment -> summary for main overview; should be
                        // first paragraph (maybe 2?) of class comments; may also
                        // need to look at blockTags for @overviewDetails for any
                        // additional text to generate

                        // generate example markdown files
                        // look at comment -> blockTags; should be @usageNotes
                    });
                }
            }
        );
    }

    private generateApiMarkdownFiles(outputPath: string, m: ModuleParser) {
        // generate API templates
        // console.log(m.converters.map((c) => c.name));
        // console.log(m.components.map((c) => c.name));
        // console.log(m.decorators.map((d) => d.name));
        // console.log(m.directives.map((d) => d.name));
        // console.log(m.elements.map((e) => e.name));
        // console.log(m.enums.map((e) => e.name));
        // console.log(m.interfaces.map((i) => i.name));
        // console.log(m.models.map((m) => m.name));
        // console.log(m.pages.map((p) => p.name));
        // console.log(m.services.map((s) => s.name));
        // console.log(m.typeAliases.map((t) => t.name));

        let apiIndex: number = 0;
        // let index: number = 0;
        // generate components
        this.generateMarkdownFiles<ClassParser>(
            outputPath,
            apiIndex,
            m,
            m.components,
            'components',
            this.componentTemplate
        );
        apiIndex += m.components.length;
        if (m.components.length > 0) {
            apiIndex++;
        }
        // index = 0;
        this.generateMarkdownFiles<ClassParser>(
            outputPath,
            apiIndex,
            m,
            m.converters,
            'converters',
            this.classTemplate
        );
        apiIndex += m.converters.length;
        if (m.converters.length > 0) {
            apiIndex++;
        }
        // index = 0;
        this.generateMarkdownFiles<ClassParser>(
            outputPath,
            apiIndex,
            m,
            m.decorators,
            'decorators',
            this.classTemplate
        );
        apiIndex += m.decorators.length;
        if (m.decorators.length > 0) {
            apiIndex++;
        }
        // index = 0;
        this.generateMarkdownFiles<ClassParser>(
            outputPath,
            apiIndex,
            m,
            m.directives,
            'directives',
            this.classTemplate
        );
        apiIndex += m.directives.length;
        if (m.directives.length > 0) {
            apiIndex++;
        }
        // index = 0;
        this.generateMarkdownFiles<InterfaceParser>(
            outputPath,
            apiIndex,
            m,
            m.interfaces,
            'interfaces',
            this.classTemplate
        );
        if (m.interfaces.length > 0) {
            apiIndex++;
        }
        // index = 0;
        this.generateMarkdownFiles<EnumParser>(
            outputPath,
            apiIndex,
            m,
            m.enums,
            'enums',
            this.classTemplate
        );
        apiIndex += m.enums.length;
        if (m.enums.length > 0) {
            apiIndex++;
        }

        // index = 0;
        this.generateMarkdownFiles<ClassParser>(
            outputPath,
            apiIndex,
            m,
            m.models,
            'models',
            this.classTemplate
        );
        apiIndex += m.models.length;
        if (m.models.length > 0) {
            apiIndex++;
        }

        // generate services
        this.generateMarkdownFiles<ClassParser>(
            outputPath,
            apiIndex,
            m,
            m.services,
            'services',
            this.classTemplate
        );
        apiIndex += m.services.length;
        if (m.services.length > 0) {
            apiIndex++;
        }

        this.generateMarkdownFiles<TypeAliasParser>(
            outputPath,
            apiIndex,
            m,
            m.typeAliases,
            'typeAliases',
            this.classTemplate
        );
    }

    private generateMarkdownFiles<T extends Parser>(
        directory: string,
        apiIndex: number,
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
                `api-${apiIndex}.md`,
                `## ${capitalizeFirstLetter(symbol)}`
            );
        }
        parsers.forEach((p: Parser, i: number) => {
            // generate API markdown
            FileUtil.write(
                directory,
                `api-${apiIndex + i + 1}.md`,
                template(p)
            );

            // TODO generate overview and usage-notes details
            if (
                p instanceof ClassParser ||
                p instanceof EnumParser ||
                p instanceof InterfaceParser ||
                p instanceof TypeAliasParser
            ) {
                FileUtil.write(
                    directory,
                    `overview-${module.overviewDetails++}.md`,
                    `## ${p.name}`
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
                        `## ${p.name}`
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
}
