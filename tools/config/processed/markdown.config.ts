import { MarkdownConfig } from '../../generators/markdown/interfaces/markdown-config.interface';
import {
    ClassParser,
    FunctionParser,
    InterfaceParser,
    ModuleParser,
    TypeAliasParser
} from '../../parsers/typedoc-json';
import { TemplateConfig } from './template.config';

/**
 * Generates configuration info needed to generate markdown files for given
 * module.
 *
 * @param m The parser for the module to generate markdown config details.
 * @param templateConfig The class with compiled markdown templates.
 * @returns Config info needed to generate markdwon files for given module.
 */
export function generateMarkdownConfigDetailsByModule(
    m: ModuleParser,
    templateConfig: TemplateConfig
): MarkdownConfig[] {
    return [
        {
            modelType: ClassParser,
            parsers: m.components,
            symbol: 'components',
            template: templateConfig.componentTemplate
        },
        {
            modelType: ClassParser,
            parsers: m.converters,
            symbol: 'converters',
            template: templateConfig.classTemplate
        },
        {
            modelType: FunctionParser,
            parsers: m.decorators,
            symbol: 'decorators',
            template: templateConfig.decoratorTemplate
        },
        {
            modelType: ClassParser,
            parsers: m.directives,
            symbol: 'directives',
            template: templateConfig.directiveTemplate
        },
        {
            modelType: ClassParser,
            parsers: m.elements,
            subDirectory: 'elements',
            symbol: 'elements',
            template: templateConfig.classTemplate
        },
        {
            modelType: ClassParser,
            parsers: m.enums,
            symbol: 'enums',
            template: templateConfig.classTemplate
        },
        {
            modelType: FunctionParser,
            parsers: m.fixtures,
            subDirectory: 'fixtures',
            symbol: 'fixtures',
            template: templateConfig.classTemplate
        },
        {
            modelType: InterfaceParser,
            parsers: m.interfaces,
            symbol: 'interfaces',
            template: templateConfig.classTemplate
        },
        {
            modelType: ClassParser,
            parsers: m.models,
            subDirectory: m.name === 'TestingModule' ? 'models' : '',
            symbol: 'models',
            template: templateConfig.classTemplate
        },
        {
            modelType: ClassParser,
            parsers: m.mocks,
            subDirectory: 'mocks',
            symbol: 'mocks',
            template: templateConfig.classTemplate
        },
        {
            modelType: ClassParser,
            parsers: m.services,
            symbol: 'services',
            template: templateConfig.classTemplate
        },
        {
            modelType: TypeAliasParser,
            parsers: m.typeAliases,
            symbol: 'typeAliases',
            template: templateConfig.componentTemplate
        }
    ];
}
