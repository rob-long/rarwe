import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'rarwe/config/environment';
import mockConcerts from 'rarwe/mocks/fixtures/concerts';

const { songkick: { apiKey, useLiveData } } = ENV;

export default Route.extend({
  async model() {
    if (useLiveData) {
      let band = this.modelFor('bands.band');
      let songkickURL = `https://api.songkick.com/api/3.0/artists/${band.songkickArtistId}/calendar.json?apikey=${apiKey}`;
      let response = await fetch(songkickURL);
      let json = await response.json();
      return json.resultsPage.results.event;
    } else {
      return mockConcerts;
    }
  }
});
