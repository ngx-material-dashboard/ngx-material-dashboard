import { NotFound } from 'http-errors';
import { Repository } from 'typeorm';
import { Priority } from '../entity/priority';
import { AppDataSource } from '../conf/data-source';

export class PriorityService {
    private static db(): Repository<Priority> {
        return AppDataSource.getRepository(Priority);
    }

    public static async save(properties: Partial<Priority>): Promise<Priority> {
        let priority: Priority = new Priority();
        priority.value = properties.value;
        priority.color = properties.color;
        priority = await this.db().save(priority);

        return priority;
    }

    public static async findAll(): Promise<[Priority[], number]> {
        return await this.db().createQueryBuilder('priority').getManyAndCount();
    }

    /**
     * Returns the Task with the given 'id'. Throws a NotFound exception if no Task is found with the given 'id'.
     *
     * @param id The 'id' of the Task to get.
     * @returns The Task with the given 'id' if it exists.
     */
    public static async findById(id: number): Promise<Priority> {
        const priority: Priority | null = await this.db().findOneBy({ id: id }); //.findOne(id);
        if (!priority) throw new NotFound();
        return priority;
    }
}
