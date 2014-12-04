Ember.Handlebars.helper('strengthName', function(value, options) {
  return window.orderedStrengths[value];
});

Ember.Handlebars.helper('strengthDiffs', function(value, options) {
  return value.comparedToOther(options.hash.comparedPerson).diffness;
});