import {
    Attribute,
    JsonApiModelConfig
} from '@ngx-material-dashboard/base-json';
import {
    JsonModel,
    JsonNestedModelConverter
} from '@ngx-material-dashboard/json';
import { Priority } from './priority.model';

/** The priority types available for a Task. */
export type PriorityTypes = 'Low' | 'Medium' | 'High' | 'Urgent';

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
    @Attribute() isComplete?: boolean;
    /** The priority of the Task (Low, Medium, High, or Urgent). */
    @Attribute({ converter: new JsonNestedModelConverter(Priority) })
    priority?: Priority;
    /** The frequency the Task repeats: 'noRepeat', 'daily', 'weekly', 'monthly', 'yearly'. */
    @Attribute() repeats?: string;
    /** The number of times the Task will repeat (if it repeats). */
    @Attribute() endsAfter?: number;

    get priorityColor(): string {
        if (this.priority) {
            return this.priority.priorityColor;
        } else {
            return 'green';
        }
    }

    get status(): string {
        let status = '';
        const dueDate = this.dueDate;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date();
        tomorrow.setHours(0, 0, 0, 0);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (dueDate) {
            if (dueDate < today) {
                status = 'Over Due';
            } else if (dueDate.valueOf() === today.valueOf()) {
                status = 'Due Today';
            } else if (dueDate.valueOf() === tomorrow.valueOf()) {
                status = 'Due Tomorrow';
            }
        }

        return status;
    }
}
