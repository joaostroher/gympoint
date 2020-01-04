import { setLocale } from 'yup';

/* eslint "no-template-curly-in-string": "off" */
setLocale({
  mixed: {
    required: '${path} é um campo obrigatório',
  },
  string: {
    email: '${path} precisa ser um email válido',
  },
});
