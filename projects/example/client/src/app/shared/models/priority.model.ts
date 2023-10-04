import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from '@ngx-material-dashboard/json';

@JsonApiModelConfig({
    type: 'priorities'
})
export class Priority extends JsonModel {
    @Attribute() value?: string;

    get priorityColor(): string {
        if (this.value === 'Urgent') {
            return 'red';
        } else if (this.value === 'High') {
            return 'orange';
        } else if (this.value === 'Medium') {
            return 'yellow';
        } else {
            return 'green';
        }
    }
}
