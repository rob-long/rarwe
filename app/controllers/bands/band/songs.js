import Controller from '@ember/controller';
import { empty, gt } from '@ember/object/computed';
import { computed } from '@ember/object';
import { capitalize } from 'rarwe/helpers/capitalize';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  pageNumber: 1,

  hasPrevPage: gt('pageNumber', 1),
  hasNextPage: computed('pageNumber', 'model.meta.page-count', function() {
    return this.pageNumber < this.model.meta['page-count'];
  }),

  isAddingSong: false,
  newSongTitle: '',

  isAddButtonDisabled: empty('newSongTitle'),

  sortBy: '-rating,title',

  searchTerm: '',

  newSongPlaceholder: computed('band.name', function() {
    let bandName = this.get('band.name');
    return `New ${capitalize(bandName)} song`;
  }),

  updateSearchTerm: task(function* (value) {
    yield timeout(500);
    yield this.transitionToRoute({
      queryParams: {
        pageNumber: 1,
        searchTerm: value
      }
    })
    
  }).restartable(),

  actions: {
    addSong() {
      this.set('isAddingSong', true);
    },

    cancelAddSong() {
      this.set('isAddingSong', false);
    },

    async saveSong(event) {
      event.preventDefault();
      let newSong = this.store.createRecord('song', {
        title: this.newSongTitle,
        band: this.band
      });
      await newSong.save();
      this.model.update();
      this.set('newSongTitle', '');
      this.flashMessages.success('The new song has been created');
    },

    updateRating(song, rating) {
      song.set('rating', song.rating === rating ? 0 : rating);
      return song.save();
    }

  }
});
