import { Request, Response, response } from 'express';

import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string
};

export default class ClassesController {
    async create(req: Request, res: Response) {
        const {
            name, avatar, whatsapp, bio, subject, cost, schedule
        } = req.body;

        const transaction = await db.transaction(); // puts all inserts in one transaction

        try {
            const insertedUserIds = await transaction('users').insert({ // insert returns an array with the inserted ids
                name, avatar, whatsapp, bio
            });
        
            const insertedClassesIds = await transaction('classes').insert({
                subject, cost, user_id: insertedUserIds[0]
            });
        
            const classSchedule = schedule.map((element: ScheduleItem) => {
                return {
                    week_day: element.week_day,
                    from: convertHoursToMinutes(element.from),
                    to: convertHoursToMinutes(element.to),
                    class_id: insertedClassesIds[0]
                };
            });
        
            await transaction('class_schedule').insert(classSchedule);
        
            await transaction.commit();
        
            return res.status(201).send();

        } catch (err) {
            transaction.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating a new class'
            });
        }
    }

    async index(req: Request, res: Response) {
        const filters = req.query;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return res.status(400).json({
                error: 'Missing filters.'
            });
        }

        const timeInMinutes = convertHoursToMinutes(filters.time as string);

        const classes = await db('classes').
            whereExists(function() {
                this.select('class_schedule.*').
                    from('class_schedule').
                    whereRaw('`class_schedule`.`class_id` = `classes`.`id`').
                    whereRaw('`class_schedule`.`week_day` = ??', [Number(filters.week_day)]).
                    whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]).
                    whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            }).
            where('classes.subject', '=', filters.subject as string).
            join('users', 'classes.user_id', '=', 'users.id').
            select(['classes.*', 'users.*']);

        return res.json(classes);
    }
}