import { Op } from 'sequelize';
import * as Yup from 'yup';
import Student from '@/app/models/Student';

class StudentController {
  async index(req, res) {
    const { page, pagination } = req;
    const query = req.query.q;
    const where = query
      ? {
          name: {
            [Op.iLike]: query ? `%${query}%` : null,
          },
        }
      : null;
    const count = await Student.count({ where });
    const students = await Student.findAll({
      where,
      ...pagination,
    });
    return res.json(
      page
        ? { pages: Math.ceil(count / pagination.limit), data: students }
        : students
    );
  }

  async show(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) return res.status(404).json({ error: 'Resource not found' });
    return res.json(student);
  }

  async delete(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) return res.status(404).json({ error: 'Resource not found' });
    await student.destroy();
    return res.status(200).end();
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.create(req.body);
    return res.status(201).json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.params;
    const student =
      (await Yup.number()
        .integer()
        .positive()
        .isValid(student_id)) && (await Student.findByPk(student_id));

    if (!student) return res.status(404).json({ error: 'Resource not found' });

    await student.update(req.body);

    return res.json(student);
  }
}

export default new StudentController();
