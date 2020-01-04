import Student from '@/app/models/Student';

class StudentVerifyController {
  async show(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id, {
      attributes: ['id'],
    });
    if (!student) return res.status(404).json({ error: 'Resource not found' });
    return res.status(student);
  }
}

export default new StudentVerifyController();
