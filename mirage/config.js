export default function() {
  this.get('/bands/:id');
  this.get('/bands', function(schema, request) {
    if (!request.requestHeaders['Authorization']) {
      return new Response(401);
    }
    return schema.bands.all();
  });
  this.get('/bands/:id/songs', function(schema, request) {
    let id = request.params.id;
    return schema.songs.where({ bandId: id });
  });
  this.post('/bands');
  this.post('/users');
  this.post('/token', function(schema, request) {
    let { username: email, password } = JSON.parse(request.requestBody);
    let users = schema.users.where({ email: email });
    if (users.length === 1 && users.models[0].password === password) {
      return {
        token: 'a.signed.jwt',
        user_email: email
      }
    }
  });
}
