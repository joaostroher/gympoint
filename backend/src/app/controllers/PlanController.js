import * as Yup from 'yup';
import Plan from '@/app/models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async show(req, res) {
    const { plan_id } = req.params;
    const plan = await Plan.findByPk(plan_id);
    if (!plan) return res.status(404).json({ error: 'Resource not found' });
    return res.status(200).json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const planExists = await Plan.findOne({
      where: {
        title: req.body.title,
      },
    });

    if (planExists)
      return res.status(400).json({
        error: `Plan with title "${req.body.title}" alredy exists`,
      });

    const plan = await Plan.create(req.body);

    return res.status(201).json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number()
        .integer()
        .positive(),
      price: Yup.number().min(0),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { plan_id } = req.params;
    const plan =
      (await Yup.number()
        .integer()
        .positive()
        .isValid(plan_id)) && (await Plan.findByPk(plan_id));

    if (!plan) return res.status(404).json({ error: 'Resource not found' });

    await plan.update(req.body);

    return res.json(plan);
  }

  async destroy(req, res) {
    const { plan_id } = req.params;
    const plan =
      (await Yup.number()
        .integer()
        .positive()
        .isValid(plan_id)) && (await Plan.findByPk(plan_id));

    if (!plan) return res.status(404).json({ error: 'Resource not found' });

    await plan.destroy();

    return res.status(200).json(plan);
  }
}

export default new PlanController();
