import { ParseJsonService } from '../converters/typedoc-json/services/parse-json.service';

// parse typedoc JSON
const service = new ParseJsonService();
console.log(service.modules);

// generate API markdown using parsed results
// TODO
