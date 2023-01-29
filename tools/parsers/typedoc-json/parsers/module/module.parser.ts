import { ClassParser } from '../class';
import { EnumParser } from '../enum';
import { InterfaceParser } from '../interface';
import { Parser } from '../parser';
import { TypeAliasParser } from '../type-alias';
import { ModuleParserData } from './interfaces/data.interface';
import { ModuleParserJson } from './interfaces/json.interface';

/**
 * The `ModuleParser` defines properties based on classes defined within the
 * module (i.e. in the same directory or sub directories where the module is
 * defined). This helps simplify generating documentation for projects and
 * the modules defined for them.
 */
export class ModuleParser extends Parser {
    /** The list of classes associated with the module. */
    public readonly classes: ClassParser[];
    /** The list of components associated with the module. */
    public readonly components: ClassParser[];
    /** The list of converter classes associated with the module. */
    public readonly converters: ClassParser[];
    /** The list of decorators associated with the module. */
    public readonly decorators: ClassParser[];
    /** The list of decorators associated with the module. */
    public readonly directives: ClassParser[];
    /** The list of elements associated with the module. */
    public readonly elements: ClassParser[];
    /** The list of enum classes associated with the module. */
    public readonly enums: EnumParser[];
    /** The list of interfaces associated with the module. */
    public readonly interfaces: InterfaceParser[];
    /** The list of models associated with the module. */
    public readonly models: ClassParser[];
    /** The list of pages associated with the module. */
    public readonly pages: ClassParser[];
    /** The list of services associated with the module. */
    public readonly services: ClassParser[];
    /** The list of type aliases associated with the module. */
    public readonly typeAliases: TypeAliasParser[];

    apiFiles: number;
    baseMarkdownDirectory?: string;
    overviewDetails: number;
    usageNotes: number;

    public constructor(data: ModuleParserData) {
        super(data);

        const { classes, enums, interfaces, typeAliases } = data;

        this.classes = classes;
        this.enums = enums;
        this.interfaces = interfaces;
        this.typeAliases = typeAliases;

        // find all types of classes associated with module
        this.converters = this.filterClasses('.converter.ts');
        this.components = this.filterClasses('.component.ts');
        this.decorators = this.filterClasses('.decorator.ts');
        this.directives = this.filterClasses('.directive.ts');
        this.elements = this.filterClasses('.element.ts');
        this.models = this.filterClasses('.model.ts');
        this.pages = this.filterClasses('.page.ts');
        this.services = this.filterClasses('.service.ts');

        this.apiFiles = 0;
        this.overviewDetails = 0;
        this.usageNotes = 0;
    }

    /**
     * Returns the filtered list of classes whose file name ends with the given
     * string value. The string value should contain the symbol name that
     * corresponds with the file of a given type i.e. 'component.ts', as is
     * laid out in the angular style guide at below link. File names must
     * follow this format for this to work.
     * (https://angular.io/guide/styleguide#symbols-and-file-names).
     *
     * @param endsWith String file should end with.
     * @returns Filtered list of classes whose file name ends with given string.
     */
    private filterClasses(endsWith: string) {
        return this.classes.filter((c: ClassParser) => {
            return c.source?.file.endsWith(endsWith);
        });
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): ModuleParserJson {
        return {
            ...super.toJSON(),
            id: this.id,
            name: this.name,
            source: this.source,
            classes: this.classes.map((c) => c.toJSON()),
            components: this.components.map((c) => c.toJSON()),
            converters: this.converters.map((c) => c.toJSON()),
            directives: this.directives.map((c) => c.toJSON()),
            decorators: this.decorators.map((d) => d.toJSON()),
            elements: this.elements.map((e) => e.toJSON()),
            enums: this.enums.map((e) => e.toJSON()),
            interfaces: this.interfaces.map((i) => i.toJSON()),
            pages: this.pages.map((p) => p.toJSON()),
            services: this.services.map((c) => c.toJSON()),
            typeAliases: this.typeAliases.map((t) => t.toJSON())
        };
    }
}
