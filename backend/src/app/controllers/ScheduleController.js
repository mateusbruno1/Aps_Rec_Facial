import { startOfDay, endOfDay, parseISO } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import { Op } from 'sequelize'
class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne(
      {
        where: {
          id: req.userId,
          medic: true
        }
      }
    );
    if (!checkUserProvider) {
      return res.status(401).json({ error: "User is not a Medic" });
    }
    const { date } = req.query;
    const parsedDate = parseISO(date);
    
    const appointments = await Appointment.findAll({
      
      where: {
        medic_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(parsedDate),
            endOfDay(parsedDate),
          ]
        },
      },
      order: ['date'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ]
    })
    return res.json(appointments);
  }
  async indexAll(req,res){
    const checkUserProvider = await User.findOne(
      {
        where: {
          id: req.userId,
          medic: true
        }
      }
    );
    if (!checkUserProvider) {
      return res.status(401).json({ error: "User is not a Medic" });
    }
    const appointments = await Appointment.findAll({
      where: {
        medic_id: req.userId,
        canceled_at: null,
        date:{
          [Op.gt]: new Date(),
        }
      },
      limit: 5,
      order: [
        'date'
      ],
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ]
    })
    return res.json(appointments);
  }
}
export default new ScheduleController()
