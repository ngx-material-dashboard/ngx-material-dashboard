import { Request, Response, NextFunction } from 'express';
import { PriorityService } from '../services/priority.service';
import { Priority } from '../entity/priority';

export class PriorityController {
    findAll(req: Request, res: Response, next: NextFunction) {
        try {
            return PriorityService.findAll().then(([priorities, total]) => {
                return res.json({
                    meta: {
                        total: total,
                        totalPages: 1
                    },
                    data: priorities
                });
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    save(req: Request, res: Response, next: NextFunction) {
        return PriorityService.save(req.body)
            .then((priority: Priority) => {
                return res.json(priority);
            })
            .then(next, next);
    }
}
