import Route from '@ember/routing/route';

export default Route.extend({ 
  redirect(band) {
    if (band.description) {
      this.transitionTo('bands.band.songs');
    } else {
      this.transitionTo('bands.band.songs');
    }
  }
});
