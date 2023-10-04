export interface TaskFilter {
    special?: string | null;
    isComplete: boolean;
    name?: string | null;
    description?: string | null;
    priority?: string | null;
}
