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
import { Clazz } from 'tools/converters/typedoc-json/models/clazz.model';
import { FunctionModel } from 'tools/converters/typedoc-json/models/function.model';

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

// TODO REFACTOR ALL OF THIS CODE; I am not happy at all with how this code
// turned out, but it was a quick and dirty way of automatically generating
// a string representation of routes from the object output of typedoc JSON
// details that can be replaced using replace-in-file

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
                let classRoutes = '';
                let children: string = '[';
                const className = `${reformatText(clazz.name)}`;
                const classUrls: string[] = moduleTypeUrls.filter((it: string) => it.includes(`/${className}/`));
                classUrls.forEach((url: string, i: number) => {
                    url = url.replace(`/${module.displayName}/`, '');
                    url = url.replace(`${moduleType}/`, '');
                    url = url.replace(`${className}/`, '');
                    if (i > 0) {
                        children += ',';
                    }
                    children += createBasicRoute(url);
                });
                if (children != '[') {
                    children += `,${createRedirectRoute('overview')}`;
                }
                children += ']';

                const res = addChildrenToRoutes(
                    children,
                    classRoutes, 
                    className,
                    classIndex,
                    moduleTypeChildren,
                    createRouteWithChildrenAndComponent
                );
                moduleTypeChildren = res.routeChildren;
                classIndex = res.index;
            });

            module.functions.forEach((f: FunctionModel) => {
                let classRoutes = '';
                let children: string = '[';
                const functionName = `${reformatText(f.name)}`;
                const functionUrls: string[] = moduleTypeUrls.filter((it: string) => it.includes(`/${functionName}/`));
                functionUrls.forEach((url: string, i: number) => {
                    url = url.replace(`/${module.displayName}/`, '');
                    url = url.replace(`${moduleType}/`, '');
                    url = url.replace(`${functionName}/`, '');
                    if (i > 0) {
                        children += ',';
                    }
                    children += createBasicRoute(url);
                });
                if (children != '[') {
                    children += `,${createRedirectRoute('overview')}`;
                }
                children += ']';

                const res = addChildrenToRoutes(
                    children,
                    classRoutes, 
                    functionName,
                    classIndex,
                    moduleTypeChildren,
                    createRouteWithChildrenAndComponent
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

        // handle URLs that do not include module types
        const nonModuleTypeUrls: string[] = filterModuleTypeUrls(`/${module.displayName}/`, moduleUrls, false, true);
        let nonModuleTypeUrlsIndex: number = 0;
        let nonModuleChildren: string = '';
        nonModuleTypeUrls.forEach((url: string) => {
            url = url.replace(`/${module.displayName}`, '');
            if (url !== '') {
                if (nonModuleTypeUrlsIndex > 0) {
                    nonModuleChildren += ',';
                }

                url = url.slice(1);
                if (url !== 'json-overview') {
                    // ignore json-overview because this is a special case
                    // handled below, and remove first '/'; text up to next
                    // '/' should be name of class
                    const urls = url.split('/');
                    const basicRoute = createBasicRoute(urls[1]);
                    nonModuleChildren += createRouteWithChildrenAndComponent(urls[0], `[${basicRoute}]`);
                }
            } else {
                // TODO fix this code because this condition never occurs
                if (nonModuleTypeUrlsIndex > 0) {
                    nonModuleChildren += ',';
                }

                // if url matches module.display name then url after replace
                // url will be empty string; so just create a basic route since
                // this should be an overview page
                nonModuleChildren += createBasicRoute('overview');
            }
            nonModuleTypeUrlsIndex++;
        });

        // add a comma to separate moduleChildren from nonModuleChildren if
        // there are any
        if (moduleChildren !== '[') {
            moduleChildren += ', ';
        }

        // add nonModuleChildren to moduleChildren if there are any
        if (nonModuleChildren !== '') {
            moduleChildren += nonModuleChildren;
        }

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
    routes += createBasicRoute('json-overview');
    routes += `, ${createBasicRoute('')}`;

    routes += ']';

    const file = path.join(
        baseDocsSrcDir,
        'app',
        'app-routing.module.ts'
    );
    const replaceInFile: ReplaceInFile = new ReplaceInFile(file);
    replaceInFile.replace(
        /const routes: Routes = \[.*\];/g,
        `const routes: Routes = [{ path: '', component: LayoutComponent, children: ${routes}}];`
    );
}

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

function createRouteWithChildren(path: string, children: string) {
    return `{ path: '${path}', children: ${children}}`;
}

function createRouteWithChildrenAndComponent(path: string, children: string) {
    return `{ path: '${path}', component: TabbedDocumentComponent, children: ${children}}`;
}

function createBasicRoute(path: string) {
    return `{ path: '${path}', component: TabbedDocumentTabComponent }`;
}

function createRedirectRoute(path: string) {
    return `{ path: '', pathMatch: 'full', redirectTo: '${path}' }`;
}
