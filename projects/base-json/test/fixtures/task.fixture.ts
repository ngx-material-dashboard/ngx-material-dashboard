export const TASK_ID = '1';
export const TASK_NAME = 'Create Task Test Fixture';
export const TASK_DESCRIPTION = 'Add Task data for unit tests';
export const TASK_DUE_DATE = '2022-05-04';
export const TASK_DATE_COMPLETED = null;
export const TASK_IS_COMPLETE = false;

export function getTaskData(total: number = 1): any {
    const response: any = {
        id: TASK_ID,
        name: TASK_NAME,
        description: TASK_DESCRIPTION,
        dueDate: TASK_DUE_DATE,
        dateCompleted: TASK_DATE_COMPLETED,
        isComplete: TASK_IS_COMPLETE
    };

    return response;
}