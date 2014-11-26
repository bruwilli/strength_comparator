Ember.Handlebars.helper('strength', function(value, options) {
  return window.orderedStrengths[value];
});