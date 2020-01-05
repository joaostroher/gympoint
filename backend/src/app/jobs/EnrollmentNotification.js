import { format, parseISO } from 'date-fns';
import locale from 'date-fns/locale/pt';
import Mail from '@/lib/Mail';

class EnrollmentNotification {
  get key() {
    return 'EnrollmentNotification';
  }

  async handle({ data }) {
    const { enrollment, student, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula Realizada',
      template: 'enrollment_notification',
      context: {
        student: student.name,
        plan: `${plan.title} (${plan.price.toFixed(2)} p/ mês)`,
        start_date: format(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale,
          }
        ),
        end_date: format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale,
          }
        ),
        price: enrollment.price.toFixed(2),
      },
    });
  }
}

export default new EnrollmentNotification();
