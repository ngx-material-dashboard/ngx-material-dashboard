/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

export * from './base-json.module';

export * from './constants/symbols';

export * from './converters/date/date.converter';
export * from './converters/json-model/json-model.converter';

export * from './decorators/attribute.decorator';
export * from './decorators/json-api-datastore-config.decorator';
export * from './decorators/json-api-model-config.decorator';
export * from './decorators/json-attribute.decorator';
export * from './decorators/nested-attribute.decorator';

export * from './interfaces/attribute-decorator-options.interface';
export * from './interfaces/datastore-config.interface';
export * from './interfaces/json-api-error.interface';
export * from './interfaces/json-model-converter-config.interface';
export * from './interfaces/model-config.interface';
export * from './interfaces/model-type.interface';
export * from './interfaces/overrides.interface';
export * from './interfaces/property-converter.interface';

export * from './models/error-response.model';
export * from './models/json-api-meta.model';
export * from './models/json-api-query-data';
export * from './models/json-nested.model';
export * from './models/json.model';

export * from './services/json-datastore.service';
