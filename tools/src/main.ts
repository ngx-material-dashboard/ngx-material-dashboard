import { TypedocJsonParser } from '../parsers/typedoc-json/typedoc-json.parser';
import { MarkdownGenerator } from '../generators/markdown/markdown.generator';
import { MarkdownUrlGenerator } from '../generators/documentation/markdown-url.generator';
import { RouteGenerator } from '../generators/documentation/route.generator';
import { SidenavItemGenerator } from '../generators/documentation/sidenav-item.generator';

// parse typedoc JSON
const typedocJson: TypedocJsonParser = new TypedocJsonParser('docs.json');

// generate API markdown using parsed results
const markdownGenerator: MarkdownGenerator = new MarkdownGenerator();
markdownGenerator.generateMarkdown(typedocJson);

// generate map of URLs to markdown files and update routes to markdown files
// in component where markdown is rendered
const markdownUrlGenerator: MarkdownUrlGenerator = new MarkdownUrlGenerator(
    typedocJson.workspaceParser.projects
);
const urlFilesMap: { [url: string]: string[][] } =
    markdownUrlGenerator.getUrlFilesMap();
markdownUrlGenerator.updateUrlsInDocumentation(urlFilesMap);

// generate routes and update app routing
const routeGenerator: RouteGenerator = new RouteGenerator(
    typedocJson.workspaceParser.projects,
    Object.keys(urlFilesMap)
);
routeGenerator.generateRoutes();
routeGenerator.updateRouting();

// generate sidenavItems and update sidenavs in documentation app
const sidenavGenerator: SidenavItemGenerator = new SidenavItemGenerator(
    typedocJson.workspaceParser.projects
);
sidenavGenerator.generateSidenavItems();
sidenavGenerator.updateSidenavItems();

// Give some sort of indication script is complete
// TODO add better logging...
console.log('Documentation update completed');
