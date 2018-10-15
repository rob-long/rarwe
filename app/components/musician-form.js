import Component from '@ember/component';
import { or } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  router: service(),

  musician: null,
  preselectedBands: null,

  async init() {
    this._super(...arguments);
    this.set('showErrors', { name: false });
    this.set('bands', await this.store.findAll('band'));
    let musicianBands = await this.musician.get('bands');
    this.set('musicianBands', musicianBands.toArray());
  },

  selectedBands: or('preselectedBands', 'musicianBands'),
  isButtonDisabled: or('musician.validations.isInvalid', 'saveMusician.isRunning'),


  saveMusician: task(function* (event) {
    event.preventDefault();
    this.musician.set('bands', this.selectedBands);
    yield this.musician.save();
    yield this.afterSave.perform();
  }), 

  discardChanges: task(function* () {
    this.musician.rollbackAttributes();
    yield this.afterCancel.perform();
  })
});

