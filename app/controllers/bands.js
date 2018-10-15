import Controller from '@ember/controller';
import { empty } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Controller.extend({
  isAddingBand: false,
  newBandName:  '',

  isAddButtonDisabled: empty('newBandName'),

  saveBand: task(function * (event) {
    event.preventDefault();
    let newBand = this.store.createRecord('band', { name: this.newBandName });
    yield newBand.save();
    this.setProperties({
      newBandName: '',
      isAddingBand: false
    });
    yield this.transitionToRoute('bands.band.songs', newBand.id);
  }),

  actions: {
    addBand() {
      this.set('isAddingBand', true);
    },

    cancelAddBand() {
      this.set('isAddingBand', false);
    },
  }
});
