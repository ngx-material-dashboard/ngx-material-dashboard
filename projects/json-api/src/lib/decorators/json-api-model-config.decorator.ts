import { ModelConfig } from '../interfaces/model-config.interface';
import { JsonApiMetaModel } from '../models/json-api-meta.model';

export function JsonApiModelConfig(config: ModelConfig) {
    return (target: any) => {
        if (typeof config.meta === 'undefined' || config.meta == null) {
            config.meta = JsonApiMetaModel;
        }

        Reflect.defineMetadata('JsonApiModelConfig', config, target);
    };
}
