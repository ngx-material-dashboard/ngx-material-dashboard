import * as data from '../../../../docs.json';
import { Clazz } from '../models/clazz.model';
import { Constructor } from '../models/constructor.model';
import { FunctionModel } from '../models/function.model';
import { MethodModel } from '../models/method.model';
import { Module } from '../models/module.model';
import { Property } from '../models/property.model';
import { TypedocBase } from '../models/typedoc-base.model';

/**
 * The ParseJsonService parses the JSON output produced by typedoc.
 * Currently this relies on docs.json being output file and for it to be
 * located at root of workspace.
 */
export class ParseJsonService {

    /** The raw JSON read from imported docs.json typedoc output file. */
    fileData: any;
    /** The root JSON object containing all output data from typedoc. */
    typedocBase: TypedocBase;
    /** The main modules (libraries/projects) included in typedoc output. */
    modules: Module[] = [];

    /**
     * Parses and extracts details needed from typedoc JSON output for use in
     * generated API files for use in documentation.
     */
    constructor() {
        this.fileData = (data as any).default;
        this.typedocBase = new TypedocBase(this.fileData as Partial<TypedocBase>);
        this.extractModulesData();
    }

    /**
     * Parses and extracts modules details from base JSON object.
     */
    private extractModulesData(): void {
        this.typedocBase.children.forEach((module: TypedocBase) => {
            const m: Module = new Module(module);
            this.extractClassesData(m);
            this.modules.push(m);
        });
    }

    /**
     * Parses and extracts class details from given module.
     *
     * @param module The module to parse class details for.
     */
    private extractClassesData(module: Module): void {
        module.children.forEach((t: TypedocBase) => {
            if (t.kindString === 'Function') {
                const f: FunctionModel = new FunctionModel(t);
                module.functions.push(f);
            } else {
                const c: Clazz = new Clazz(t);
                this.extractClazzData(c);
                module.classes.push(c);
            }
        });
    }

    /**
     * Parses and extracts details for classes.
     *
     * @param clazz The class to parse details for.
     */
    private extractClazzData(clazz: Clazz): void {
        clazz.children.forEach((c: TypedocBase) => {
            if (c.kindString === 'Constructor') {
                clazz.constructor$ = new Constructor(c);
            } else if (c.kindString === 'Method') {
                clazz.methods.push(new MethodModel(c));
            } else if (c.kindString === 'Property') {
                clazz.properties.push(new Property(c));
            }
        });
    }
}
