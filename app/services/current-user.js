import Service from '@ember/service';
import { inject as service } from '@ember/service';
import fetch from 'fetch';


export default Service.extend({
  user: null,

  session: service(),
  store: service(),

  async load() {
    if (!this.session.isAuthenticated) {
      return;
    }
    let { token } = this.session.data.authenticated;
    let response = await fetch('/users/me', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    let payload = await response.json();
    let store = this.store;
    let User = store.modelFor('user');
    let serializer = store.serializerFor('user');

    let jsonApiPayload = serializer.normalizeResponse(store, User, payload, null, 'query');
    let user = this.store.push(jsonApiPayload);
    this.set('user', user);
    //console.log('uthis.user);
  },

  unload() {
    this.session('user', null);
  }
});
