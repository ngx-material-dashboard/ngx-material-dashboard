import * as path from 'path';
import { ReplaceInFile } from '../../../files/replace-in-file';
import { SidenavItem } from '@ngx-material-dashboard/widgets';
import { Module } from '../../../converters/typedoc-json/models/module.model';
import { Route, Routes } from '@angular/router';
import {
    capitalizeFirstLetter,
    filterModuleTypeUrls,
    reformatText
} from '../helpers';
import { Clazz } from 'tools/converters/typedoc-json/models/clazz.model';

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

const moduleTypes: string[] = [
    'components',
    'directives',
    'interfaces',
    'modules',
    'services'
]

export function generateRoutes(modules: Module[], urls: string[]) {
    let routes = '[';
    let routeIndex = 0;
    modules.forEach((module: Module) => {
        let moduleRoutes = '';
        let moduleChildren = '[';
        let moduleTypeIndex: number = 0;
        const moduleUrls: string[] = urls.filter((it: string) => it.includes(module.displayName));        
        moduleTypes.forEach((moduleType: string) => {
            let moduleTypeRoutes = '';
            let moduleTypeChildren = '[';
            let classIndex: number = 0;
            const moduleTypeUrls: string[] = moduleUrls.filter((it: string) => it.includes(moduleType));
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
                children += ']';

                if (children !== '[]') {
                    const classRoute = createRouteWithChildrenAndComponent(className, children);
                    classRoutes += classRoute;

                    if (classIndex > 0) {
                        moduleTypeChildren += ',';
                    }
                    moduleTypeChildren += classRoutes;
                    classIndex++;
                }
            });
            moduleTypeChildren += ']';

            if (moduleTypeChildren !== '[]') {
                const moduleTypeRoute = createRouteWithChildren(moduleType, moduleTypeChildren);
                moduleTypeRoutes += moduleTypeRoute;

                if (moduleTypeIndex > 0) {
                    moduleChildren += ',';
                }
                moduleChildren += moduleTypeRoutes;
                moduleTypeIndex++;
            }
        });
        moduleChildren += ']';

        if (moduleChildren !== '[]') {
            const moduleRoute = createRouteWithChildren(module.displayName, moduleChildren);
            moduleRoutes += moduleRoute;

            if (routeIndex > 0) {
                routes += ',';
            } 
            routes += moduleRoutes;
            routeIndex++;
        }
        
        const nonModuleTypeUrls: string[] = filterModuleTypeUrls(moduleUrls, false, true);
        nonModuleTypeUrls.forEach((url: string) => {
            url = url.replace(`${module.displayName}/`, '');
            //console.log(url);
            //routes.push(createTabbedRoute(url));
        });
    });
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

function createRouteWithChildren(path: string, children: string) {
    return `{ path: '${path}', children: ${children}}`;
}

function createRouteWithChildrenAndComponent(path: string, children: string) {
    return `{ path: '${path}', component: TabbedDocumentComponent, children: ${children}}`;
}

function createTabbedRoute(path: string) {
    const overviewChild = createBasicRoute('overview');
    const apiChild = createBasicRoute('api');
    const children = `[${overviewChild}, ${apiChild}]`;
    return createRouteWithChildrenAndComponent(path, children);
}

function createBasicRoute(path: string) {
    return `{ path: '${path}', component: TabbedDocumentTabComponent }`;
}
