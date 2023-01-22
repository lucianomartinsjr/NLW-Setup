import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from './lib/prisma'

export async function appRoutes(app:FastifyInstance,){
    app.post('/habits',async (request) => {
        const createHabitBody = z.object({
            title: z.string(),
            WeekDays: z.array(
                z.number().min(0).max(6)),
        })

        const { title, WeekDays } = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                WeekDays:{
                    create: WeekDays.map(weekDay =>{
                        return {
                            week_day: weekDay,
                        }
                    })
                }
            }
        })

    })

    app.get('/day', async (request) => {
            const getDayParams = z.object({
                date: z.coerce.date()
            })
        
        const { date } = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')
        const weekDay = dayjs(date).get('day')

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date
                },

                WeekDays: {
                    some:{
                        week_day: weekDay,
                    }
                }
            },
        })

        const day = await prisma.day.findFirst({
            where: {
            date: parsedDate.toDate(),
            },
            include: {
            dayHabits: true,
            }
        })

        const completedHabits = day?.dayHabits.map(dayhabit => {
            return dayhabit.habit_id
        })

        return {
            possibleHabits,
            completedHabits,
        } 
    })
}

