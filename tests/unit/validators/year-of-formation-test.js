import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:year-of-formation', 'Unit | Validator | year-of-formation', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
