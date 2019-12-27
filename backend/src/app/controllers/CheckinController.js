import { addDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '@/app/models/Checkin';
import Student from '@/app/models/Student';

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params;
    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },
      order: [['created_at', 'desc']],
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student)
      return res.status(400).json({ error: "Student entered don't exists" });

    const sevenDays = addDays(new Date(), -7);
    const checkinsCount = await Checkin.count({
      where: {
        student_id,
        created_at: {
          [Op.gte]: sevenDays,
        },
      },
    });

    if (checkinsCount >= 5)
      return res
        .status(400)
        .json({ error: 'Has reached the limit of 5 checkins in 7 days' });

    const checkin = await Checkin.create({
      student_id,
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
