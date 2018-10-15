import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import emailFieldValidation from '../validations/email-field';
import passwordFieldValidation from '../validations/password-field';
import extractServerError from '../utils/extract-server-error';

const Validations = buildValidations({
  email: emailFieldValidation,
  password: passwordFieldValidation
});

export default Controller.extend(Validations, {
  session: service(),

  showErrors: computed('_showErrors', {
    get() {
      return this._showErrors || { email: false, password: false };
    },
    set(key, value) {
      this.set('_showErrors', value);
      return this._showErrors;
    }
  }),

  baseErrors: computed('_baseErrors', {
    get() {
      return this._baseErrors || [];
    },
    set(key, value) {
      this.set('_baseErrors', value);
      return this._baseErrors;
    }
  }),

  actions: {
    async signIn(event) {
      event.preventDefault();
      this.baseErrors.clear();
      try {
        await this.session.authenticate('authenticator:credentials', this.email, this.password);
        await this.transitionToRoute('bands');
      } catch(response) {
        // NOTE: It's bacause of ember-ajax that we have a `payload` key inserted here
        // If we used ED models, this wouldn't be the case. (see sign-up controller)
        let errorMessage = extractServerError(response.payload.errors);
        this.baseErrors.pushObject(errorMessage);
      }
    }
  }
});
