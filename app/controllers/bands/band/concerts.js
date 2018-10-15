import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { readOnly,equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import geolib from 'geolib';

const milesToKilometers = 1.61;

export default Controller.extend({
  showConcerts: 'all',
  showingAll: equal('showConcerts', 'all'),
  showingNearby: equal('showConcerts','nearby'),
  userLocation: readOnly('geolocation.currentLocation'),
  selectedDistance: 500, 

  geolocation: service(),
  currentUser: service(),

  useMiles: readOnly('currentUser.user.prefersImperial'),

  init() {
    this._super(...arguments);
    this.set('nearbyDistances', [200, 500, 1000, 2000, 100000]);
  },

  maxDistance: computed('selectedDistance', 'useMiles', function () {
    if (this.useMiles) {
      return this.selectedDistance * milesToKilometers * 1000;
    }
    return this.selectedDistance * 1000;
  }),
  
  concerts: computed('showingAll', 'model.[]', 'userLocation', 'selectedDistance', function () {
    if (this.showingAll) {
      return this.model;
    }
    let [userLat, userLng] = this.userLocation;
    return this.model.filter((concert) => {
      let distanceToConcert = geolib.getDistance(
        { lat: userLat, lng: userLng },
        concert.location
      );
      return distanceToConcert < this.maxDistance;
    })
  }),

  filterConcerts: task(function* () {
    if(!this.userLocation) {
      yield this.geolocation.getLocation();
    }
    this.set('showConcerts', this.showingAll ? 'nearby' : 'all');
  }),
});
