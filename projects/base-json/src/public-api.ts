/*
 * Public API Surface of base-json
 */
export * from './lib/constants/symbols';

export * from './lib/converters/date/date.converter';

export * from './lib/decorators/attribute.decorator';
export * from './lib/decorators/json-api-datastore-config.decorator';
export * from './lib/decorators/json-api-model-config.decorator';

export * from './lib/interfaces/attribute-decorator-options.interface';
export * from './lib/interfaces/datastore-config.interface';
export * from './lib/interfaces/json-api-error.interface';
export * from './lib/interfaces/model-config.interface';
export * from './lib/interfaces/model-type.interface';
export * from './lib/interfaces/overrides.interface';
export * from './lib/interfaces/property-converter.interface';

export * from './lib/models/error-response.model';
export * from './lib/models/json-api-meta.model';
export * from './lib/models/json-api-query-data';
export * from './lib/models/json.model';

export * from './lib/services/json-datastore.service';
