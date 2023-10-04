import * as moment from 'moment';

const today: moment.Moment = moment().startOf('day').utc();
const tomorrow: moment.Moment = moment().startOf('day').add(1, 'days').utc();
const twoDaysFromToday: moment.Moment = moment()
    .startOf('day')
    .add(2, 'days')
    .utc();
const yesterday: moment.Moment = moment()
    .startOf('day')
    .subtract(1, 'days')
    .utc();

export class TasksHelper {
    private tasks: any[];
    public pendingTasks: any[];
    public completeTasks: any[];
    public tasksDueToday: any[];
    public tasksDueTomorrow: any[];
    public tasksOverDue: any[];

    constructor(tasks: any[]) {
        this.tasks = tasks;
        this.pendingTasks = this.filterTasks(false);
        this.completeTasks = this.filterTasks(true);
        this.tasksDueToday = this.filterTasks(
            false,
            today.format('MM/DD/YYYY')
        );
        this.tasksDueTomorrow = this.filterTasks(
            false,
            tomorrow.format('MM/DD/YYYY')
        );
        this.tasksOverDue = this.tasks.filter((task: any) => {
            return !task.isComplete && task.dueDate < today;
        });
    }

    filterTasks(isComplete: boolean = false, filter: string = '') {
        let tasks: any[];

        if (filter != null && filter != '') {
            const date = moment(
                filter,
                [
                    'MM/DD/YYYY',
                    'MM/D/YYYY',
                    'M/DD/YYYY',
                    'M/D/YYYY',
                    moment.ISO_8601
                ],
                true
            );
            if (date.isValid()) {
                tasks = this.getTasksDue(date.toDate());
            } else if (filter == 'overDue') {
                tasks = this.tasksOverDue;
            } else {
                tasks = this.tasks.filter((task: any) => {
                    filter = filter.toLowerCase();
                    return (
                        task.name.toLowerCase().indexOf(filter) >= 0 ||
                        task.description.toLowerCase().indexOf(filter) >= 0
                    );
                });
            }
        } else {
            tasks = this.tasks;
        }

        return tasks.filter((task: any) => {
            return task.isComplete == isComplete;
        });
    }

    getTasksDue(date: Date, tasks?: any[]) {
        if (!tasks) {
            tasks = this.tasks;
        }
        return tasks.filter((task: any) => {
            if (task.isComplete) {
                return (
                    (task.dueDate.getDate() == date.getDate() &&
                        task.dueDate.getMonth() == date.getMonth() &&
                        task.dueDate.getFullYear() == date.getFullYear()) ||
                    (task.dateCompleted.getDate() == date.getDate() &&
                        task.dateCompleted.getMonth() == date.getMonth() &&
                        task.dateCompleted.getFullYear() == date.getFullYear())
                );
            } else {
                return (
                    task.dueDate.getDate() == date.getDate() &&
                    task.dueDate.getMonth() == date.getMonth() &&
                    task.dueDate.getFullYear() == date.getFullYear()
                );
            }
        });
    }
}
