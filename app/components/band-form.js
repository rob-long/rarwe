import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: '',
  band: null,

  router: service(),

 
  saveBand: task(function* (event) {
    event.preventDefault();
    yield this.band.save();
    yield this.router.transitionTo('bands.band.details', this.band.id);
  }),

  discardChanges: task(function* (event) {
    event.preventDefault();
    this.band.rollbackAttributes();
    yield this.router.transitionTo('bands.band.details', this.band.id);
  }),

  init() {
    this._super(...arguments);
    this.set('showErrors', {
      name: false,
      description: false
    })
  }
});
