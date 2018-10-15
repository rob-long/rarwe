import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let band = this.modelFor('bands.band');
    await band.members.reload();
    return band;
  }
});
