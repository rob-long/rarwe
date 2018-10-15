import DS from 'ember-data';
import { computed } from '@ember/object';
import { buildValidations, validator } from 'ember-cp-validations';
import { capitalize } from '@ember/string';

const Validations = buildValidations({
  name: validator('presence', {
    presence: true,
    message: "Name can't be empty"
  })
});

export default DS.Model.extend(Validations, {
  name: DS.attr(),
  bands: DS.hasMany({ async: false }),
  yearOfBirth: DS.attr(),
  
  age: computed('yearOfBirth', function () {
    return new Date().getFullYear() - this.yearOfBirth;
  }),

  initials: computed('name', function () {
    return this.name.split(/\s+/).map(word => {
      return capitalize(word.charAt(0))
    }).join('');
  }),

  birthYears: computed(function () {
    let currentYear = new Date().getFullYear();
    let years = [];
    let y = currentYear - 100;
    while (y < currentYear - 7) {
      years.push(y);
      y++;
    }
    return years;
  })
});
