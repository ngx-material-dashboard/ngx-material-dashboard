import { ParseJsonService } from '../converters/typedoc-json/services/parse-json.service';
import { generateMarkdown } from '../generators/markdown/main';

// parse typedoc JSON
const service = new ParseJsonService();

// generate API markdown using parsed results
// TODO
generateMarkdown(service.modules);
