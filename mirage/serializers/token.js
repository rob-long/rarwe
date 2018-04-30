import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize(payload) {
    return {
      data: {
        attributes: payload
      }
    }
  }
});
