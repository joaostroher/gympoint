import * as Yup from 'yup';
import HelpOrder from '@/app/models/HelpOrder';
import Queue from '@/lib/Queue';
import HelpOrderAnsweredMail from '@/app/jobs/HelpOrderAnsweredMail';
import Student from '@/app/models/Student';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { help_order_id } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(help_order_id);

    if (!helpOrder)
      return res.status(400).json({ error: "Help Order don't exists" });

    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    const updatedHelpOrder = await HelpOrder.findByPk(help_order_id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    Queue.add(HelpOrderAnsweredMail.key, {
      helpOrder: updatedHelpOrder,
    });

    return res.json(updatedHelpOrder);
  }
}

export default new HelpOrderController();
