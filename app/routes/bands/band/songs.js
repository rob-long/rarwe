import Route from '@ember/routing/route';
import { capitalize as capitalizeWords } from 'rarwe/helpers/capitalize';

export default Route.extend({
  queryParams: {
    sortBy: {
      as: 's',
      refreshModel: true
    },
    searchTerm: {
      as: 'q',
      refreshModel: true
    },
    pageNumber: {
      as: 'page',
      refreshModel: true
    }
  },

  model(params) {
    let { pageNumber, sortBy, searchTerm } = params;
    let band = this.modelFor('bands.band');
    return this.store.query('song', {
      bandId: band.id,
      pageNumber,
      sortBy,
      searchTerm
    })
  },

  setupController(controller) {
    this._super(...arguments);
    controller.setProperties({
      band: this.modelFor('bands.band')
    })
  },

  resetController(controller) {
      controller.setProperties({
      isAddingSong: false,
      newSongTitle: ''
    });
  },

  actions: {
    didTransition() {
      //let band = this.modelFor('bands.band');
      let band = this.controller.band;
      let name = capitalizeWords(band.get('name'));
      document.title = `${name} songs - Rock & Roll`;
    },
  }
});
