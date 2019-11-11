import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '@/lib/Mail';

class HelpOrderAnsweredMail {
  get key() {
    return 'HelpOrderAnsweredMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;
    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Questão Respondida',
      template: 'help_order_answered',
      context: {
        student: helpOrder.student.name,
        date: format(
          parseISO(helpOrder.createdAt),
          "dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        answer_date: format(
          parseISO(helpOrder.answer_at),
          "dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}

export default new HelpOrderAnsweredMail();
