import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
  parseISO
} from 'date-fns'
import { Op } from 'sequelize'



import Appointment from '../models/Appointment'
class AvailableController {
  async index(req, res) {
    const { date } = req.query;
  
    if (!date) {
      return res.status(400).json({ err: 'Invalid date' })
    }

    const searchDate = parseISO(date);
    
    const appointment = await Appointment.findAll({
      where: {
        medic_id: req.params.medicId,
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(searchDate),
            endOfDay(searchDate),
          ]
        }
      }
    });
    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ]
    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
    
      const value = setSeconds(setMinutes(setHours(searchDate, hour), minute),
        0);
      console.log(appointment);
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !appointment.find(a =>
            format(a.date, 'HH:mm') === time
          ),
      };
    });

    return res.json(available);
  }
}
export default new AvailableController();
