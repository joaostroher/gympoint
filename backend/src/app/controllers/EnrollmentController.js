import * as Yup from 'yup';
import { addMonths, parseISO, startOfDay } from 'date-fns';

import Enrollment from '@/app/models/Enrollment';
import Student from '@/app/models/Student';
import Plan from '@/app/models/Plan';

import Queue from '@/lib/Queue';
import EnrollmentNotification from '@/app/jobs/EnrollmentNotification';

class EnrollmentController {
  static getDefaultInclude() {
    return [
      {
        model: Student,
        as: 'student',
        attributes: ['name'],
      },
      {
        model: Plan,
        as: 'plan',
        attributes: ['title'],
      },
    ];
  }

  async index(req, res) {
    const { page, pagination } = req;
    const count = await Enrollment.count();
    const enrollments = await Enrollment.findAll({
      include: EnrollmentController.getDefaultInclude(),
      ...pagination,
    });
    return res.json(
      page
        ? { pages: Math.ceil(count / pagination.limit), data: enrollments }
        : enrollments
    );
  }

  async show(req, res) {
    const { enrollment_id } = req.params;

    const enrollment = await Enrollment.findByPk(enrollment_id, {
      include: EnrollmentController.getDefaultInclude(),
    });

    if (!enrollment)
      return res.status(404).json({ error: 'Resource not found' });

    return res.status(200).json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date()
        .min(startOfDay(new Date(), -1))
        .required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);
    if (!student)
      return res.status(400).json({
        error: "Student entered don't exists",
      });

    const plan = await Plan.findByPk(plan_id);
    if (!plan)
      return res.status(400).json({
        error: "Plan entered don't exists",
      });

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const price = plan.duration * plan.price;

    const enrollment = await Enrollment.create({
      ...req.body,
      end_date,
      price,
    });

    Queue.add(EnrollmentNotification.key, {
      enrollment,
      student,
      plan,
    });

    return res.status(201).json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date().min(startOfDay(new Date(), -1)),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { enrollment_id } = req.params;
    const enrollment =
      (await Yup.number()
        .integer()
        .positive()
        .isValid(enrollment_id)) && (await Enrollment.findByPk(enrollment_id));

    if (!enrollment)
      return res.status(404).json({ error: 'Resource not found' });

    const { student_id, plan_id, start_date } = {
      ...enrollment.dataValues,
      ...schema.cast(req.body),
    };
    const student = await Student.findByPk(student_id);
    if (!student)
      return res.status(400).json({
        error: "Student entered don't exists",
      });

    const plan = await Plan.findByPk(plan_id);
    if (!plan)
      return res.status(400).json({
        error: "Plan entered don't exists",
      });

    const end_date = addMonths(start_date, plan.duration);
    const price = plan.duration * plan.price;

    await enrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.status(201).json(enrollment);
  }

  async destroy(req, res) {
    const { enrollment_id } = req.params;
    const enrollment =
      (await Yup.number()
        .integer()
        .positive()
        .isValid(enrollment_id)) && (await Enrollment.findByPk(enrollment_id));

    if (!enrollment)
      return res.status(404).json({ error: 'Resource not found' });

    await enrollment.destroy();

    return res.status(200).json(enrollment);
  }
}

export default new EnrollmentController();
