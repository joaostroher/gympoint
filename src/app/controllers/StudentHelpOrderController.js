import * as Yup from 'yup';
import HelpOrder from '@/app/models/HelpOrder';
import Student from '@/app/models/Student';

class StudentHelpOrderController {
  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student)
      return res.status(400).json({ error: "Student don't exists" });

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id,
      },
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.params;
    const { question } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student)
      return res.status(400).json({ error: "Student don't exists" });

    const helpOrder = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json(helpOrder);
  }
}

export default new StudentHelpOrderController();
