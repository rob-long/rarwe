import Controller from '@ember/controller';
import { getWithDefault } from '@ember/object';
import { computed } from '@ember/object';

export default Controller.extend({
  isEditing: false,

  showErrors: computed('_showErrors', function() {
    return getWithDefault(this, '_showErrors', { description: false });
  }),

  actions: {
    edit() {
      this.set('isEditing', true);
    },

    async save() {
      let band = this.model;
      this.set('showErrors.description', true);
      if (band.validations.isValid) {
        await band.save();
        this.set('isEditing', false);
      }
    }
  }
});