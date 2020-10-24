import Appointment from '../models/Appointment';
import User from '../models/User';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import { Op } from 'sequelize'


class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    console.log(req.query);
    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null
      },
      order: [
        'date'
      ],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: User,
          as: 'medic',
          attributes: ['id', 'name'],
        },
      ]
    })
    return res.json(appointments)
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      medic_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { medic_id, date } = req.body;

     /**
     * check if medic_id is a provider
     */
    const isMedic = await User.findOne({
      where: {
        id: medic_id,
        medic: true
      }
    });
    if (!isMedic) {
      return res.status(401).json({ error: 'You can only create appointments with medics' })
    }

    if (req.userId == medic_id) {
      return res.status(401).json({ error: 'You cannot create an appointment with yourself' })
    }
    /**
      * check for past date
      */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited' })

    }
    /**
     * Check date availability
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        medic_id,
        canceled_at: null,
        date: hourStart
      }
    })
    if (checkAvailability) {
      return res.status(400)
        .json({ error: 'Appointment date is not AVailable ' })
    }

    const medic = await User.findByPk(medic_id);
    const user  = await User.findByPk(req.userId);


    let quantidade = medic.quantity_consults + 1;
    let quanttidade_paciente = medic.quantity_consults + 1;
    
    medic.update({quantity_consults:quantidade});
    user.update({quantity_consults:quantidade_paciente});

    const appointment = await Appointment.create({
      user_id: req.userId,
      medic_id,
      date: hourStart
    });

    res.json(appointment)

  }
  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'medic',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ]
    });
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to  cancel this appointment",
      });
    }
    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: "You can only cancel appointments 2 hours in advance"
      })
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    })
    return res.json(appointment);
  }
  async next(req,res){
    const { page = 1 } = req.query;
    console.log(req.query);
    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
        date:{
          [Op.gt]: new Date(),
        }
      },
      order: [
        'date'
      ],
      limit: 5,
      offset: (page - 1) * 5,
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: User,
          as: 'medic',
          attributes: ['id', 'name'],
        },
      ]
    })
    return res.json(appointments)
  }
}

export default new AppointmentController();
