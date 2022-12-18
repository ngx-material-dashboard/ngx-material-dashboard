import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json/src/lib';
import { JsonModel } from './json.model';

@JsonApiModelConfig({
    type: 'tasks'
})
export class Task extends JsonModel {
    /** The name of the Task. */
    @Attribute() name?: string;
    /** The description of the Task.*/
    @Attribute() description?: string;
    /** The date the Task is due. */
    @Attribute() dueDate?: Date;
    /** The date the Task is completed. */
    @Attribute() dateCompleted?: Date;
    /** Set to true if the Task is complete, false if it is pending. */
    @Attribute() isComplete: boolean = false;
}
