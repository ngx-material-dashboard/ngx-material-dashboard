import * as path from 'path';
import { ReplaceInFile } from '../../../files/replace-in-file';
import { SidenavItem } from '@ngx-material-dashboard/widgets';
import { Module } from '../../../converters/typedoc-json/models/module.model';
import { Route, Routes } from '@angular/router';
import {
    capitalizeFirstLetter,
    filterModuleTypeUrls,
    moduleTypes,
    reformatText
} from '../helpers';
import { Clazz } from '../../../converters/typedoc-json/models/clazz.model';
import { FunctionModel } from '../../../converters/typedoc-json/models/function.model';
import { TypeAlias } from '../../../converters/typedoc-json/models/type-alias.model';
import { TypedocBase } from 'tools/converters/typedoc-json/models/typedoc-base.model';

const baseDocsSrcDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'projects',
    'documentation',
    'src'
);

/**
 * Generate a string representation of routes from the object output of typedoc
 * JSON details that can be replaced in files using replace-in-file library.
 *
 * TODO REFACTOR ALL OF THIS CODE; This code has been refactored quite a bit
 * since I initially wrote it, and it has turned out quite a bit better
 * surprisingly (especially from where it started); there is still plenty more
 * that I can do to cut down on the repeated code and hopefully make this code
 * a bit easier to follow, maintain, and use
 * 
 * @param modules 
 * @param urls 
 */
export function generateRoutes(modules: Module[], urls: string[]) {
    let routes = '[';
    let routeIndex = 0;
    modules.forEach((module: Module) => {
        let moduleRoutes = '';
        let moduleChildren = '[';
        let moduleTypeIndex: number = 0;
        const moduleUrls: string[] = urls.filter((it: string) => it.includes(`/${module.displayName}/`));        
        moduleTypes.forEach((moduleType: string) => {
            let moduleTypeRoutes = '';
            let moduleTypeChildren = '[';
            let classIndex: number = 0;

            // handle URLs that include module types
            const moduleTypeUrls: string[] = moduleUrls.filter((it: string) => it.includes(`/${module.displayName}/${moduleType}/`));
            module.classes.forEach((clazz: Clazz) => {
                if (!clazz.name.includes('Module') && !clazz.isConstant) {
                    const res = generateChildrenRoutes(
                        clazz,
                        moduleTypeUrls,
                        module,
                        classIndex,
                        moduleTypeChildren,
                        moduleType
                    );
                    moduleTypeChildren = res.routeChildren;
                    classIndex = res.index;
                }
            });

            module.functions.forEach((f: FunctionModel) => {
                const res = generateChildrenRoutes(
                    f,
                    moduleTypeUrls,
                    module,
                    classIndex,
                    moduleTypeChildren,
                    moduleType
                );
                moduleTypeChildren = res.routeChildren;
                classIndex = res.index;
            });

            module.typeAliases.forEach((f: TypeAlias) => {
                const res = generateChildrenRoutes(
                    f,
                    moduleTypeUrls,
                    module,
                    classIndex,
                    moduleTypeChildren,
                    moduleType
                );
                moduleTypeChildren = res.routeChildren;
                classIndex = res.index;
            });
            moduleTypeChildren += ']';

            const res = addChildrenToRoutes(
                moduleTypeChildren,
                moduleTypeRoutes,
                moduleType,
                moduleTypeIndex,
                moduleChildren,
                createRouteWithChildren
            );
            moduleChildren = res.routeChildren;
            moduleTypeIndex = res.index;
        });

        // handle URLs that are non specific classes (i.e. not component,
        // directive, interface, etc.)
        const nonModuleTypeUrls: string[] = filterModuleTypeUrls(`${module.displayName}`, moduleUrls, false, true);
        module.nonSpecificClasses.forEach((clazz: Clazz) => {
            const res = generateChildrenRoutes(
                clazz,
                nonModuleTypeUrls,
                module,
                moduleTypeIndex,
                moduleChildren
            );
            moduleChildren = res.routeChildren;
            moduleTypeIndex = res.index;
        });

        // add default overview route for entire module
        if (moduleChildren !== '[') {
            moduleChildren += ', ';
        }
        moduleChildren += createBasicRoute('');
        moduleChildren += ']';

        // generate top level routes with all moduleChildren
        const res = addChildrenToRoutes(
            moduleChildren,
            moduleRoutes,
            module.displayName,
            routeIndex,
            routes,
            createRouteWithChildren
        );
        routes = res.routeChildren;
        routeIndex = res.index;
    });

    // handle special case for json-overview since this is a
    // standalone overvew markdown file that is for all JSON
    // libraries
    if (routes != '[') {
        routes += ', ';
    }
    routes += `${createBasicRoute('json-overview')}`;
    routes += `, ${createBasicRoute('overview')}]`;
    routes = createRouteWithChildrenAndComponent('', routes, 'LayoutComponent');

    let homeRoute = `${createLazyLoadedRoute('', './routed-modules/home/home.module', 'HomeModule')}`;

    const file = path.join(
        baseDocsSrcDir,
        'app',
        'app-routing.module.ts'
    );
    const replaceInFile: ReplaceInFile = new ReplaceInFile(file);
    replaceInFile.replace(
        /const routes: Routes = \[.*\];/g,
        `const routes: Routes = [${homeRoute}, ${routes}];`
    );
}

