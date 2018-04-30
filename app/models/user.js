import DS from 'ember-data';
import { buildValidations } from 'ember-cp-validations';
import emailFieldValidation from 'rarwe/validations/email-field';
import passwordFieldValidation from 'rarwe/validations/password-field';
const { Model, attr } = DS;

const Validations = buildValidations({
  email: emailFieldValidation,
  password: passwordFieldValidation
});

export default Model.extend(Validations, {
  email: attr('string'),
  password: attr('string'),
});
