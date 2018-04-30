import Response from 'ember-cli-mirage/response';

export default function() {
  this.get('/bands', function(schema, request) {
    if (!request.requestHeaders['Authorization']) {
      return new Response(401);
    }
    return schema.bands.all();
  });

  this.post('/bands');
  this.get('/bands/:id');
  this.get('/bands/:id/songs', function(schema, request) {
    let id = request.params.id;
    return schema.songs.where({ bandId: id });
  });

  this.post('/songs');
  this.post('/users', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    let { email } = attrs;
    if (email.includes('error500')) {
      return new Response(500, { 'Content-Type': 'application/vnd.api+json' });
    }
    if (email.includes('error400')) {
      return new Response(400, { 'Content-Type': 'application/vnd.api+json' }, {
        errors: [{
          title: "Param not allowed",
          detail: "password is not allowed.",
          code: "105",
          status: "400"
        }]
      });
    }
    if (email.includes('taken')) {
      return new Response(422, { 'Content-Type': 'application/vnd.api+json' }, {
        errors: [{
          title: "has already been taken",
          detail: "email - has already been taken",
          source: {
            pointer: "/data/attributes/email"
          },
          status: "422"
        }]
      });
    }
    return schema.users.create(attrs);
  });

  this.post('/token', function(schema) {
    let attrs = this.normalizedRequestAttrs();
    let { username: email, password } = attrs;
    let users = schema.users.where({ email: email });
    if (users.length === 1 && users.models[0].password === password) {
      return {
        token: 'a.signed.jwt',
        user_email: email
      }
    } else {
      if (email.includes('error500')) {
        return new Response(500, { 'Content-Type': 'application/vnd.api+json' });
      }

      return new Response(401, { 'Content-Type': 'application/vnd.api+json' }, {
        errors: [{
          title: "Invalid email or password",
          detail: "Invalid email or password",
          source: {
            pointer: "/data/attributes/base"
          },
          status: "401"
        }]
      });
    }
  });
}
