import { setLocale } from 'yup';

/* eslint "no-template-curly-in-string": "off" */
setLocale({
  mixed: {
    required: '${path} é um campo obrigatório',
    notType: ({ path }) => `${path} precisa ter um valor válido`,
  },
  string: {
    email: '${path} precisa ser um email válido',
  },
  number: {
    min: '${path} precisa ser maior ou igual a ${min}',
    max: '${path} precisa ser menor ou igual a ${max}',
    lessThan: '${path} precisa ser menor que ${less}',
    moreThan: '${path} precisa ser maior que ${more}',
    notEqual: '${path} precisa ser diferente de ${notEqual}',
    positive: '${path} precisa ser um número positivo',
    negative: '${path} precisa ser um número negativo',
    integer: '${path} precisa ser um número inteiro',
  },
});
