import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('bands', function() {
    this.route('band', { path: ':id' }, function() {
      this.route('songs');
      this.route('details');
      this.route('edit');
      this.route('concerts');
    });
  });
  this.route('sign-up');
  this.route('login');
  this.route('logout');

  this.route('musicians', function() {
    this.route('new');
    this.route('show', { path: ':id' });
    this.route('edit', { path: ':id/edit' });
  });
  this.route('settings');
});

export default Router;
