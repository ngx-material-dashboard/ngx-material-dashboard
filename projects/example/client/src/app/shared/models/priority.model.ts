import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from '@ngx-material-dashboard/json';

@JsonApiModelConfig({
    type: 'priorities'
})
export class Priority extends JsonModel {
    @Attribute() color?: string;
    @Attribute() value?: string;
}
