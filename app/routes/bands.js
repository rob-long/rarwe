import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    let options = {};
    let loadedBands = this.store.peekAll('band');
    if (loadedBands.length > 0) {
      options.reload = true;
    }
    return this.store.findAll('band', options);
  },

  actions : {
    didTransition() {
      document.title = 'Bands - Rock & Roll';
    },
  }
});