/**
 * A route with children (that does not include a component with router outlet).
 *
 * @param path The path for the route.
 * @param children The children routes.
 * @returns A route with children.
 */
function createRouteWithChildren(path: string, children: string) {
    return `{ path: '${path}', children: ${children}}`;
}

/**
 * A route with children and a component (that should include a router outlet).
 *
 * @param path The path for the route.
 * @param children The children routes.
 * @param component The component to render at the base of the route.
 * @returns A route with children and a component.
 */
function createRouteWithChildrenAndComponent(path: string, children: string, component: string = 'TabbedDocumentComponent') {
    return `{ path: '${path}', component: ${component}, children: ${children}}`;
}

/**
 * A basic route to the TabbedDocumentTabComponent for the given path. This
 * is the most basic route that is being used in the documentation app.
 *
 * @param path The path for the route.
 * @returns A route to the TabbedDocumentTabComponent for the given path.
 */
function createBasicRoute(path: string) {
    return `{ path: '${path}', component: TabbedDocumentTabComponent }`;
}

/**
 * Creates and returns a lazy loaded route. This will work for paths with values
 * or empty paths (i.e. path === '').
 *
 * @param path The path for the route.
 * @param importPath The path to the module to use in the import statement.
 * @param moduleName The name of the module to lazy load.
 * @returns A lazy loaded route.
 */
function createLazyLoadedRoute(path: string, importPath: string, moduleName: string) {
    if (path === '') {
        return `{ path: '${path}', pathMatch: 'full', loadChildren: () => import('${importPath}').then(m => m.${moduleName})}`;
    } else {
        return `{ path: '${path}', loadChildren: () => import('${importPath}').then(m => m.${moduleName})}`;
    }
}

/**
 * Creates and returns a route to redirect to the given path when no path is
 * provided (i.e. path === '').
 *
 * @param path The path to redirecto to. 
 * @returns A route to redirect to given path when no path is provided.
 */
function createRedirectRoute(path: string) {
    return `{ path: '', pathMatch: 'full', redirectTo: '${path}' }`;
}

function generateChildrenRoutes(
    base: TypedocBase,
    urls: string[],
    module: Module,
    classIndex: number,
    moduleTypeChildren: string,
    moduleType?: string
) {
    let classRoutes = '';
    const className = `${reformatText(base.name)}`;
    const children: string = generateChildren(
        className,
        urls,
        module,
        moduleType
    );

    return addChildrenToRoutes(
        children,
        classRoutes, 
        className,
        classIndex,
        moduleTypeChildren,
        createRouteWithChildrenAndComponent
    );
}

/**
 * Adds an array of child routes to an existing set of routes, if there are
 * children routes defined (i.e. if children !== '[]').
 *
 * @param children 
 * @param routes 
 * @param routeName 
 * @param index 
 * @param routeChildren 
 * @param callback 
 * @returns 
 */
function addChildrenToRoutes(
    children: string,
    routes: string,
    routeName: string,
    index: number,
    routeChildren: string,
    callback: (route: string, children: string) => string
) {
    if (children !== '[]') {
        const route = callback(routeName, children);
        routes += route;

        if (index > 0) {
            routeChildren += ', ';
        }
        routeChildren += routes;
        index++;
    }

    return { routeChildren, index };
}

/**
 * Generates string value that can be inserted as a children array in Angular
 * route using string replace. The resulting value will be inserted into a route
 * module file using string replace, so this must be formatted properly as a
 * string value because converting an actual array of objects into a string
 * doesn't seem to work properly (although it would make it a hell of a lot
 * easier if I could just build the array instead of having to write it out as
 * as string).
 *
 * @param name The name of the class/function at route.
 * @param urls An array of URLs that should include URLs associated with name.
 * @param module The module/library where the class is defined.
 * @param moduleType An optional type (i.e. component, service, etc).
 * @returns A string value of children routes.
 */
function generateChildren(
    name: string,
    urls: string[],
    module: Module,
    moduleType?: string
): string {
    let children: string = '[';
    const classUrls: string[] = urls.filter((it: string) => it.includes(`/${name}/`));
    classUrls.forEach((url: string, i: number) => {
        url = url.replace(`/${module.displayName}/`, '');
        if (moduleType) {
            url = url.replace(`${moduleType}/`, '');
        }
        url = url.replace(`${name}/`, '');
        if (i > 0) {
            children += ',';
        }
        children += createBasicRoute(url);
    });
    if (children != '[') {
        children += `,${createRedirectRoute('overview')}`;
    }
    children += ']';
    return children;
}
