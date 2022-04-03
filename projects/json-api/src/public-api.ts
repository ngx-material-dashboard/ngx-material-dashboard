/*
 * Public API Surface of json-api
 */

export * from './lib/constants/symbols';

export * from './lib/decorators/attribute.decorator';
export * from './lib/decorators/belongs-to.decorator';
export * from './lib/decorators/has-many.decorator';
export * from './lib/decorators/json-api-datastore-config.decorator';
export * from './lib/decorators/json-api-model-config.decorator';
export * from './lib/decorators/json-attribute.decorator';
export * from './lib/decorators/nested-attribute.decorator';

export * from './lib/interfaces/datastore-config.interface';

export * from './lib/models/error-response.model';
export * from './lib/models/json-api-meta.model';
export * from './lib/models/json-api-query-data';
export * from './lib/models/json-api.model';
export * from './lib/models/json-nested.model';

export * from './lib/services/json-api-datastore.service';
