import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

import { FileUtil } from '../../util/file.util';
import { reformatText } from '../../generators/documentation/helpers';
import { ClassParser, ModuleParser, Parser } from '../../parsers/typedoc-json';
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

                    // generate API and overview templates
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
                    // generate components
                    apiIndex = this.generateMarkdownFiles<ClassParser>(
                        outputPath,
                        apiIndex,
                        m,
                        m.components,
                        'component',
                        this.componentTemplate
                    );

                    // generate services
                    apiIndex = this.generateMarkdownFiles<ClassParser>(
                        outputPath,
                        apiIndex,
                        m,
                        m.services,
                        'class',
                        this.classTemplate
                    );
                });
            }
        );
    }

    private generateMarkdownFiles<T extends Parser>(
        directory: string,
        apiIndex: number,
        module: ModuleParser,
        parsers: T[],
        symbol: string,
        template: Handlebars.TemplateDelegate
    ) {
        parsers.forEach((p) => {
            // create object needed for template that combines module and
            // component (since can only pass one object to template) see
            // https://github.com/handlebars-lang/handlebars.js/issues/1611
            const templateObject: any = { module: module };
            // add parser object for class being rendered using given symbol
            // as key
            templateObject[symbol] = p;
            // generate API markdown
            FileUtil.write(
                directory,
                `api-${apiIndex++}.md`,
                template(templateObject)
            );

            // TODO generate overview and usage-notes details
        });

        return apiIndex;
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
