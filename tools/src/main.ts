import { ParseJsonService } from '../converters/typedoc-json/services/parse-json.service';
import { updateMarkdownRoutes } from '../generators/documentation/markdown-url-directories/main';
import { generateSidenavItems } from '../generators/documentation/route-sidenav-items/main';
import { generateMarkdown } from '../generators/markdown/main';
import { generateRoutes } from '../generators/documentation/routes/main';

// parse typedoc JSON
const service = new ParseJsonService();

// generate API markdown using parsed results
generateMarkdown(service.modules);

// update markdown routes and get map of URLs to markdown files
const urlFilesMap = updateMarkdownRoutes(service.modules);

generateSidenavItems(service.modules, Object.keys(urlFilesMap), service.ngModuleClasses);
generateRoutes(service.modules, Object.keys(urlFilesMap));
