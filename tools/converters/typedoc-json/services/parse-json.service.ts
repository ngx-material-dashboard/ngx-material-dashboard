import * as data from '../../../../docs.json';
import { Accessor } from '../models/accessor.model';
import { Clazz } from '../models/clazz.model';
import { Component } from '../models/component.model';
import { Constructor } from '../models/constructor.model';
import { Directive } from '../models/directive.model';
import { FunctionModel } from '../models/function.model';
import { MethodModel } from '../models/method.model';
import { Module } from '../models/module.model';
import { Property } from '../models/property.model';
import { Service } from '../models/service.model';
import { TypedocBase } from '../models/typedoc-base.model';

const MODULE_SORT_ORDER: string[] = [
    'base-json',
    'json',
    'json-api',
    'widgets',
    'testing'
]

const NG_MODULE_VALS: string[] = [
    'declarations',
    'exports',
    'imports',
    'providers',
    'styleUrls',
    'selector',
    'templateUrl'
];

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
    classes: Clazz[] = [];

    /**
     * Parses and extracts details needed from typedoc JSON output for use in
     * generated API files for use in documentation.
     */
    constructor() {
        this.fileData = (data as any).default;
        this.typedocBase = new TypedocBase(this.fileData as Partial<TypedocBase>);
        this.extractModulesData();
        this.extractNgModuleData();
        this.modules.sort((a: Module, b: Module) => {
            return MODULE_SORT_ORDER.indexOf(a.displayName) - MODULE_SORT_ORDER.indexOf(b.displayName);
        });
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

    private extractComponentData(c: Component): void {
        const decorators = c.decorators;
        if (decorators) {
            const args: string = this.sanitizeArguments(decorators[0].arguments);
            NG_MODULE_VALS.forEach((val: string) => {
                type ObjectKey = keyof Clazz;
                const key = val as ObjectKey;
                const valData = this.extractData(args, val);
                if (valData !== '') {
                    this.setProperty(c, key, valData);
                }
            });
        }
    }

    /**
     * Parses NgModule classes arguments for things included in NgModule
     * decorator (i.e. declarations, exports, imports, etc).
     */
    private extractNgModuleData(): void {
        const ngModuleClasses = this.classes.filter((it: Clazz) => it.name.endsWith('Module'));
        ngModuleClasses.forEach((ngModule: Clazz) => {
            const decorators = ngModule.decorators;
            if (decorators) {
                const args: string = this.sanitizeArguments(decorators[0].arguments);
                NG_MODULE_VALS.forEach((val: string) => {
                    type ObjectKey = keyof Clazz;
                    const key = val as ObjectKey;
                    const arrayData = this.extractArrayData(args, val);
                    arrayData.forEach((arrVal: string) => {
                        const c: Component | Directive | undefined = this.classes.find((it: Clazz) => it.name === arrVal);
                        if (c) {
                            c.ngModule = ngModule;
                            const p = this.getProperty(ngModule, key);
                            // need to make sure object exists and is an array
                            // even though we know it should be
                            if (p && Array.isArray(p)) {
                                p.push(c);
                            }
                        }
                    });
                });
            }
        });
    }

    private sanitizeArguments(args: any) {
        return args.obj
            .replaceAll('\n', '') // remove all new line characters
            .replaceAll(' ', '')
            .replaceAll('./', '')
            .replaceAll('\'', ''); // remove any spaces so parsing is easier
    }

    getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
        return o[propertyName]; // o[propertyName] is of type T[K]
    }

    setProperty<T, K extends keyof T>(o: T, propertyName: K, val: any): void {
        o[propertyName] = val;
    }

    private extractData(val: string, key: string): string | string[] | null {
        if (val.indexOf(`${key}:[`) >= 0) {
            return this.extractArrayData(val, key);
        } else if (val.indexOf(`${key}:`) >= 0){
            let res = '';
            key += ':';
            const startIndex = val.indexOf(key) + key.length;
            for (let i = startIndex; i < val.length; i++) {
                const c = val.charAt(i);
                if (c === ',') {
                    break;
                } else {
                    res += c;
                }
            }

            return res;
        } else { 
            return null;
        }
    }

    /**
     * Parses and extracts basic JSON array data from a JSON string given the
     * key of the array data.
     * @param val 
     */
    private extractArrayData(val: string, key: string): string[] {
        key += ':[';
        const arrayData: string[] = [];
        const startIndex = val.indexOf(key) + key.length;
        let arrayVal = '';
        for(let i = startIndex; i < val.length; i++) {
            const c = val.charAt(i);
            if (c === ',' || c === ']') {
                arrayData.push(arrayVal);
                arrayVal = '';

                // break out of loop since this should be end of array data
                // so we don't read any more values
                if (c === ']') break;
            } else {
                arrayVal += c;
            }
        }
        return arrayData;
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
                f.module = module;
                module.functions.push(f);
            } else {
                let c: Clazz;
                if (t.name.endsWith('Component')) {
                    c = new Component(t);
                    this.extractComponentData(c);
                } else if (t.name.endsWith('Directive')) {
                    c = new Directive(t);
                    this.extractComponentData(c);
                } else if (t.name.endsWith('Service')) {
                    c = new Service(t); 
                } else {
                    c = new Clazz(t);
                }
                c.module = module;
                this.extractClazzData(c);
                module.classes.push(c);
                this.classes.push(c);
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
            } else if (c.kindString === 'Accessor') {
                clazz.properties.push(new Accessor(c));
            }
        });

        // sort all properties in class using custom sorter; ensures that
        // properties with decorators are ordered first
        clazz.sortProperties();
    }
}
