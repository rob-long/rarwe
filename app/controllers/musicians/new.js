import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  isButtonDisabled: readOnly('model.validations.isInvalid'),

  gotoMusicianDetails: task(function* () {
    yield this.router.transitionTo('musicians.show', this.model.id);
  })

});